import './Searchbar.css'
import SearchIcon from '@mui/icons-material/Search';
import Tag from '../Tag/Tag'
//import { useState } from 'react'

const Searchbar = ({items, setFilteredItems}) => {

    //const [searchQuery, setSearchQuery] = useState([])

    const handleFilter = (e) => {
        const searchWord = e.target.value
        console.log(searchWord)
        const newFilter = items.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });
        setFilteredItems(newFilter)
    }
    
    return (
        <div className="search">
            <div className="searchInputs">
            <input 
            type="search" 
            id="search" 
            placeholder="Search tags"
            onChange={handleFilter}/>
            <div className="searchIcon">
                <SearchIcon/>
            </div>
            <button 
            className="add-button"
            type="button">new item</button>
            </div>
        </div>
        
    )
}

export default Searchbar