import { useState } from "react";
import WordleContainer from "../../components/WordleContainer/WordleContainer";
import words from "../../data/words";

const HomePage = () => {
    const word: string = words[0].toUpperCase();
    const [lettersTyped, setLettersTyped] = useState<string[]>(["", "", "", "", "", "", "", "", "", "",]);

    const iterateLetter = (event: any) => {
        // checks if the key is a letter
        if(event.key.toUpperCase() !== event.key.toLowerCase()) {
            lettersTyped.push(event.key.toUpperCase());
            setLettersTyped([...lettersTyped]);

            if (lettersTyped.slice(lettersTyped.length-5, lettersTyped.length).join("") === word.toUpperCase()) {
                setTimeout(() => {
                    alert(`You win! It took you ${lettersTyped.length - 10} guesses.`)
                    setLettersTyped(["", "", "", "", "", "", "", "", "", "",]);
                }, 100)
            }
        }
    }

    return ( 
        <div className="container" tabIndex={0} onKeyUp={event => iterateLetter(event)}>
            <h1>Wordle</h1>
            <p>Letters typed: {lettersTyped.length - 10}</p>
            <WordleContainer word={word} lettersTyped={lettersTyped}></WordleContainer>
        </div>
     );
}
 
export default HomePage;