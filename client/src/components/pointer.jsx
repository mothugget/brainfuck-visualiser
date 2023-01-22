import pointerArrow from '../images/pointerArrow.png'

export default function Pointer(props) {
    return (
        <div className='Pointer'>
            {(props.pointer === 'cell-pointer') && <img className='cell-pointer-img' src={pointerArrow} alt='pointer' />}
        </div>
    )
}
