

export default function SettingsModal(props) {
    const acceptableChar = ['<', '>', '+', '-', '[', ']', '.', ',']

    function cleanInput(string) {
        const resArr = [];
        string.split('').forEach(char => {
            acceptableChar.includes(char) && resArr.push(char)
        });
        return resArr.join('');
    }

    function saveCode(event) {
        event.preventDefault();
        if (event.target[0].value) {
            let cleanCode = cleanInput(event.target[0].value);
            window.localStorage.instructions = JSON.stringify(cleanCode);
        }
        props.reset()
        props.setSettingsModal(false);
    }

    function changeInterval(event) {
        event.preventDefault();
        window.localStorage.interval = JSON.stringify(event.target[0].value);
    }

    function helloWorld(event) {
        event.preventDefault();
        window.localStorage.instructions = JSON.stringify('++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.');
        props.setSettingsModal(false);
    }

    function hCode(event) {
        event.preventDefault();
        window.localStorage.instructions = JSON.stringify('>+++++++++[<++++++++>-]<.');
        props.setSettingsModal(false);
    }

    return (
        <div className='SettingsModal modal'>
            Current code: {props.instructions}
            <form onSubmit={saveCode}>
                <textarea type='text' name='code' placeholder="Your code goes here " />
                <div className="form-button-container">
                    <button type='submit'>Save</button>
                    <button onClick={helloWorld}>Hello world!</button>
                    <button onClick={hCode}>H</button>
                </div>
            </form>
            <form onSubmit={changeInterval}>
                <input type='number' min='1' name='code' placeholder={'Current interval: ' + props.interval} />
                <button type='submit'>Set interval</button>
            </form>
        </div>
    )
}
