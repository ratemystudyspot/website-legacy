import { BiVolumeMute } from "react-icons/bi";
import { TbSofa, TbBatteryCharging2, TbLockOpen, TbMicrowave } from "react-icons/tb";
import { MdOutlineFastfood, MdOutlineDoorFront, } from "react-icons/md";
import { GoRepoLocked } from "react-icons/go";

const filterOptions = [
  { label: 'Quiet', value: 'quiet', icon: <BiVolumeMute size={20} className="filter-icon" /> },
  // { label: 'Comfy', value: 'comfy', icon: <TbSofa size={20} className="filter-icon"/> },
  // { label: 'Not busy', value: 'not-busy', icon: <MdOutlineGroupOff size={20} className="filter-icon"/> },
  { label: 'Outlets', value: 'outlets', icon: <TbBatteryCharging2 size={20} className="filter-icon" /> },
  { label: 'Study Rooms', value: 'study-rooms', icon: <GoRepoLocked size={20} className="filter-icon" /> },
  { label: 'Microwaves', value: 'microwaves', icon: <TbMicrowave size={20} className="filter-icon" /> },
  { label: 'Food Near', value: 'food-near', icon: <MdOutlineFastfood size={20} className="filter-icon" /> },
  { label: 'Open Now', value: 'open-now', icon: <MdOutlineDoorFront size={20} className="filter-icon" /> },

  // Add more filter options as needed
];

export default filterOptions;