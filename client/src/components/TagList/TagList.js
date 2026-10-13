
export default function TagList (props) {    
    const handleClassChange = (ev) => {
        
        if (ev.target.className == "active-filter") {
            ev.target.className = ""
            //props.updateFunc(null)
        } else {
            ev.target.className = "active-filter"
        }
    }

    return (
        <div className="tag-list-div">
            <p onClick={(e) => {
                props.updateFunc(["Flower"])
                handleClassChange(e)
                }}>Flower</p>
            <p onClick={(e) => {
                props.updateFunc(["Plant"])
                handleClassChange(e)
                }}>Plant</p>
            <p onClick={(e) => {
                props.updateFunc(["Sky"])
                handleClassChange(e)
                }}>Sky</p>
            <p onClick={(e) => {
                props.updateFunc(["Landscape"])
                handleClassChange(e)
                }}>Landscape</p>
            <p onClick={(e) => {
                props.updateFunc(["Urban"])
                handleClassChange(e)
                }}>Urban</p>
            <p onClick={(e) => {
                props.updateFunc(["Butterfly"])
                handleClassChange(e)
                }}>Butterfly</p>
            <p onClick={(e) => {
                props.updateFunc(["Deer"])
                handleClassChange(e)
                }}>Deer</p>
            <p onClick={(e) => {
                props.updateFunc(["Heron"])
                handleClassChange(e)
                }}>Heron</p>
            <p onClick={(e) => {
                props.updateFunc(["Duck"])
                handleClassChange(e)
                }}>Duck</p>
            <p onClick={(e) => {
                props.updateFunc(["Goose"])
                handleClassChange(e)
                }}>Goose</p>
            <p onClick={(e) => {
                props.updateFunc(["Bird"])
                handleClassChange(e)
                }}>Bird</p>
            <p onClick={(e) => {
                props.updateFunc(["Inset"])
                handleClassChange(e)
                }}>Insect</p>
            <p onClick={(e) => {
                props.updateFunc(["Mushroom"])
                handleClassChange(e)
                }}>Mushroom</p>
            <p onClick={(e) => {
                props.updateFunc(["Vehicle"])
                handleClassChange(e)
                }}>Vehicle</p>
            <p onClick={(e) => {
                props.updateFunc(["Owl"])
                handleClassChange(e)
                }}>Owl</p>
            <p onClick={(e) => {
                props.updateFunc(["Squirrel"])
                handleClassChange(e)
                }}>Squirrel</p>
            <p onClick={(e) => {
                props.updateFunc(["Chipmunk"])
                handleClassChange(e)
                }}>Chipmunk</p>
            <p onClick={(e) => {
                props.updateFunc(["Moon"])
                handleClassChange(e)
                }}>Moon</p>
            <p onClick={(e) => {
                props.updateFunc(["Frog"])
                handleClassChange(e)
                }}>Frog</p>
            <p onClick={(e) => {
                props.updateFunc(["Fish"])
                handleClassChange(e)
                }}>Fish</p>
            <p onClick={(e) => {
                props.updateFunc(["Snake"])
                handleClassChange(e)
                }}>Snake</p>
            <p onClick={(e) => {
                props.updateFunc(["People"])
                handleClassChange(e)
                }}>People</p>
            <p onClick={(e) => {
                props.updateFunc(["Family"])
                handleClassChange(e)
                }}>Family</p>
            <p onClick={(e) => {
                props.updateFunc(["Sun"])
                handleClassChange(e)
                }}>Sun</p>
            <p onClick={(e) => {
                props.updateFunc(["Trailsign"])
                handleClassChange(e)
                }}>Trailsign</p>
            <p onClick={(e) => {
                props.updateFunc(["Scrap"])
                handleClassChange(e)
                }}>Scrap</p>
            <p onClick={(e) => {
                props.updateFunc(["Tree"])
                handleClassChange(e)
                }}>Tree</p>
            <p onClick={(e) => {
                props.updateFunc(["Shell"])
                handleClassChange(e)
                }}>Shell</p>
            <p onClick={(e) => {
                props.updateFunc(["Dam"])
                handleClassChange(e)
                }}>Dam</p>
            <p onClick={(e) => {
                props.updateFunc(["Spring"])
                handleClassChange(e)
                }}>Spring</p>
            <p onClick={(e) => {
                props.updateFunc(["Summer"])
                handleClassChange(e)
            }}>Summer</p>
            <p onClick={(e) => {
                props.updateFunc(["Fall"])
                handleClassChange(e)
            }
            }>Fall</p>
            <p onClick={(e) => {
                props.updateFunc(["Winter"])
                handleClassChange(e)
                }}>Winter</p>
            <p onClick={(e) => {
                props.updateFunc(["Sign"])
                handleClassChange(e)
                }}>Sign</p>
            <p onClick={(e) => {
                props.updateFunc(["Water"])
                handleClassChange(e)
                }}>Water</p>
            <p onClick={(e) => {
                props.updateFunc(["Beach"])
                handleClassChange(e)
                }}>Beach</p>
            <p onClick={(e) => {
                props.updateFunc(["Trail"])
                handleClassChange(e)
                }}>Trail</p>
        </div>
    )
}