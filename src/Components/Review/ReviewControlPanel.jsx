import './ReviewControlPanel.scss'
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const ReviewControlPanel = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("TO BE DONE!");
  }

  return (
    <div className='review-control-panel-box'>

      <form className="review-control-panel-box__search-box" onSubmit={handleSearch}>
        <FaSearch className="review-control-panel-box__icon" />
        <input className="review-control-panel-box__input-search"  type="text" value={searchTerm} onChange={handleChange} placeholder='Search Reviews'/>
      </form>

      <div className='review-control-panel-box__filter'>

      </div>
      <div className='review-control-panel-box__sort-by'>

      </div>
    </div>
  )
}

export default ReviewControlPanel