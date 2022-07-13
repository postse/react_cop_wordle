import { useEffect, useState } from "react";
import WordleContainer from "../../components/WordleContainer/WordleContainer";
import words from "../../data/words";
import JSConfetti from "js-confetti";
import { IoMdRefresh } from 'react-icons/io'
import './HomePage.css'
import Keyboard from "../../components/Keyboard/Keyboard";
import WinModal from "../../components/WinModal/WinModal";
import useTimeSince from "../../hooks/useTimeSince";

const HomePage = () => {
    const [lettersTyped, setLettersTyped] = useState<string[]>(Array(17).fill(""));
    const [wordId, setWordId] = useState<number>(Math.floor(Math.random() * words.length));
    const [hasWon, setHasWon] = useState<boolean>(false);
    const { startTimer, timeSinceStart } = useTimeSince(hasWon);

    const jsConfetti = new JSConfetti();

    console.log("rerendered");

    useEffect(() => {
        if (/^-?\d+$/.test(window.location.pathname.replace("/", ""))) {
            setWordId(Number(window.location.pathname.replace("/", "")));
        } else {
            window.location.pathname = "/" + wordId;
        }
    }, [wordId])

    const getScore = () => {
        return Math.round(timeSinceStart*4+(lettersTyped.length - 17)*10);
    }

    const resetBoard = () => {
        setLettersTyped(Array(17).fill(""));
        setHasWon(false);
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

            if (lettersTyped.slice(lettersTyped.length - 5, lettersTyped.length).join("") === words[wordId].toUpperCase()) {
                jsConfetti.addConfetti();
                setHasWon(true);
            } else {
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
                <h1>Slidle #{wordId} <IoMdRefresh className="refreshIcon" onClick={resetBoard} /></h1>
                <p>The word is {words[wordId].toUpperCase()}</p>
                <div className="scoreContainer">
                    <p>Score (lower is better):&nbsp;</p>
                    <strong style={{ "width": getScore().toString().length + "ch" }}>{getScore()}</strong>
                </div>
                <WordleContainer word={words[wordId].toUpperCase()} lettersTyped={lettersTyped}></WordleContainer>
                {
                    hasWon &&
                    <WinModal lettersTyped={lettersTyped} score={getScore()} ResetBoard={resetBoard} totalTime={timeSinceStart}/>
                }
                <Keyboard IterateLetter={iterateLetter} />
            </div>
        </div>
    );
}

export default HomePage;