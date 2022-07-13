import './WinModal.css'
import { AiOutlineClose } from 'react-icons/ai'

interface winStats {
    score: number,
    lettersTyped: string[],
    startTime: number,
    endTime: number,
    ResetBoard: () => void
}

const WinModal = ({ score, lettersTyped, startTime, endTime, ResetBoard }: winStats) => {
    return (
        <div id="winModalContainer" onClick={ResetBoard}>
            <div id="winContainer" onClick={e => e.stopPropagation()}>
                <AiOutlineClose id='closeWinButton' onClick={ResetBoard}/>
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
                    }}>Copy results</button>
            </div>
        </div>
    );
}

export default WinModal;