import pointerArrow from '../images/pointerArrow.png'

export default function InstructionPointer(props) {
    return (
        <div className='InstructionPointer'>
            {(props.pointer === 'instruction-pointer') && <img className='instruction-pointer-img' src={pointerArrow} alt='pointer' />}
        </div>
    )
}
