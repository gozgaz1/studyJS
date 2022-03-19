import React, { useState, useEffect } from 'react';
import './App.css';


// todo: make a click functionality to start a countdown, if clicked again, it cancel the countdown
// todo: make a text manager (input component):
// phone input (ex: 4057623336)
// formatting MUST happen in the <input> or whatever textbox we use
/*
405 => (405)
7 => (405) - 7
62 => (405) - 762 
3336 => (405) - 762 - 3336
*/
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
  }, [countDown, clickTimer]);

  const handleClickOnce = () => {
    setClickTimer(setInterval(() => {
      setCountDown((countDown) =>countDown - 1)
    },1000))
  }
  const handleClickReset = () => {
    clearInterval(clickTimer);
    setCountDown(time);
    setClickTimer(null);
  }

  return <button onClick={handleClickOnce}>
    {clickTimer ? `${countDown} sec left...` : name}
    </button>
}

const PhoneInput = () => {
  // phoneNum can only be number, no string
  const [phoneNum, setPhoneNum] = useState('');

  const handleKeyDown = (e) => {
    if(e.keyCode === 8 && e.target.value.length === 5){
      setPhoneNum(() => e.target.value.substring(1,4));
    }
  }
  const handleOnInput = (e) => {
    // only accept numbers
    e.target.value = e.target.value.replace(/[^0-9.]/g, '');
  }

  const handleChange = (e) => {
    const targetValue = e.target.value;
    let formattedValue = targetValue;
    if (targetValue.length >= 7) {
      formattedValue = '(' + targetValue.substring(0,3) + ') - ' + targetValue.substring(3,6) + ' - ' + e.target.value.substring(6);
    }
    else if (targetValue.length >= 4) { 
      formattedValue = '(' + targetValue.substring(0,3) + ') - ' + targetValue.substring(3);
    }  
    else if (targetValue.length >= 3) { 
      formattedValue = '(' + targetValue.substring(0,3) + ')';
    }
    setPhoneNum(formattedValue);
  }

  return <div>
    <label htmlFor='phone'>Phone Number: </label>
    <input 
      id='phone'
      type='text' 
      maxLength='18'
      value={phoneNum}
      title='Phone Number'
      onInput={handleOnInput}
      onChange={handleChange} // if i want this to be dynamic, make this a component passed in
      onKeyDown={handleKeyDown}
    /> 
  </div>
}




// table
// needs col and row
// able to drag and highlight the cells which are selected
// component: must be able to identify dimension
// after drag highlight, output the count of the highlighted cells

const SpreadSheet = ({row, col}) => {
  const [cellsMap, setCellsMap] = useState(new Map());

  const cellStyle = {
    border: '1px solid',
    padding: '0px 1em 0px 1em',
  };

  const tableStyle = {
    border: '1px solid',
    borderCollapse: 'collapse',
  };

  const getCell = (cell) => {
    let newCellsMap = new Map(cellsMap).set(cell.target.id, true);
    setCellsMap(newCellsMap);
    console.log(newCellsMap);
  }

  const generateRow = () => {
    let rows = [];
    let cells = new Map();
    for (let r = 0; r < row; r++) {
      let cols = [];
      let alphaAscii = String.fromCharCode(r + 65);
      for (let c = 0; c < col; c++) {
        let colID = alphaAscii + '' + c;
        cols.push(<td key={colID} id={colID} style={cellStyle} onClick={getCell}>{colID}</td>);
        cells[colID] = false; // each cell is {ID: clicked}
      }
      rows.push(<tr key={r} id={r}>{cols}</tr>);
    }
    return <table style={tableStyle}>
      <tbody>
        {rows}
      </tbody>
    </table>
  }

  return generateRow();
}


function App() {
  return (
    <div className="App">
      {/*
      <ButtonDown name={'3sec'} time={3} func={() => {console.log('hello world')}} />
      <ButtonDown name={'5sec'} time={5} func={() => {console.log('welcome')}} />
      <PhoneInput />
    */}
    <SpreadSheet row={10} col={7} />
    </div>
  );
}



export default App;