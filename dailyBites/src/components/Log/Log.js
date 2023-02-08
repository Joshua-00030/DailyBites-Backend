import './Log.css';
import CalorieBar from '../CalorieBar/CalorieBar';
import Tagbar from '../Tagbar/Tagbar';
import ItemContainer from '../ItemContainer/ItemContainer';
import Searchbar from '../Searchbar/Searchbar';
import { useState } from 'react';

const exampleItems = [
    { name: 'hamburger', calories: 350, tags: ['lunch'], id: 1 }, 
    { name: 'oatmeal', calories: 150, tags: ['breakfast', 'low cal'], id: 2 }, 
    { name: 'hamburger', calories: 350, tags: ['lunch'], id: 3 }, 
    { name: 'oatmeal', calories: 150, tags: ['breakfast', 'low cal'], id: 4 }, 
    { name: 'hamburger', calories: 350, tags: ['lunch'], id: 5 }, 
    { name: 'oatmeal', calories: 150, tags: ['breakfast', 'low cal'], id: 6 }, 
    { name: 'hamburger', calories: 350, tags: ['lunch'], id: 7 }, 
    { name: 'oatmeal', calories: 150, tags: ['breakfast', 'low cal'], id: 8 }, 
    { name: 'hamburger', calories: 350, tags: ['lunch'], id: 9 }, 
    { name: 'oatmeal', calories: 150, tags: ['breakfast', 'low cal'], id: 10 }, 
    { name: 'hamburger', calories: 350, tags: ['lunch'], id: 11 }, 
    { name: 'oatmeal', calories: 150, tags: ['breakfast', 'low cal'], id: 12 }, 
    { name: 'hamburger', calories: 350, tags: ['lunch'], id: 13 }, 
    { name: 'oatmeal', calories: 150, tags: ['breakfast', 'low cal'], id: 14 }, 
    { name: 'hamburger', calories: 350, tags: ['lunch'], id: 15 }
]

const Log = () => {

    const [filteredItems, setFilteredItems] = useState(exampleItems)
     
    return (
        <>
            <div className="log-container">
                <Searchbar items={exampleItems} setFilteredItems={setFilteredItems}/>
                <Tagbar />
                <ItemContainer items={filteredItems}/>
                <CalorieBar />
            </div>
        </>
    )
}

export default Log