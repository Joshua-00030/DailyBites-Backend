import UserItem from '../UserItem/UserItem'
import './ItemContainer.css';


const ItemContainer = ({items}) => {
    //using example items create UserItem components for each item.
    //assign this returned list op items to the variable items and display it in the html. explodes to show contained items
    //CSS for clever 4 item per row with max size flex: https://stackoverflow.com/questions/29546550/flexbox-4-items-per-row
    return (
        <div className="item-grid-container">
            <div className="entry-cards">
            {items.map((item) => <UserItem key={item.id} item={item}></UserItem>)}
            </div>
        </div>
    )
}

export default ItemContainer