import { useState, useEffect } from 'react';

import './App.css';
import InstructionList from './components/InstructionList';
import CellList from './components/CellList';
import OutputList from './components/OutputList';
import SettingsModal from './components/SettingsModal';
import InputModal from './components/InputModal';

let pointerPos = 0;
let instructionPos = 0;
let maxIns = 0;
let loopStart = [];
let finished = false;
let greyOut = 'none';
let outputString = '';
let cells = {};
let output = [];

let instructions

let interval;



function App() {
  const [programState, setProgramState] = useState(0);
  const [running, setRunning] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false)
  const [inputModal, setInputModal] = useState(false)

  if (window.localStorage.instructions) {
    instructions = JSON.parse(window.localStorage.instructions)
  } else {
    instructions = ('>++++++++[<+++++++++>-]<.').split('')
  }

  if (window.localStorage.interval) {
    interval = JSON.parse(window.localStorage.interval);
  } else {
    interval = 100;
  }

  let pointerVal = (cells[pointerPos] === undefined) ? 0 : cells[pointerPos];
  let insVal = instructions[instructionPos];


  function interpreter(ins) {
    switch (ins) {
      case '+':
        (pointerVal === 255) ? (cells[pointerPos] = 0) : cells[pointerPos]++;
        break;
      case '-':
        (pointerVal === 0) ? (cells[pointerPos] = 255) : cells[pointerPos]--;
        break;
      case '>':
        pointerPos++;
        break;
      case '<':
        pointerPos--;
        break;
      case '[':
        (loopStart[loopStart.length - 1] !== instructionPos) && loopStart.push(instructionPos);
        break;
      case ']':
        (pointerVal > 0) ? (instructionPos = loopStart[loopStart.length - 1] - 1) : loopStart.pop();
        break;
      case '.':
        output.push(pointerVal);
        outputString += String.fromCharCode(pointerVal)
        break;
      case ',':
        running && setRunning(false);
        setInputModal(true);
        break;
      default:
        console.log('end of program')
        finished = true;
        greyOut = 'greyed-out';
        break;
    }
  }

  function populateCells() {
    (cells[pointerPos] === undefined) && (cells[pointerPos] = 0);
  }

  function updateMaxIns() {
    (instructionPos > maxIns) && (maxIns = instructionPos);
  }

  function step() {
    populateCells()
    if (!finished) {
      interpreter(insVal);
      instructionPos++;
      updateMaxIns()
      setProgramState(programState + 1);
    }
  }

  function stepClick() {
    running && setRunning(false);
    step();
  }

  function run() {
    finished && reset();
    running || console.log('Program running')
    setRunning(running => !running)
  }

  function reset() {
    pointerPos = 0;
    instructionPos = 0;
    maxIns = 0;
    loopStart = [];
    finished = false;
    greyOut = 'none';
    outputString = '';
    cells = {};
    output = [];
    setProgramState(0);
    setRunning(false);
    setSettingsModal(false);
  }

  function input() {
    running && setRunning(false);
    setSettingsModal(true)
  }



  useEffect(() => {
    if (!finished && running) {
      const alive = setInterval(step, interval);
      return () => clearInterval(alive);
    }
  }, [running, finished, programState, step]);

  const keyedList = [];

  for (let i = 0; i < instructions.length; i++) {
    keyedList.push({
      key: i,
      instruction: instructions[i],
      pointer: (i === instructionPos) ? 'instruction-pointer' : 'empty-pointer',
      run: (i < instructionPos) ? 'ran' : 'not-yet',
      greyOut: greyOut,
      endLoop: ((i <= maxIns) || (instructionPos > i)) ? 'display-end' : 'nah'
    })
  }

  const keyedCells = [];

  let maxCell = Math.max.apply(Math, Object.keys(cells));
  (maxCell === -Infinity) && (maxCell = 0)

  let minCell = Math.min.apply(Math, Object.keys(cells));
  (minCell === Infinity) && (minCell = 0)

  for (let i = minCell; i < maxCell + 40; i++) {
    keyedCells.push({
      key: i,
      cell: (cells[i] || 0),
      pointer: (i === pointerPos) ? 'cell-pointer' : 'empty-pointer',
      sign: (i < 0) ? 'negative' : 'positive'
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
      {inputModal &&
        <>
          <div className='bg-blur' />
          <InputModal setInputModal={setInputModal} cells={cells} pointerPos={pointerPos} />
        </>
      }
      {settingsModal &&
        <>
          <button className='bg-blur' onClick={() => setSettingsModal(false)} />
          <SettingsModal
            setSettingsModal={setSettingsModal}
            instructions={instructions}
            interval={interval}
            reset={reset}
          />
        </>
      }
      <div className={'centerer ' + greyOut}>
        <div>Instructions</div>
        <InstructionList instructions={keyedList} />
        <div className='spacer' />
        <div className='cells-container'>
          <div>Cells</div>
          <CellList cells={keyedCells} />
        </div>
      </div>
      <h3>Steps</h3>
      <div className='programstate-string'>{programState}</div>
      <h3>Output</h3>
      <OutputList output={keyedOutput} />
      <div className='output-string'> {outputString} </div>
      <div className='button-container'>
        <button onClick={stepClick} >Step</button>
        <button onClick={run} >{running ? 'Stop' : 'Run'}</button>
        <button onClick={reset} >Reset</button>
        <button onClick={input} >Settings</button>
      </div>
    </div>
  );
}

export default App;
