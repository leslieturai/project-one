
export default function YearSlice (props) {
    const handleClick = (ev) => {
        if (ev.type === "click" && props.currIndex === props.elIndex) {
            props.updateFunction(null)
        } else {
            props.updateFunction(props.elIndex)
        }
    }

    return (
        <img loading="lazy" width={200} height={200} src={"http://localhost:3000/image:" + props.props.Id}

        onClick={(e) => handleClick(e)}

        className={
            props.currIndex == props.elIndex ? "fullscreen" : ""
        }
        ></img>
    )
}