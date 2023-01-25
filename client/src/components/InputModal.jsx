

export default function InputModal(props) {
    
    function inputByte(event) {
        event.preventDefault();
        props.cells[props.pointerPos] = event.target[0].value;
        props.setInputModal(false)
    }


    return (
        <div className='InputModal'>
            <form onSubmit={inputByte}>
                <input type='number' min='1' name='inputByte' placeholder={'Number for input'} />
                <button type='submit'>Set interval</button>
            </form>
        </div>
    )
}
