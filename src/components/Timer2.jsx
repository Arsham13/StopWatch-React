import React, { useRef, useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';

function Timer2() {
    const [progress, setProgress] = useState(0);
    const inputMinRef = useRef(null);
    const inputSecRef = useRef(null);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const startRef = useRef(null);
    const [error, setError] = useState('');

    const [styles, setStyles] = useState({
        container: {
            visibility: 'hidden'
        },
        start: {
            backgroundColor: '#3acf2c'
        }
    })

    useEffect(() => {
        let timer;
        if (isRunning && (minute > 0 || second > 0)) {
            timer = setInterval(() => {
                setSecond(prevSecond => {
                    if (prevSecond === 0) {
                        if (minute > 0) {
                            setMinute(prevMinute => prevMinute - 1);
                            return 59;
                        } else {
                            clearInterval(timer);
                            setIsRunning(false);
                            return 0;
                        }
                    } else {
                        return prevSecond - 1;
                    }
                });
            }, 1000);
        } else if (!isRunning) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning, minute, second]);

    const handleStart = () => {
        if (isRunning) {
            setIsRunning(false);
            setStyles({start: {backgroundColor: '#3acf2c'}})
            startRef.current.innerText = 'Start';
        } else {
            setIsRunning(true);
            startRef.current.innerText = 'Stop';
            setStyles({start: {backgroundColor: 'red'}})

        }
    };

    const handleReset = () => {
        setIsRunning(false);
        setMinute(inputMinRef.current.value);
        setSecond(inputSecRef.current.value);
        setStyles({start: {backgroundColor: '#3acf2c'}})

        startRef.current.innerText = 'Start';
    };
    const handleDelete = () => {
        setStyles({container: {visibility: "hidden"}})
        setIsRunning(false);
        setMinute(0);
        setSecond(0);
        inputMinRef.current.value = '';
        inputSecRef.current.value = '';
        startRef.current.innerText = 'Start';
    };

    const handleSubmit = () => {
        setProgress(progress + 100);
        const min = parseInt(inputMinRef.current.value, 10);
        const sec = parseInt(inputSecRef.current.value, 10);

        if (isNaN(min) || isNaN(sec)) {
            setError('Please enter valid numbers.');
            return;
        }

        if (sec >= 60) {
            setError('Please enter Second less than 60.');
        } else if (min < 0 || sec < 0) {
            setError('Please enter Minute or Second 0 or more than 0.');
        } else {
            setError('');
            setMinute(min);
            setSecond(sec);
            setStyles({container: {visibility: "visible"}})
        }
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
            <div className="container2">
                <form action="" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <label htmlFor="min">Minute</label>
                    <input ref={inputMinRef} id="min" name="min" type="number" />
                    <br />
                    <label htmlFor="sec">Second</label>
                    <input ref={inputSecRef} id="sec" name="sec" type="number" />
                    <br />
                    <button type="submit">Enter</button>
                </form>
                <br />
                {
                error ? <p id='error' style={{ color: 'red' }}>{error}</p> :             
                <div style={styles.container}>
                    <div className="btns">
                        <p className="timer">
                            {String(minute).padStart(2, '0')}:{String(second).padStart(2, '0')}
                        </p>
                        <button style={styles.start} ref={startRef} onClick={handleStart} className='start' type="button">Start</button>
                        <button onClick={handleReset} className='reset' type="button">Reset</button>
                        <button onClick={handleDelete} className='delete' type="button">Delete</button>
                    </div>
                </div>
                }
            </div>

        </>
    );
}

export default Timer2;
