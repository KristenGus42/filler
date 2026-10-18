export default function Tile({ onClick, color }) {
    return <button className={`tile display-tile ${color}`}  onClick={onClick} />
}