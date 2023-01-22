import Pointer from './Pointer'

export default function CellPointerList(props) {
    
    return (
        <div className="CellPointerList list" >
            {props.pointers.map(pointer =>
                <Pointer
                    key={pointer.key}
                    pointer={pointer.pointer}
                />
)}
        </div>
    )
}