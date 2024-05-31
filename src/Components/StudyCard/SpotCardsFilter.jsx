import StudySpots from "../../SampleData/StudySpots";
import StudySpotCard from "./StudySpotCard";
import "./SpotCardsFilter.css";

const SpotCardsFilter = () => {
  return (
    <div className="filter-container">
      <div className="filter-item">
        <img src="src\Components\Assets\ForestCenter.jpg" alt="Filter 1"/>
        <span>Filter 1</span>
      </div>
      <div className="filter-item">
        <img src="placeholder.jpg" alt="Filter 2"/>
        <span>Filter 2</span>
      </div>
      <div className="filter-item">
        <img src="placeholder.jpg" alt="Filter 3"/>
        <span>Filter 3</span>
      </div>
      <div className="filter-item">
        <img src="placeholder.jpg" alt="Filter 4"/>
        <span>Filter 4</span>
      </div>
      <div className="filter-item">
        <img src="placeholder.jpg" alt="Filter 5"/>
        <span>Filter 5</span>
      </div>
    </div>
  )
}

export default SpotCardsFilter;