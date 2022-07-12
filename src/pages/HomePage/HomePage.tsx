import { useEffect, useState } from "react";
import WordleContainer from "../../components/WordleContainer/WordleContainer";
import words from "../../data/words";
import JSConfetti from "js-confetti";
import { IoMdRefresh } from 'react-icons/io'
import './HomePage.css'

const HomePage = () => {
    const [lettersTyped, setLettersTyped] = useState<string[]>(["", "", "", "", "", "", "", "", "", "",]);
    const [wordId, setWordId] = useState<number>(Math.floor(Math.random() * words.length));
    const [score, setScore] = useState<number>(0);
    const [hasWon, setHasWon] = useState<boolean>(false);
    const [intervalId, setIntervalId] = useState<any>(0);

    const [startTime, setStartTime] = useState<number>(0);
    const [endTime, setEndTime] = useState<number>(0);

    const jsConfetti = new JSConfetti();

    useEffect(() => {
        if (/^-?\d+$/.test(window.location.pathname.replace("/", ""))) {
            setWordId(Number(window.location.pathname.replace("/", "")));
        } else {
            window.location.pathname = "/" + wordId;
        }
    }, [wordId])

    const ResetBoard = () => {
        setLettersTyped(["", "", "", "", "", "", "", "", "", "",]);
        setScore(0);
        setHasWon(false);
        const newWordId = Math.floor(Math.random() * words.length);
        setWordId(newWordId);
        clearInterval(intervalId);

        window.history.replaceState({ additionalInformation: 'Changed URL to new puzzle' }, "", window.location.origin + "/" + newWordId)
    }

    const IterateLetter = (event: any) => {
        // checks if the key is a letter
        if ((/[a-zA-Z]/).test(event.key) && event.key.toUpperCase() !== "BACKSPACE" && event.key.toUpperCase() !== "ENTER") {
            lettersTyped.push(event.key.toUpperCase());
            setLettersTyped([...lettersTyped]);

            if (hasWon) {
                ResetBoard();
                return;
            }

            if (lettersTyped.slice(lettersTyped.length - 5, lettersTyped.length).join("") === words[wordId].toUpperCase()) {
                setScore(score => score + 10);
                jsConfetti.addConfetti();
                setHasWon(true);
                setEndTime(new Date().getTime())

                if (intervalId !== 0) {
                    clearInterval(intervalId);
                    setIntervalId(0);
                    return;
                }
            } else {
                setScore(score => score + 10);

                // Runs when game begins
                if (lettersTyped.length === 11) {
                    setStartTime(new Date().getTime())

                    const updateScoreInterval = setInterval(() => {
                        setScore(score => score + 1);
                    }, 250)
                    setIntervalId(updateScoreInterval);
                }
            }
        }
    }

    return (
        <div className="fullScreen" tabIndex={0} onKeyUp={IterateLetter}>
            <div className="container">
                <h1>Slidle #{wordId} <IoMdRefresh className="refreshIcon" onClick={ResetBoard} /></h1>
                {/* <p>The word is {words[wordId].toUpperCase()}</p> */}
                <div className="scoreContainer">
                    <p>Score (lower is better):&nbsp;</p>
                    <strong style={{ "width": score.toString().length + "ch" }}>{score}</strong>
                </div>
                <WordleContainer word={words[wordId].toUpperCase()} lettersTyped={lettersTyped}></WordleContainer>
                {
                    hasWon &&
                    <div className="winContainer">
                        <h2>You win!</h2>
                        <p>Score: <strong>{score}</strong></p>
                        <p>Letters typed: <strong>{lettersTyped.length - 10}</strong></p>
                        <p>Elapsed time: <strong>{Math.round((endTime - startTime) / 1000)} seconds</strong></p>
                        <button
                            className="shareButton"
                            onClick={(e) => {
                                console.log(e);
                                console.log(e.currentTarget.innerText);
                                const button = e.currentTarget;
                                button.innerText = "Results copied"
                                setTimeout(() => {
                                    button.innerText = "Share results!"
                                }, 2000)

                                navigator.clipboard.writeText(`Slidle Game Results!\nScore (lower is better): ${score}\nLetters typed: ${lettersTyped.length - 10}\nElapsed time: ${Math.round((endTime - startTime) / 1000)} seconds\nPlay this puzzle: ${window.location.href}`)
                            }}>Share results!</button>
                        <p>Press any letter to play again</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default HomePage;