import StudySpots from "../../SampleData/StudySpots";
import StudySpotCard from "./StudySpotCard";
import "./SpotCardsFilter.css";
import { BiVolumeMute } from "react-icons/bi";
import { TbSofa, TbBatteryCharging2, TbLockOpen, TbMicrowave  } from "react-icons/tb";
import { MdOutlineFastfood, MdOutlineDoorFront,   } from "react-icons/md";

const SpotCardsFilter = ({ filterSelected, onFilterSelect }) => {
  const filterOptions = [
    { label: 'Quiet', value: 'quiet', icon: <BiVolumeMute size={20} className="filter-icon"/> },
    // { label: 'Comfy', value: 'comfy', icon: <TbSofa size={20} className="filter-icon"/> },
    // { label: 'Not busy', value: 'not-busy', icon: <MdOutlineGroupOff size={20} className="filter-icon"/> },
    { label: 'Outlets', value: 'outlets', icon: <TbBatteryCharging2 size={20} className="filter-icon"/> },
    { label: 'Microwaves', value: 'microwaves', icon: <TbMicrowave  size={20} className="filter-icon"/> },
    { label: 'Restaurants', value: 'restaurants', icon: <MdOutlineFastfood  size={20} className="filter-icon"/> },
    { label: 'Open Now', value: 'open-now', icon: <MdOutlineDoorFront size={20} className="filter-icon"/> },
    
    // Add more filter options as needed
  ];

  const selected = (value) => {
    return filterSelected.includes(value);
  }

  const handleFilterSelect = (option) => {
    onFilterSelect((prevFilters) =>
      selected(option.value)
        ? prevFilters.filter((filter) => filter !== option.value)
        : prevFilters.concat([option.value]));
  };

  return (
    <div className="filter-container">
      {filterOptions.map((option) => (
        <div
          key={option.label}
          className={selected(option.value) ? "filter-item selected" : "filter-item"}
          data-filter={option.value}
          onClick={() => handleFilterSelect(option)}
        >
          {option.icon}
          <span>{option.label}</span>
        </div>
      ))}
    </div>
  )
}

export default SpotCardsFilter;