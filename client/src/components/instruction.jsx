import pointerArrow from '../images/pointerArrow.png'

export default function Instruction(props) {
    let start = (props.ins.instruction === '[') ? 'start' : 'not-loop';
    let end = (props.ins.instruction === ']') ? 'end' : 'not-loop';

    return (
        <div>
            <div className='InstructionPointer'>
                {(props.ins.pointer === 'instruction-pointer') && <img className='instruction-pointer-img' src={pointerArrow} alt='pointer' />}
            </div>
            <div className={`Instruction ${props.ins.pointer} ${start} ${end} ${props.ins.run} ${props.ins.greyOut} ${props.ins.endLoop}`}>
                {props.ins.instruction}
            </div>

        </div>
    )
}
