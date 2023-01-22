

export default function Cell(props) {
    return (
        <div className={'Cell '+props.pointer}>
            {props.cell}
        </div>
    )
}
