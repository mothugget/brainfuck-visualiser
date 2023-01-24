

export default function InputModal(props) {
    const acceptableChar = ['<', '>', '+', '-', '[', ']', '.']

    function cleanInput(string) {
        const resArr = [];
        string.split('').forEach(char => {
            acceptableChar.includes(char) && resArr.push(char)
        });
        return resArr.join('');
    }

    function saveCode(event) {
        let cleanCode = cleanInput(event.target[0].value)
        console.log(cleanCode)
        window.localStorage.instructions = JSON.stringify(cleanCode);
    }

    function changeInterval(event) {
        event.preventDefault();
        props.setInterval(event.target[0].value);
        props.setInputModal(false)
    }
    return (
        <div className='InputModal'>
            <form onSubmit={saveCode}>
                <input type='text' name='code' placeholder="Your code goes here " />
                <button type='submit'>Save</button>
            </form>
            <form onSubmit={changeInterval}>
                <input type='number' name='code' placeholder={'Current interval: ' + props.interval} />
                <button type='submit'>Set interval</button>
            </form>
        </div>
    )
}
