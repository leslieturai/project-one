import { use, useEffect, useState, useTransition } from "react"

export default function YearSlice ({timeFrame, rows, updateFunction}) {
    const [rangeLimit, setLimit] = useState(10)

/*     const handleClick = (ev) => {
        if (ev.type === "click" && props.currIndex === props.elIndex) {
            props.updateFunction(null)
        } else {
            props.updateFunction(props.elIndex)
        }
    } */

    const [testId, setId] = useState(null)

    useEffect(() => {


    document.addEventListener("keydown", function (event) {
        if (rows === null || rows === undefined) {
            console.log("Nothing here")
            return 
        }
        let images = Array.from(document.querySelectorAll(".img-preview"))
        
        

        if (event.key === "e") {
/*             console.log(
                images.filter((e) => Array.from(e.classList).includes("wide-view"))
            ) */


            /* 
                Set current element to remove-wide-view
                set nextSibling to wide-view
                set wide-view previousSibling classList to empty

            */
           if (images[testId] !== null && images[testId] !== undefined) {
            if (images[testId].nextSibling.nodeName === "BUTTON") {
                setId(testId + 2)
            }
            console.log(images[testId].nextSibling)
            images[testId].classList.remove("wide-view")
            images[testId].nextSibling.classList.add("wide-view")
            setId(testId + 1)
           }

            

        } 
        if (event.key === "q") {
        
        } 
        if (event.key == "Escape") {
        
        }})
    }, [testId])
   

    const handleWideView = function (idArg) {
        let images = Array.from(document.querySelectorAll(".img-preview"))
        console.log(
            images.filter((e, i) => e.src.split(":")[3] == idArg),
            idArg
        )
        images.filter((e, i) => e.src.split(":")[3] == idArg)[0].classList += " wide-view"
        images.filter((e, i) => {
            if (e.src.split(":")[3] == idArg) {
                setId(i)
            }
        })
    }   

    return (
/*         <img loading="lazy" width={200} height={200} src={"http://localhost:3000/image:" + props.props.Id}

        onClick={(e) => handleClick(e)}

        className={
            props.currIndex == props.elIndex ? "fullscreen" : "image-preview"
        }

        style={ props.currIndex !== null || props.currIndex == props.elIndex ? {pointerEvents: "none"}: null  }
        ></img> */
        <>
            <h2>{timeFrame}</h2>

            <section className="img-section">

                {
                    rows !== null ? (
                        rows.slice(0, rangeLimit).map((image, i) => {
                            return (
                                <img key={i} loading="lazy" className="img-preview" width={200} height={200} src={"http://localhost:3000/image:" + image.Id}
                                    onClick={() => handleWideView(image.Id)}
                                ></img>
                            )
                        })
                        
                    ) : <p>Loading...</p>
                }

                <button className="add-img-btn" onClick={() => {setLimit(rangeLimit + 10)}} disabled={rangeLimit > rows.length ? true : false}>
                    {
                        rows.length - rangeLimit < 0 ? "No images remaining" : "Add 10 - " + Number(rows.length - rangeLimit) + " images remaining"   
                    }
                </button>
            </section>
        </>

    )
}