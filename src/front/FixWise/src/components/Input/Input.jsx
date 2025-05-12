import './Input.css'
export default function Input({placeholderText}) {
    return (
        <input type="text" className="search__input" placeholder={placeholderText} />
    )
}