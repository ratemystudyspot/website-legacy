import { React, useEffect, useState } from 'react';
import { BiLoaderAlt } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
  
/*
Loading.props {
  type: type of navigation ("link" or "page"),
  link: go to this link after buffer,
  page: go to this page after buffer,
  hook: a hook such as setRecoveryState(),
  items: other items inside of the state besides the page,
}
*/

function Loading(props) {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  const navigateNext = () => {
    // props.link is the link you want to go to
    if (props.type === "link") return navigate(props.link);
    // e.g. a hook could be setRecoveryState(); props.page is page you want to go to; props.items is the other items within the hook's object
    if (props.type === "page") return props.hook( ...{page:props.page}, ...props.items); 
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const counter = count + 1;
      setCount(counter);
    }, 1000);
    return () => {
      clearTimeout(timer)
      if (count === 10) return navigateNext(); // CHANGE SECONDS TO BUFFER
    };
  }, [count]);

  return (
    <div>
      {console.log("here C")}
      <BiLoaderAlt style="margin-right: 7px;top: 2px;animation: spin 1s infinite linear" />
    </div>
  );
}

export default Loading;