import './WordleLetterBoxes.css'

interface LetterInfo {
    isActive: boolean,
    correctLetter: string,
    actualLetter: string,
    opacity: number
}

const WordleLetterBoxes = ({ isActive, correctLetter, actualLetter, opacity }: LetterInfo) => {
    return (
        <div className={`letterBox ${isActive ? "active" : "inactive"} ${(actualLetter !== "" && correctLetter === actualLetter) && "correct"}`} style={{opacity: opacity}}>
            {actualLetter}
        </div>
    );
}

export default WordleLetterBoxes;