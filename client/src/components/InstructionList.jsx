

import Instruction from './Instruction'

export default function InstructionList(props) {
    return (
        <div className="InstructionList list" >
            {props.instructions.map(instruction =>
                <Instruction
                    key={instruction.key}
                    ins={instruction}
                />
            )}
        </div>
    )
}
