import { useEffect, useRef, useState } from 'react';

const TimeCountDown = () => {
    const Ref = useRef<null | NodeJS.Timeout>(null); // Adjusted type annotation
    const [timer, setTimer] = useState('00:00:00');

    const getTimeRemaining = (e: any) => {
        const total = Date.parse(e) - Date.parse(new Date() + '');
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total,
            hours,
            minutes,
            seconds,
        };
    };

    const startTimer = (e: any) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : '0' + hours) +
                    ':' +
                    (minutes > 9 ? minutes : '0' + minutes) +
                    ':' +
                    (seconds > 9 ? seconds : '0' + seconds),
            );
        }
    };

    const clearTimer = (e: any) => {
        setTimer('00:00:10');
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };

    const getDeadTime = () => {
        let deadline = new Date();

        // This is where you need to adjust if
        // you intend to add more time
        deadline.setSeconds(deadline.getSeconds() + 10);
        return deadline;
    };

    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    const onClickReset = () => {
        clearTimer(getDeadTime());
    };

    return (
        <div style={{ textAlign: 'center', margin: 'auto' }}>
            <h1 style={{ color: 'green' }}>GeeksforGeeks</h1>
            <h3>Countdown Timer Using React JS</h3>
            <h2>{timer}</h2>
            <button onClick={onClickReset}>Reset</button>
        </div>
    );
};

export default TimeCountDown;
