

import InstructionPointer from './InstructionPointer'

export default function InstructionPointerList(props) {
    return (
        <div className="InstructionPointerList" >
            {props.pointers.map(pointer => <InstructionPointer key={pointer.key} pointer={pointer.pointer} />)}
        </div>
    )
}