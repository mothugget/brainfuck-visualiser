import Pointer from './Pointer'

export default function PointerList(props) {
    return (
        <div className="PointerList list" >
            {props.pointers.map(pointer =>
                <Pointer
                    keys={pointer.keys}
                    pointer={pointer.pointer}
                />
            )}
        </div>
    )
}