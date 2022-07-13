// import { AnimatedList } from 'react-animated-list';
import WordleLetterBoxes from "../WordleLetterBoxes/WordleLetterBoxes";
import "./WordleContainer.css"
import { Flipper, Flipped } from 'react-flip-toolkit';

interface WordInfo {
    word: string,
    lettersTyped: string[]
}

const WordleBoxes = ({ word, lettersTyped }: WordInfo) => {

    const onAppear = (el: HTMLElement) => {
        setTimeout(() => {
            el.classList.add("fadeIn");
            setTimeout(() => {
                el.style.opacity = '1';
                el.classList.remove("fadeIn");
            }, 100);
        }, 0);
    };

    const onExit = (el: HTMLElement, index: number, removeElement: () => void) => {
        setTimeout(() => {
            el.classList.add("fadeOut");
            setTimeout(removeElement, 50);
        }, 0);
    };

    const springConfig = {
        stiffness: 2000,
        damping: 80
    }

    const handleEnterUpdateDelete = ({
        hideEnteringElements,
        animateEnteringElements,
        animateExitingElements,
        animateFlippedElements
    }: any) => {
        hideEnteringElements();
        animateExitingElements();
        animateFlippedElements();
        setTimeout(() => {
            animateEnteringElements();
        }, 100);
    };

    return (
        <Flipper
            flipKey={lettersTyped.join('')}
            className="wordleBoxes"
            spring={springConfig}
            handleEnterUpdateDelete={handleEnterUpdateDelete}>
            {
                lettersTyped.slice(lettersTyped.length - 10, lettersTyped.length).reverse().map((letter, index) => (
                    <Flipped
                        key={lettersTyped.length - index}
                        flipId={lettersTyped.length - index}
                        onAppear={onAppear}
                        onExit={onExit}>
                        <div className={"box" + index}>
                            <WordleLetterBoxes
                                isActive={index < 5 ? true : false}
                                correctLetter={word.charAt(4 - index)}
                                actualLetter={letter}
                                opacity={(10-index) * .2}
                            />
                        </div>
                    </Flipped>
                ))
            }
        </Flipper>
    );
}

export default WordleBoxes;