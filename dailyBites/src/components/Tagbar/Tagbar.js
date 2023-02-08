import './Tagbar.css';
import Tag from '../Tag/Tag'

const Tagbar = () => {
//<Tag type="add" label="add"></Tag>
    return (
        <div className="tag-container">
            <Tag type="tag-bar" label="oatmeal"></Tag>
            <Tag type="tag-bar" label="breakfast"></Tag>
            <Tag type="tag-bar" label="lunch"></Tag>
            <Tag type="tag-bar" label="hamburger"></Tag>
            <Tag type="tag-bar" label="snacks"></Tag>
            <Tag type="tag-bar" label="exercise"></Tag>
        </div>
    )
  }
  
  export default Tagbar