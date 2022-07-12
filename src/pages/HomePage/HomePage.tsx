import { useState } from "react";
import WordleContainer from "../../components/WordleContainer/WordleContainer";
import words from "../../data/words";
import JSConfetti from "js-confetti";
import './HomePage.css'

const HomePage = () => {
    const [lettersTyped, setLettersTyped] = useState<string[]>(["", "", "", "", "", "", "", "", "", "",]);
    const [word, setWord] = useState<string>(words[Math.floor(Math.random() * words.length)].toUpperCase());
    const [score, setScore] = useState<number>(0);
    const [hasWon, setHasWon] = useState<boolean>(false);
    const [intervalId, setIntervalId] = useState<any>(0);

    const jsConfetti = new JSConfetti()

    const iterateLetter = (event: any) => {
        // checks if the key is a letter
        if ((/[a-zA-Z]/).test(event.key) && event.key.toUpperCase() !== "BACKSPACE" && event.key.toUpperCase() !== "ENTER") {
            lettersTyped.push(event.key.toUpperCase());
            setLettersTyped([...lettersTyped]);

            if (hasWon) {
                setLettersTyped(["", "", "", "", "", "", "", "", "", "",]);
                setScore(0);
                setHasWon(false);
                setWord(words[Math.floor(Math.random() * words.length)].toUpperCase());
                return;
            }

            if (lettersTyped.slice(lettersTyped.length - 5, lettersTyped.length).join("") === word.toUpperCase()) {
                setScore(score => score + 10);
                jsConfetti.addConfetti();
                setHasWon(true);

                if (intervalId !== 0) {
                    clearInterval(intervalId);
                    setIntervalId(0);
                    return;
                }
            } else {
                setScore(score => score + 10);

                if (lettersTyped.length === 11) {
                    const updateScoreInterval = setInterval(() => {
                        setScore(score => score + 1);
                    }, 250)
                    setIntervalId(updateScoreInterval);
                }
            }
        }
    }

    return (
        <div className="container" tabIndex={0} onKeyUp={iterateLetter}>
            <h1>Slidle</h1>
            {/* <p>The word is {word}</p> */}
            <div className="scoreContainer">
                <p>Score (lower is better):&nbsp;</p>
                <strong style={{ "width": score.toString().length + "ch" }}>{score}</strong>
            </div>
            <WordleContainer word={word} lettersTyped={lettersTyped}></WordleContainer>
            {
                hasWon &&
                <div>
                    <h2>Congrats!</h2>
                    <p>Your score was {score}.</p>
                    <p>You typed {lettersTyped.length - 10} letters.</p>
                    <p>Press any letter to play again.</p>
                </div>
            }
        </div>
    );
}

export default HomePage;