import './Button.css'

const Button = ({styles, label}) => {

    return (
        <>
        <button
        className="button"
        type="button">
            {label}
        </button>
        </>
    )
}

export default Button