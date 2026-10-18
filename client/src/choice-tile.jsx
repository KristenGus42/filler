export default function ChoiceTile({ onClick, color, choice }) {
    return <button className={`tile ${color} ${choice}`} onClick={onClick} />
}