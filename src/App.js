//import logo from './logo.svg';
//import './App.css';
import React, { useState, useEffect } from 'react';

// todo: make a click functionality to start a countdown, if clicked again, it cancel the countdown
const ButtonDown = ({name, time, func}) => {
  const [countDown, setCountDown] = useState(time);
  const [clickTimer, setClickTimer] = useState(null);
  const [holdTimeout, setHoldTimeout] = useState(null);

  useEffect(() => {
    if(countDown <= 0){
      clearInterval(clickTimer);
      setCountDown(time);
      setClickTimer(null);
      func();
    }
  }, [countDown, func, time, clickTimer]);

  const handleDown = (event) => {
    if(event.type === 'mousedown') {
      setHoldTimeout(setTimeout(func,(time*1000)));
    }
  }
  const handleUp = (event) => {
    if(event.type === 'mouseup') {
      clearTimeout(holdTimeout);
      setHoldTimeout(null);
    }
  }
  const handleClickOnce = () => {
    setClickTimer(setInterval(() => {
      setCountDown((countDown) => countDown - 1); // need some explanation in here
    },1000))
  }
  const handleClickReset = () => {
    clearInterval(clickTimer);
    setCountDown(time);
    setClickTimer(null);
  }
  return <button onMouseDown={ handleDown } onMouseUp={ handleUp } onClick={ clickTimer ? handleClickReset : handleClickOnce }>
    {clickTimer ? `${countDown} sec left...` : name}
    </button>
}

function App() {
  return (
    <div className="App">
      <ButtonDown name={'3sec'} time={3} func={() => {console.log('hello world')}}/>
      <ButtonDown name={'5sec'} time={5} func={() => {console.log('welcome')}}/>
    </div>
  );
}

export default App;
