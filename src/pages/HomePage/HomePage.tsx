import { useEffect, useState } from "react";
import WordleContainer from "../../components/WordleContainer/WordleContainer";
import words from "../../data/words";
import JSConfetti from "js-confetti";
import './HomePage.css'

const HomePage = () => {
    const [lettersTyped, setLettersTyped] = useState<string[]>(["", "", "", "", "", "", "", "", "", "",]);
    const [wordId, setWordId] = useState<number>(Math.floor(Math.random() * words.length));
    const [score, setScore] = useState<number>(0);
    const [hasWon, setHasWon] = useState<boolean>(false);
    const [intervalId, setIntervalId] = useState<any>(0);

    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);

    const jsConfetti = new JSConfetti();

    useEffect(() => {
        if (/^-?\d+$/.test(window.location.pathname.replace("/", ""))) {
            setWordId(Number(window.location.pathname.replace("/", "")));
            // console.log(Number(window.location.pathname.replace("/", "")));
        } else {
            window.location.pathname = "/" + wordId;
        }
    }, [])

    const iterateLetter = (event: any) => {
        // checks if the key is a letter
        if ((/[a-zA-Z]/).test(event.key) && event.key.toUpperCase() !== "BACKSPACE" && event.key.toUpperCase() !== "ENTER") {
            lettersTyped.push(event.key.toUpperCase());
            setLettersTyped([...lettersTyped]);

            if (hasWon) {
                setLettersTyped(["", "", "", "", "", "", "", "", "", "",]);
                setScore(0);
                setHasWon(false);
                const newWordId = Math.floor(Math.random() * words.length);
                setWordId(newWordId);

                window.history.replaceState({ additionalInformation: 'Changed URL to new puzzle' }, "", 'http://localhost:3000/' + newWordId)
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
        <div className="container" tabIndex={0} onKeyUp={iterateLetter}>
            <h1>Slidle #{wordId}</h1>
            <p>The word is {words[wordId].toUpperCase()}</p>
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
                        onClick={() => {
                            navigator.clipboard.writeText(`
                            Slidle Game Results!
                            Total Score: ${score}
                            Letters typed: ${lettersTyped.length - 10}
                            Elapsed time: ${Math.round((endTime - startTime) / 1000)} seconds
                            Play this puzzle: ${window.location.href}
                        `)
                        }}>Share results!</button>
                    <p>Press any letter to play again</p>
                </div>
            }
        </div>
    );
}

export default HomePage;