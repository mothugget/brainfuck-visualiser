import { useState, useEffect } from 'react';

import './App.css';




function App() {
  const [programState, setProgramState] = useState(0);
  const [pointerPos, setPointerPos] = useState(0);
  const [cells, setCells] = useState([])
  const [insPos, setInsPos] = useState(0);
  const [loopStart, setLoopStart] = useState(0);
  const [output, setOutput] = useState(undefined)

  const instructions = (">++[<++>-].").split('');
  let pointerVal = (cells[pointerPos] === undefined) ? 0 : cells[pointerPos];
  let insVal = instructions[insPos];

  function updateCells(value) {
    const resArr = [...cells];
    if(value===undefined) {
        resArr[pointerPos]=0;
      return resArr
    }
    resArr[pointerPos] = pointerVal+value;
    return resArr;
  }

  function translator(ins) {
    switch (ins) {
      case '+':
        setCells(updateCells(1));
        break;
      case '-':
        setCells(updateCells(-1))
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
        console.log(pointerVal)
        (pointerVal>0)&&setInsPos(loopStart);
        break;
      default:
        console.log('no such ins')
        break;
    }
  }

  function populateCell() {
    (cells[pointerPos] === undefined) && setCells(updateCells())
  }

  function step() {
    populateCell();
    (insVal === '.')&&setOutput(pointerVal);
    if (output === undefined) {
      console.log(insVal)
      translator(insVal);
      console.log(insPos)
      setInsPos(insPos + 1);
      setProgramState(programState + 1);
    }
  }

  return (
    <div className="App">
      {programState} <br />
      {insVal} <br />
      {insPos} <br />
      {cells}<br />
      <button onClick={step} >Step</button><br />
      {output}
    </div>
  );
}

export default App;
