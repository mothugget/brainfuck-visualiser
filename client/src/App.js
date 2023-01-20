import { useState, useEffect } from 'react';

import './App.css';




function App() {
  const [programState, setProgramState] = useState(0);
  const [pointerPos, setPointerPos] = useState(0);
  const [cells, setCells] = useState([])
  const [insPos, setInsPos] = useState(0);
  const [loopStart, setLoopStart] = useState(0);
  const [output, setOutput] = useState(undefined)

  const instructions = (">++.").split('');
  let pointerVal = cells[pointerPos];
  let insVal = instructions[insPos];


  function translator(ins) {
    console.log(ins)
    switch (ins) {
      case '+':
        setCells(cells[pointerPos]+1);
        break;
      case '-':
        setCells([...cells][pointerPos] - 1)
        break;
      case '>':
        setPointerPos(pointerPos + 1);
        break;
      case '<':
        setPointerPos(pointerPos - 1);
        break;
      case '[':
        setLoopStart(insPos);
        break;
      case ']':
        setInsPos(loopStart);
        break;
      default:
        console.log('no such ins')
        break;
    }
  }

  function populateCell() {
    (cells[pointerPos] === undefined) && setCells;
  }

  function step() {
    populateCell();
    (insVal === '.')&&setOutput(pointerVal);
    if (output === undefined) {
      translator(insVal);
      setInsPos(insPos + 1);
      console.log(insPos);
      setProgramState(programState + 1);
    }
  }

  return (
    <div className="App">
      {programState} <br />
      {insVal} <br />
      {insPos} <br />
      {cells}<br />
      <button onClick={step} >Step</button>
    </div>
  );
}

export default App;
