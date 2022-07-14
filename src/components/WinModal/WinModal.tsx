import './WinModal.css'
import { AiOutlineClose } from 'react-icons/ai'

interface winStats {
    score: number,
    lettersTyped: string[],
    ResetBoard: () => void,
    totalTime: number,
    isDailyPuzzle: boolean,
    wordId: number
}

const WinModal = ({ score, lettersTyped, ResetBoard, totalTime, isDailyPuzzle, wordId }: winStats) => {
    return (
        <div id="winModalContainer" onPointerDown={ResetBoard}>
            <div id="winContainer" onPointerDown={e => e.stopPropagation()}>
                <AiOutlineClose id='closeWinButton' onClick={ResetBoard}/>
                <h2>You win!</h2>
                <p>Score: <strong>{score}</strong></p>
                <p>Letters typed: <strong>{lettersTyped.length - 10}</strong></p>
                <p>Elapsed time: <strong>{Math.round(totalTime)} seconds</strong></p>
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

                        navigator.clipboard.writeText(`${isDailyPuzzle ? "Daily" : "Random"} Slidle Game #${wordId} Results!\nScore (lower is better): ${score}\nLetters typed: ${lettersTyped.length - 10}\nElapsed time: ${Math.round(totalTime)} seconds\nPlay this puzzle: ${window.location.href}`)
                    }}>Copy results</button>
            </div>
        </div>
    );
}

export default WinModal;