// import { AnimatedList } from 'react-animated-list';
import WordleLetterBoxes from "../WordleLetterBoxes/WordleLetterBoxes";
import "./WordleContainer.css"
import { Flipper, Flipped, spring } from 'react-flip-toolkit';
import { useRef, useEffect } from 'react';

interface WordInfo {
    word: string,
    lettersTyped: string[]
}

const WordleBoxes = ({ word, lettersTyped }: WordInfo) => {
    return (
        <>
            <p>Word is {word}</p>
            {
                <Flipper flipKey={lettersTyped.join('')} className="wordleBoxes" spring={{
                    stiffness: 2000,
                    damping: 80
                }} 
                handleEnterUpdateDelete={({
                    hideEnteringElements,
                    animateEnteringElements,
                    animateExitingElements,
                    animateFlippedElements
                }) => {
                    hideEnteringElements();
                    animateExitingElements();
                    animateFlippedElements();
                    setTimeout(() => {
                        animateEnteringElements();
                    }, 100);
                }}>
                    {
                        lettersTyped.slice(lettersTyped.length - 10, lettersTyped.length).map((letter, index) => (
                            <Flipped key={lettersTyped.length + index} flipId={lettersTyped.length + index}
                                onAppear={(el, i) =>{
                                    setTimeout(() => {
                                      el.classList.add("fadeIn");
                                      setTimeout(() => {
                                        el.style.opacity = '1';
                                        el.classList.remove("fadeIn");
                                      }, 100);
                                    }, 0);
                                  }}
                                onExit={(el, i, removeElement) => {
                                    setTimeout(() => {
                                      el.classList.add("fadeOut");
                                      setTimeout(removeElement, 50);
                                    }, 0);
                                  }}>
                                <div>
                                    <WordleLetterBoxes isActive={index >= 5 ? true : false} correctLetter={word.charAt(index - 5)} actualLetter={letter}></WordleLetterBoxes>
                                </div>
                            </Flipped>
                        ))
                    }
                </Flipper>


            }
            {/* {
                    lettersTyped.slice(lettersTyped.length-10, lettersTyped.length-5).map((letter, index) => (
                        <WordleLetterBoxes key={index} isActive={false} correctLetter={""} actualLetter={letter}></WordleLetterBoxes>
                    ))

                } */}
        </>
    );
}

export default WordleBoxes;