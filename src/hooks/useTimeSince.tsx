import { useEffect, useReducer, useRef } from "react";

const useTimeSince = (hasWon: boolean) => {
    const [timeSinceStart, updateTime] = useReducer((state: number, action: string) => {
        switch (action) {
            case 'reset':
                return 0;
            case 'add': 
                return state + .25;
            default:
                return state;
        }
    }, 0);
    const interval = useRef<NodeJS.Timeout | null>(null);

    const startTimer = () => {
        updateTime("reset");
        interval.current = setInterval(() => {
            updateTime("add");
        }, 250)
    }

    const clearTimer = () => {
        updateTime("reset");
        if (interval.current) clearInterval(interval.current);
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
            updateTime("reset");
        }
    }, [hasWon])

    return { startTimer, timeSinceStart, clearTimer };
}

export default useTimeSince;