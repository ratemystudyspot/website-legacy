import './ReviewControlPanel.scss'
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const ReviewControlPanel = () => {

    const [searchTerm, setSearchTerm] = useState(''); 
    const [showSearchBar, setShowSearchBar] = useState(false);
    const handleChange = (e) => {
      setSearchTerm(e.target.value.toLowerCase());
    };

    const handleSearch = () => {
        console.log("TO BE DONE!");
    }

    const handleToggleSearchBar = () => [

    ]

    return (
        <div className='review-control-panel-box'>
            {(showSearchBar) ? 
            <form className="review-control-panel-box__search-box" onSubmit={handleSearch}>
                <input
                  className="review-control-panel-box__input-search"
                  type="text"
                  value={searchTerm}
                  onChange={handleChange}
                  placeholder="Search reviews"
                />
                <button type="submit" className='review-control-panel-box__search-button--open'><FaSearch className="review-control-panel-box__icon" /></button>
              </form> :
               <button className='review-control-panel-box__search-button--closed'><FaSearch className="review-control-panel-box__icon" /></button>
              }
            <div className='review-control-panel-box__filter'>
                
            </div>
            <div className='review-control-panel-box__sort-by'>
                
            </div>
        </div>
    )
}

export default ReviewControlPanel