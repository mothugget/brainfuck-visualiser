import { useState, useEffect } from 'react';

import './App.css';
import InstructionList from './components/InstructionList';
import InstructionPointerList from './components/InstructionPointerList';


function App() {
  const [programState, setProgramState] = useState(0);
  const [pointerPos, setPointerPos] = useState(0);
  const [cells, setCells] = useState([])
  const [instructionPos, setInstructionPos] = useState(0);
  const [loopStart, setLoopStart] = useState(0);
  const [output, setOutput] = useState(undefined)

  const instructions = (">+++[<+++++++++++++++>-]<.").split('');

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

  const keyedList = [];

  for (let i = 0; i < instructions.length; i++) {
    keyedList.push({
      key: i,
      instruction: instructions[i],
      pointer: (i === instructionPos) ? 'instruction-pointer' : 'empty-pointer'
    })
  }

  const keyedCells = [];


  for (let i = 0; i < 9; i++) {
    keyedCells.push({
      key: i,
      cell: (cells[i]||0),
      pointer: (i === pointerPos) ? 'pointer' : 'empty-pointer'
    });

    (i<6)||keyedCells.unshift({
      key: -i,
      cell: 0,
      pointer: 'empty-pointer'
    })
  }

  console.log(keyedCells)

  return (
    <div className="App">
      <button onClick={step} >Step</button>
      <InstructionPointerList pointers={keyedList} />
      <InstructionList instructions={keyedList} />
    </div>
  );
}

export default App;
