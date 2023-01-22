import { useState, useEffect } from 'react';

import './App.css';
import InstructionList from './components/InstructionList';
import InstructionPointerList from './components/InstructionPointerList';
import CellList from './components/CellList';
import CellPointerList from './components/CellPointerList';
import Output from './components/Output';


function App() {
  const [programState, setProgramState] = useState(0);
  const [pointerPos, setPointerPos] = useState(0);
  const [cells, setCells] = useState([])
  const [instructionPos, setInstructionPos] = useState(0);
  const [loopStart, setLoopStart] = useState(0);
  const [output, setOutput] = useState(undefined);
  const [finished, setFinished] = useState(false);
  const [greyOut, setGreyOut] = useState('none');
  const [running, setRunning] = useState(false);

  const instructions = (">+++[<+++>-]<.").split('');

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
        console.log('end of program')
        break;
    }
  }

  function populateCell() {
    (cells[pointerPos] === undefined) && setCells(updateCells())
  }

  function step() {
    console.log(programState+' '+insVal)
    populateCell();
    if (!finished) {
      if (insVal === '.') {
        setFinished(true);
        setOutput(pointerVal);
        setGreyOut('greyed-out')
      }
      translator(insVal);
      loopFlag ? setInstructionPos(loopStart) : setInstructionPos(instructionPos + 1);
      setProgramState(programState + 1);
    }
  }

  function run() {
    setRunning(running => !running)
    console.log("It's alive!")
  }

  function reload(){
    window.location.reload();
  }

  useEffect(() => {
    if (!finished&&running) {
      const alive = setInterval(step, 200);
      return () => clearInterval(alive);
    }
  }, [running,finished,instructionPos]);

  const keyedList = [];

  for (let i = 0; i < instructions.length; i++) {
    keyedList.push({
      key: i,
      instruction: instructions[i],
      pointer: (i === instructionPos) ? 'instruction-pointer' : 'empty-pointer',
      run: (i < instructionPos) ? 'ran' : 'not-yet',
      greyOut: greyOut,
      endLoop: ((instructionPos < programState) || (instructionPos > i)) ? 'display-end' : 'nah'
    })
  }

  const keyedCells = [];


  for (let i = 0; i < 15; i++) {
    keyedCells.push({
      key: i,
      cell: (cells[i] || 0),
      pointer: (i === pointerPos) ? 'cell-pointer' : 'empty-pointer'
    });

    (i < 6) || keyedCells.unshift({
      key: -i,
      cell: 0,
      pointer: 'empty-pointer'
    })
  }


  return (
    <div className="App">
      <div className={'centerer ' + greyOut}>
        <InstructionPointerList pointers={keyedList} />
        <InstructionList instructions={keyedList} />
        <div>Instructions</div>
        <div className='spacer' />
        <CellPointerList pointers={keyedCells} />
        <CellList cells={keyedCells} />
        <div>Cells</div>
      </div>
      <div className='spacer' />
      <Output output={output} />
      <div className='button-container'>
        <button onClick={step} >Step</button>
        <button onClick={run} >Run</button>
        <button onClick={reload} >Reload</button>
      </div>
    </div>
  );
}

export default App;
