import WordleLetterBoxes from "../WordleLetterBoxes/WordleLetterBoxes";
import "./WordleContainer.css"

interface WordInfo {
    word: string,
    lettersTyped: string[]
}

const WordleBoxes = ({ word, lettersTyped }: WordInfo) => {
    return (
        <>
            <p>Word is {word}</p>
            <div id="wordleBoxes">
                {
                    lettersTyped.slice(0, 5).map((letter, index) => (
                        <WordleLetterBoxes key={index} isActive={true} correctLetter={word.charAt(word.length - index - 1)} actualLetter={letter}></WordleLetterBoxes>
                    ))

                }
                {
                    lettersTyped.slice(5, 10).map((letter, index) => (
                        <WordleLetterBoxes key={index} isActive={false} correctLetter={""} actualLetter={letter}></WordleLetterBoxes>
                    ))

                }
            </div>
        </>
    );
}

export default WordleBoxes;