import { useState, useEffect } from 'react';

import './App.css';
import InstructionList from './components/InstructionList';
import CellList from './components/CellList';
import CellPointerList from './components/CellPointerList';
import OutputList from './components/OutputList';

let pointerPos = 0;
let instructionPos = 0;
let loopStart = [];
let finished = false;
let greyOut = 'none';

const cells = {};
const output = [];


function App() {
  const [programState, setProgramState] = useState(0);
  const [running, setRunning] = useState(false);

  const instructions = (">++[<++>-]<<><><><><><><>.....").split('');

  let pointerVal = (cells[pointerPos] === undefined) ? 0 : cells[pointerPos];
  let insVal = instructions[instructionPos];


  function translator(ins) {
    switch (ins) {
      case '+':
        cells[pointerPos]++;
        break;
      case '-':
        cells[pointerPos]--;
        break;
      case '>':
        pointerPos++;
        break;
      case '<':
        pointerPos--;
        break;
      case '[':
        loopStart.push(instructionPos);
        break;
      case ']':
        (pointerVal > 0) ? (instructionPos = loopStart[loopStart.length - 1] - 1) : loopStart.pop();
        break;
      case '.':
        output.push(pointerVal);
        break;
      default:
        console.log('end of program')
        finished = true;
        greyOut = 'greyed-out';
        break;
    }
  }


  function step() {
    (cells[pointerPos] === undefined) && (cells[pointerPos] = 0);
    if (!finished) {
      translator(insVal);
      instructionPos++;
      setProgramState(programState + 1);
    }
  }

  function run() {
    setRunning(running => !running)
    console.log("It's alive!")
  }

  function reload() {
    window.location.reload();
  }

  useEffect(() => {
    if (!finished && running) {
      const alive = setInterval(step, 200);
      return () => clearInterval(alive);
    }
  }, [running, finished, programState]);

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


  for (let i = -15; i < 15; i++) {
    keyedCells.push({
      key: i,
      cell: (cells[i] || 0),
      pointer: (i === pointerPos) ? 'cell-pointer' : 'empty-pointer'
    });
  }

  const keyedOutput = [];

  for (let i = 0; i < output.length; i++) {
    keyedOutput.push({
      key: i,
      output: output[i]
    })
  }


  return (
    <div className="App">
      <div className={'centerer ' + greyOut}>
        <div>Instructions</div>
          <InstructionList instructions={keyedList} />
  
        <div className='spacer' />
        <div>Cells</div>
        <CellPointerList pointers={keyedCells} />
        <CellList cells={keyedCells} />
        
      </div>
      <div className='spacer' />
      <div>Output</div>
      <OutputList output={keyedOutput} />
      <div className='button-container'>
        <button onClick={step} >Step</button>
        <button onClick={run} >Run</button>
        <button onClick={reload} >Reload</button>
      </div>
    </div>
  );
}

export default App;
