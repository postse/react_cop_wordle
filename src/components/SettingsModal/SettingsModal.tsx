import './SettingsModal.css'
import { AiOutlineClose } from 'react-icons/ai'

enum gameModeType {
    Normal,
    Hard
}

interface settings {
    setChangingSettings: React.Dispatch<React.SetStateAction<boolean>>,
    gameMode: gameModeType,
    setGameMode: React.Dispatch<React.SetStateAction<gameModeType>>,
}

const WinModal = ({ setChangingSettings, gameMode, setGameMode }: settings) => {
    return (
        <div id="settingsModalContainer" onClick={() => setChangingSettings(false)}>
            <div id="settingsContainer" onClick={e => e.stopPropagation()}>
                <AiOutlineClose id='closeWinButton' onClick={() => setChangingSettings(false)} />
                <h2>How to play</h2>
                <label>
                    <div className="flexRow">
                        <h3>Normal Mode</h3>
                        <input type="radio" name="gameMode" id="normalMode" onChange={() => setGameMode(gameModeType.Normal)} checked={gameMode === gameModeType.Normal}/>
                    </div>
                    <p>Find the five letter word that goes in the first five spots to win!</p>
                </label>
                <br />
                <label>
                    <div className="flexRow">
                        <h3>Hard Mode</h3>
                        <input type="radio" name="gameMode" id="hardMode" onChange={() => setGameMode(gameModeType.Hard)} checked={gameMode === gameModeType.Hard}/>
                    </div>
                    <p>Don't take too long to decide on a letter! If you do, empty spaces will be automatically input.</p>
                </label>
            </div>
        </div>
    );
}

export default WinModal;