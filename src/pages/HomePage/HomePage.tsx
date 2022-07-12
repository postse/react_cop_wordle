import { useEffect, useState } from "react";
import WordleContainer from "../../components/WordleContainer/WordleContainer";
import words from "../../data/words";

const HomePage = () => {
    const [lettersTyped, setLettersTyped] = useState<string[]>(["", "", "", "", "", "", "", "", "", "",]);
    const [word, setWord] = useState<string>(words[Math.floor(Math.random() * words.length)].toUpperCase());
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        if (lettersTyped.length === 10) return;
        setScore(score + 10);
    }, [lettersTyped]);

    useEffect(() => {
        const updateScoreInterval = setInterval(() => {
            setScore(score => score + 1);
        }, 500)
        return () => clearInterval(updateScoreInterval);
    }, [])

    const iterateLetter = (event: any) => {
        // checks if the key is a letter
        if ((/[a-zA-Z]/).test(event.key) && event.key.toUpperCase() !== "BACKSPACE") {
            lettersTyped.push(event.key.toUpperCase());
            setLettersTyped([...lettersTyped]);

            if (lettersTyped.slice(lettersTyped.length - 5, lettersTyped.length).join("") === word.toUpperCase()) {
                setTimeout(() => {
                    alert(`You win! It took you ${lettersTyped.length - 10} guesses.`);
                    setLettersTyped(["", "", "", "", "", "", "", "", "", "",]);
                    setWord(words[Math.floor(Math.random() * words.length)].toUpperCase());
                    setScore(0);
                }, 200)
            }
        }
    }

    return (
        <div className="container" tabIndex={0} onKeyUp={event => iterateLetter(event)}>
            <h1>Wordle</h1>
            <p>Score (lower is better): {score}</p>
            <WordleContainer word={word} lettersTyped={lettersTyped}></WordleContainer>
        </div>
    );
}

export default HomePage;