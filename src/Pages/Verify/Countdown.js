import { useEffect, useState } from 'react';

function Countdown({ startTime }) {
    const [time, setTime] = useState(startTime);
    useEffect(() => {
        const timerId = setInterval(() => {
            setTime((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    return <span>{time}s</span>;
}

export default Countdown;
