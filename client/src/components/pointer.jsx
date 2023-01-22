import pointerArrow from '../images/pointerArrow.png'

export default function Pointer(props) {
    return (
        <div className='Pointer'>
            {(props.pointer === 'cell-pointer') && <img className='cell-pointer' src={pointerArrow} alt='pointer' />}
        </div>
    )
}
