import SimpleKeyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './Keyboard.css'

interface KeyboardProps { 
    IterateLetter: (letter: string) => void
}

const Keyboard = ({ IterateLetter }: KeyboardProps) => {

    const onKeyPress = (button: any) => {
        IterateLetter(button);
    }

    return (
        <div id="keyboardContainer">
            <SimpleKeyboard
                theme='hg-theme-default myTheme1'
                layoutName='shift'
                onKeyPress={onKeyPress}
                layout={{
                    shift: [
                        "Q W E R T Y U I O P",
                        "A S D F G H J K L",
                        "Z X C V B N M"
                    ]
                }}
            />
        </div>
    );
}

export default Keyboard;