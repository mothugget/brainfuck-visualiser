import pointerArrow from '../images/pointerArrow.png'

export default function Cell(props) {
    return (
        <div>
            <div className='Pointer'>
                {(props.cell.pointer === 'cell-pointer') && <img className='cell-pointer-img' src={pointerArrow} alt='pointer' />}
            </div>
            <div className={'Cell ' + props.cell.pointer}>
                {props.cell.cell}
            </div>
        </div>
    )
}
