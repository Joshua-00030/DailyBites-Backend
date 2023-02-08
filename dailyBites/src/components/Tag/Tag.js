import './Tag.css'

const Tag = ({type, label}) => {

    const handleClick = (e) => {
        //make active to nonactive
        if(e.target.classList.contains("active-tag")) {
            e.target.classList.remove("active-tag")
            e.target.classList.add("nonactive-tag")
        //make nonactive to active
        } else {
            e.target.classList.add("active-tag")
            e.target.classList.remove("nonactive-tag")
        }
    }

    const handleAdd = (e) => {
    
    }

    return (
        <button
        type="button"
        className={type === "add" ? "tag-button add-tag" : "tag-button nonactive-tag"}
        onClick={type === "tag-bar" ? handleClick : handleAdd}>
        {label}
        </button>
    )
}

export default Tag