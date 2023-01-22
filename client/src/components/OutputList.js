import Output from "./Output";


export default function OutputList(props) {
    return (
        <div className='OutputList list'>
            {props.output.map( output =>
                <Output key={output.key} output={output.output}/>
            )}
        </div>
    )
}
