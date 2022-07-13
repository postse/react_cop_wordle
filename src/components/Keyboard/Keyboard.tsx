import { useEffect } from 'react';
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

    useEffect(() => {
        document.querySelector('[data-skbtn="{backspace}"]')?.classList.add("hidden");
        document.querySelector('[data-skbtn="{shift}"]')?.classList.add("hidden");
    }, [])
    console.log("keyboard rerendered");

    return (
        <div id="keyboardContainer">
            <SimpleKeyboard
                theme='hg-theme-default myTheme1'
                layoutName='shift'
                onKeyPress={onKeyPress}
                layout={{
                    shift: [
                        'Q W E R T Y U I O P',
                        'A S D F G H J K L',
                        '{shift} Z X C V B N M {backspace}',
                    ]
                }}
                display={{
                    "{numbers}": "123",
                    "{ent}": "return",
                    "{escape}": "esc ⎋",
                    "{tab}": "tab ⇥",
                    "{backspace}": "⌫",
                    "{capslock}": "caps lock ⇪",
                    "{shift}": "⇧",
                    "{controlleft}": "ctrl ⌃",
                    "{controlright}": "ctrl ⌃",
                    "{altleft}": "alt ⌥",
                    "{altright}": "alt ⌥",
                    "{metaleft}": "cmd ⌘",
                    "{metaright}": "cmd ⌘",
                    "{abc}": "ABC"
                }}
            />
        </div>
    );
}

export default Keyboard;