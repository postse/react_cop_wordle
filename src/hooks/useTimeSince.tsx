import { useEffect, useRef, useState } from "react";

const useTimeSince = (hasWon: boolean) => {
    const [timeSinceStart, setTimeSinceStart] = useState(0);
    const interval = useRef<NodeJS.Timeout | null>(null);

    const startTimer = () => {
        setTimeSinceStart(0);
        interval.current = setInterval(() => {
            setTimeSinceStart(timeSinceStart => timeSinceStart + .25);
        }, 250)
    }

    useEffect(() => {
        return () => {
            if (interval.current) clearInterval(interval.current);
        }
    }, [])

    useEffect(() => {
        if (hasWon) {
            if (interval.current) clearInterval(interval.current);
        } else {
            setTimeSinceStart(0);
        }
    }, [hasWon])

    return { startTimer, timeSinceStart };
}

export default useTimeSince;