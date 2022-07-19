import { useEffect, useState, useRef } from "react";
import WordleContainer from "../../components/WordleContainer/WordleContainer";
import words from "../../data/words";
import JSConfetti from "js-confetti";
import { IoMdRefresh } from 'react-icons/io'
import { FiSettings } from 'react-icons/fi'
import './HomePage.css'
import Keyboard from "../../components/Keyboard/Keyboard";
import WinModal from "../../components/WinModal/WinModal";
import useTimeSince from "../../hooks/useTimeSince";
import SettingsModal from '../../components/SettingsModal/SettingsModal'

enum gameModeType {
    Normal,
    Hard
}

const generateIdFromSeed = (seed: number) => {
    var mask = 0xffffffff;
    var m_w = (123456789 + seed) & mask;
    var m_z = (987654321 - seed) & mask;

    m_z = (36969 * (m_z & 65535) + (m_z >>> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >>> 16)) & mask;

    var result = ((m_z << 16) + (m_w & 65535)) >>> 0;
    result /= 4294967296;
    return result;
}

const HomePage = () => {
    const [lettersTyped, setLettersTyped] = useState<string[]>(Array(17).fill(""));
    const date = new Date();
    const dailyWordId = Math.floor(generateIdFromSeed(date.getFullYear() + date.getMonth() + date.getDay()) * words.length);
    const [wordId, setWordId] = useState<number>(/^-?\d+$/.test(window.location.pathname.replace("/", "")) ? Number(window.location.pathname.replace("/", "")) : dailyWordId);
    const [hasWon, setHasWon] = useState<boolean>(false);
    const [changingSettings, setChangingSettings] = useState<boolean>(false);
    const [gameMode, setGameMode] = useState<gameModeType>(gameModeType.Normal);
    const { startTimer, timeSinceStart, clearTimer } = useTimeSince(hasWon);
    const interval = useRef<NodeJS.Timeout | null>(null);

    const jsConfetti = new JSConfetti();

    useEffect(() => {
        if (/^-?\d+$/.test(window.location.pathname.replace("/", ""))) {
            setWordId(Number(window.location.pathname.replace("/", "")));
        } else {
            window.location.pathname = "/" + dailyWordId;
        }
    }, [wordId, dailyWordId])

    const getScore = () => {
        return Math.round(timeSinceStart * 4 + (lettersTyped.length - 17) * 10);
    }

    const resetBoard = () => {
        setLettersTyped(Array(17).fill(""));
        setHasWon(false);
        clearTimer();
        if (interval.current) clearInterval(interval.current);
        const newWordId = Math.floor(Math.random() * words.length);
        setWordId(newWordId);

        window.history.replaceState({ additionalInformation: 'Changed URL to new puzzle' }, "", window.location.origin + "/" + newWordId)
    }

    const iterateLetter = (letter: string) => {
        letter = letter.toUpperCase();
        if (letter.length > 1) return;

        // checks if the key is a letter
        if (letter.match(/^[A-Z]*$/)) {
            lettersTyped.push(letter);
            setLettersTyped([...lettersTyped]);

            if (hasWon) {
                resetBoard();
                return;
            }

            if (interval.current) {
                clearInterval(interval.current);
            }
            if (lettersTyped.slice(lettersTyped.length - 5, lettersTyped.length).join("") === words[wordId].toUpperCase()) {
                jsConfetti.addConfetti();
                setHasWon(true);
            } else {
                if (gameMode === gameModeType.Hard) {
                    interval.current = setInterval(() => {
                        lettersTyped.push(" ");
                        setLettersTyped(lettersTyped);
                    }, 3000)
                }

                // Runs when game begins
                if (lettersTyped.length === 18) {
                    startTimer();
                }
            }
        }
    }

    return (
        <div className="fullScreen" tabIndex={0} onKeyUp={(e) => iterateLetter(e.key.toUpperCase())}>
            <div className="container">
                <div>
                    <div id="header">
                        <div className="flexRow">
                            <h1 className="pointer" onClick={() => window.location.pathname = "/" + dailyWordId} tabIndex={0}>Slidle</h1>
                            <IoMdRefresh className="icon" onClick={resetBoard} title="New Puzzle" role="button" tabIndex={0}/>
                        </div>
                        <FiSettings className="icon" onClick={() => setChangingSettings(true)} role="button" tabIndex={0}/>
                    </div>
                    {/* <p>The word is {words[wordId].toUpperCase()}</p> */}
                    <p>{`${wordId === dailyWordId ? "Daily" : "Random"} Puzzle `}<strong>#{wordId}</strong></p>
                    <div className="scoreContainer">
                        <p>Score (lower is better):&nbsp;</p>
                        <strong>{getScore()}</strong>
                    </div>
                    <WordleContainer word={words[wordId].toUpperCase()} lettersTyped={lettersTyped}></WordleContainer>
                    {
                        hasWon &&
                        <WinModal lettersTyped={lettersTyped} score={getScore()} ResetBoard={resetBoard} totalTime={timeSinceStart} isDailyPuzzle={dailyWordId === wordId} wordId={wordId} />
                    }
                    {
                        changingSettings &&
                        <SettingsModal setChangingSettings={setChangingSettings} gameMode={gameMode} setGameMode={setGameMode} currentlyPlaying={lettersTyped.length > 17} />
                    }
                </div>
                <Keyboard IterateLetter={iterateLetter} />
            </div>
        </div>
    );
}

export default HomePage;