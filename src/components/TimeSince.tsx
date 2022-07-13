import { useEffect, useState } from "react";

interface timers {
    startTime: number,
    lettersTyped: string[],
    setEndTime: () => void,
    hasWon: boolean
}

const TimeSince = ({ startTime, lettersTyped, setEndTime, hasWon }: timers) => {
    const [timeSinceStart, setTimeSinceStart] = useState(0);
    const [intervalId, setIntervalId] = useState<any>(0);

    useEffect(() => {
        if (lettersTyped.length === 18) {
            const updateScoreInterval = setInterval(() => {
                setTimeSinceStart(timeSinceStart => timeSinceStart + .25);
            }, 250)
            setIntervalId(updateScoreInterval);
            return () => clearInterval(updateScoreInterval);
        }
    }, [lettersTyped])

    useEffect(() => {
        if (hasWon) {
            clearInterval(intervalId);
            setIntervalId(0);
        }
    }, [hasWon])

    return timeSinceStart;
}

export default TimeSince;