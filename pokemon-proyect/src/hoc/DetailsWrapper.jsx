import { useState } from "react";
function DetailsWrapper(props) {
    const [likes, setLikes] = useState(0);
    const aumentarLikes = () => {
        setLikes(likes + 1);
    }
    return <>{props.render(likes, aumentarLikes)}</>
}

export default DetailsWrapper;