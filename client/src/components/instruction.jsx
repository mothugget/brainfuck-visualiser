

export default function Instruction(props) {
    return (
        <div className={'Instruction '+props.pointer}>
            {props.instruction}
        </div>
    )
}
