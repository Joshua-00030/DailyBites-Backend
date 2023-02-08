import './UserItem.css';

const UserItem = ({item}) => {
    return (
        <div className="card">
            <div className="header">{item.name}</div>
            <div className="body">{item.calories}</div>
        </div>
    )
  }
  
  export default UserItem
