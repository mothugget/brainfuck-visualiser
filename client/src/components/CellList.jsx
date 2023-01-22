import Cell from './Cell'

export default function CellList(props) {
    return (
        <div className="CellList list" >
            {props.cells.map(cell =>
                <Cell
                    key={cell.key}
                    cell={cell.cell}
                    pointer={cell.pointer}
                />
            )}
        </div>
    )
}
