import { useState } from "react";
import { Link } from "react-router-dom";


// Why does this give props.props?
export default function YearSlice (props) {

    //const [classState, setClass] = useState("")

/*     const changeCLassOnClick = function () {
        classState == "" ? setClass("active") : setClass([])
        props.updateFunction("http://localhost:3000/image:" + props.props.Id, props.elIndex)
    } */

    const handleClick = (ev) => {
        if (ev.type === "click" && props.currIndex === props.elIndex) {
            props.updateFunction(null)
        } else {
            props.updateFunction(props.elIndex)
        }
    }

    

    return (
        
                <img loading="lazy" width={200} height={200} src={"http://localhost:3000/image:" + props.props.Id}
               /*  className={
                    classState == "" ? "" : "fullscreen"
                }
                onClick={() => changeCLassOnClick()} */

                onClick={(e) => handleClick(e)}

                className={
                    props.currIndex == props.elIndex ? "fullscreen" : ""
                }
                ></img>

    )
}