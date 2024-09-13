import React, { useRef, useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';

function Timer() {
    const [progress, setProgress] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const startRef = useRef(null);
    console.log(startRef);
    

    const [styles, setStyles] = useState({
        start: {
            backgroundColor: '#3acf2c'
        }
    })

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setSecond(prevSecond => {
                    if (prevSecond === 59) {
                        setMinute(prevMinute => prevMinute + 1);
                        return 0;
                    }
                    return prevSecond + 1;
                });
            }, 1000);
        } else if (!isRunning && second !== 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning, second]);

    const handleStart = () => {
        if (isRunning) {
            setIsRunning(false);
            setStyles({start: {backgroundColor: '#3acf2c'}})
            startRef.current.innerText = 'Start';
        } else {
            setIsRunning(true);
            setStyles({start: {backgroundColor: 'red'}})
            startRef.current.innerText = 'Stop';
        }
    };

    const handleReset = () => {
        setIsRunning(false);
        setMinute(0);
        setSecond(0);
        setStyles({start: {backgroundColor: '#3acf2c'}})

        startRef.current.innerText = 'Start';
    };

    return (
        <>
            <div>
                <LoadingBar
                    color='#ff8324'
                    progress={progress}
                    onLoaderFinished={() => setProgress(0)}
                    waitingTime={900}
                    transitionTime={200}
                />
            </div>
            <div className="container1">
                <div className="btns">
                    <p className="timer">
                        {String(minute).padStart(2, '0')}:{String(second).padStart(2, '0')}
                    </p>
                    <button style={styles.start} ref={startRef} onClick={handleStart} className='start' type="button">Start</button>
                    <button onClick={handleReset} className='reset' type="button">Reset</button>
                </div>
            </div>
        </>
    );
}

export default Timer;
