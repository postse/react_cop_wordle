import { useEffect, useState } from "react";
import WordleContainer from "../../components/WordleContainer/WordleContainer";
import words from "../../data/words";
import './HomePage.css'

const HomePage = () => {
    const [lettersTyped, setLettersTyped] = useState<string[]>(["", "", "", "", "", "", "", "", "", "",]);
    const [word, setWord] = useState<string>(words[Math.floor(Math.random() * words.length)].toUpperCase());
    const [score, setScore] = useState<number>(0);



    useEffect(() => {
        if (lettersTyped.length === 10) return;
        setScore(score => score + 10);
    }, [lettersTyped]);

    useEffect(() => {
        const updateScoreInterval = setInterval(() => {
            setScore(score => score + 1);
        }, 250)
        return () => clearInterval(updateScoreInterval);
    }, [])

    const iterateLetter = (event: any) => {
        // checks if the key is a letter
        if ((/[a-zA-Z]/).test(event.key) && event.key.toUpperCase() !== "BACKSPACE") {
            lettersTyped.push(event.key.toUpperCase());
            setLettersTyped([...lettersTyped]);

            if (lettersTyped.slice(lettersTyped.length - 5, lettersTyped.length).join("") === word.toUpperCase()) {
                setTimeout(() => {
                    alert(`You win! Your score was ${score}. It took you ${lettersTyped.length - 10} guesses.`);
                    setLettersTyped(["", "", "", "", "", "", "", "", "", "",]);
                    setWord(words[Math.floor(Math.random() * words.length)].toUpperCase());
                    setScore(0);
                }, 200)
            }
        }
    }

    return (
        <div className="container" tabIndex={0} onKeyUp={iterateLetter}>
            <h1>Slidle</h1>
            <div className="scoreContainer">
                <p>Score (lower is better):&nbsp;</p>
                <strong style={{"width": score.toString().length + "ch"}}>{score}</strong>
            </div>
            <WordleContainer word={word} lettersTyped={lettersTyped}></WordleContainer>
        </div>
    );
}

export default HomePage;