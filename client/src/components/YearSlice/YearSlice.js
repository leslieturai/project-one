import { useEffect, useRef, useState } from "react"

export default function YearSlice ({img, mapIndex, activeIndex, handleIndex}) {
    const [rangeLimit, setLimit] = useState(10)

/*     const handleClick = (ev) => {
        if (ev.type === "click" && props.currIndex === props.elIndex) {
            props.updateFunction(null)
        } else {
            props.updateFunction(props.elIndex)
        }
    } */








    return (
/*         <img loading="lazy" width={200} height={200} src={"http://localhost:3000/image:" + props.props.Id}

        onClick={(e) => handleClick(e)}

        className={
            props.currIndex == props.elIndex ? "fullscreen" : "image-preview"
        }

        style={ props.currIndex !== null || props.currIndex == props.elIndex ? {pointerEvents: "none"}: null  }
        ></img> */
  
           




                             
        <img loading="lazy" className={
            activeIndex !== null && activeIndex === mapIndex ? "img-preview wide-view" : "img-preview"
        } width={200} height={200} src={"http://localhost:3000/image:" + img.Id}
        onClick={() => handleIndex(mapIndex)}
        ></img>
                            
    
                        
  
                


  
     

    )
}