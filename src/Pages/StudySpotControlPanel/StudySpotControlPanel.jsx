// FOLDER IS TO BE REMOVED!
import { useState } from 'react';
import './StudySpotControlPanel.scss'
import { BsFillPencilFill } from "react-icons/bs";
import { FaRegShareSquare } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6"; //filled in book mark

const StudySpotControlPanel = () => {
    const [isBookMarked, setIsBookMarked] = useState('false');

    const toggleBookmarkicon = () => {
        setIsBookMarked((prevState) => !prevState);
    }
    return (
        <div className='study-ctrl-pnl-bx'>
            <button className='study-ctrl-pnl-bx__suggest-edit-button'><BsFillPencilFill className="study-ctrl-pnl-bx__icon"/></button>

            <button className='study-ctrl-pnl-bx__share-button'><FaRegShareSquare className="study-ctrl-pnl-bx__icon"/></button>

            <button className='study-ctrl-pnl-bx__save-button' onClick={toggleBookmarkicon}> {isBookMarked ? <FaRegBookmark className="study-ctrl-pnl-bx__icon"/> : <FaBookmark className="study-ctrl-pnl-bx__icon"/>} </button>
        </div>
    )
}

export default StudySpotControlPanel;