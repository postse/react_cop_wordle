interface LetterInfo {
    isActive: boolean,
    correctLetter: string,
    actualLetter: string
}

const WordleLetterBoxes = ({ isActive, correctLetter, actualLetter }: LetterInfo) => {
    return (
        <div className={`letterBox ${isActive ? "active" : "inactive"} ${(actualLetter !== "" && correctLetter === actualLetter) && "correct"}`}>
            {actualLetter}
        </div>
    );
}

export default WordleLetterBoxes;