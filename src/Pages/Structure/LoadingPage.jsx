import { React, useEffect, useState } from 'react';
import './Structure.css'
import { BiLoaderAlt } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

/*
Loading.props {
  type: type of navigation ("link" or "page"),
  to: go to this link or page after buffer,
  hook: a hook such as setRecoveryState() (should only use if type==="page"),
  items: items inside of the state to perserve state (should only use if type==="page"),
}
*/

const Loading = (props) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  const navigateNext = () => {
    // props.link is the link you want to go to
    if (props.type === "link") return navigate(props.to);
    // e.g. a hook could be setRecoveryState(); props.page is page you want to go to; props.items is the other items within the hook's object
    if (props.type === "page") return props.hook({ ...props.items, page: props.to }); // when merging, both will have the same page key, but the latter page overwrites the inital page's value
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    if (count === 2) return navigateNext(); // CHANGE SECONDS TO BUFFER

    return () => clearTimeout(timer)
  }, [count]);

  return (
    <div>
      <BiLoaderAlt className="loaderIcon" />
    </div>
  );
}

export default Loading;