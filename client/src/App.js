import { useState, useEffect } from 'react';

import './App.css';




function App() {
  const [programState, setProgramState] = useState(0);
  const [pointerPos, setPointerPos] = useState(0);
  const [cells, setCells] = useState([])
  const [instructionPos, setInstructionPos] = useState(0);
  const [loopStart, setLoopStart] = useState(0);
  const [output, setOutput] = useState(undefined)

  const instructions = (">++++++++[<+++++++++>-]<.").split('');

  let loopFlag = false;
  let pointerVal = (cells[pointerPos] === undefined) ? 0 : cells[pointerPos];
  let insVal = instructions[instructionPos];

  function updateCells(value) {
    const resArr = [...cells];
    if (value === undefined) {
      resArr[pointerPos] = 0;
      return resArr
    }
    resArr[pointerPos] = pointerVal + value;
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
        setLoopStart(instructionPos);
        break;
      case ']':
        (pointerVal > 0) && (loopFlag = true);
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
    (insVal === '.') && setOutput(pointerVal);
    if (output === undefined) {
      console.log(insVal)
      translator(insVal);
      loopFlag ? setInstructionPos(loopStart) : setInstructionPos(instructionPos + 1);
      setProgramState(programState + 1);
    }
  }

  // function jump() {
  //   populateCell();
  //   while (insVal === '+' && instructions[instructionPos + 1]){}
  //     (insVal === '.') && setOutput(pointerVal);
  //   if (output === undefined) {
  //     console.log(insVal)
  //     translator(insVal);
  //     loopFlag ? setInstructionPos(loopStart) : setInstructionPos(instructionPos + 1);
  //     setProgramState(programState + 1);
  //   }
  // }

  return (
    <div className="App">
      {instructions} <br />
      {programState} <br />
      {insVal} <br />
      {instructionPos} <br />
      {cells}<br />
      <button onClick={step} >Step</button><br />
      {output}
    </div>
  );
}

export default App;
