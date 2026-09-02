
export default function TagList (props) {
    var updateFilter = props.updateFunc

    

    return (
        <div className="tag-list-div">
            <p>Flower</p>
            <p>Plant</p>
            <p>Sky</p>
            <p>Landscape</p>
            <p>Urban</p>
            <p>Butterfly</p>
            <p>Deer</p>
            <p>Heron</p>
            <p>Duck</p>
            <p>Goose</p>
            <p>Bird</p>
            <p>Insect</p>
            <p>Mushroom</p>
            <p>Vehicle</p>
            <p>Owl</p>
            <p>Squirrel</p>
            <p>Chipmunk</p>
            <p>Moon</p>
            <p>Frog</p>
            <p>Fish</p>
            <p>Snake</p>
            <p>People</p>
            <p>Family</p>
            <p>Sun</p>
            <p>Trailsign</p>
            <p>Scrap</p>
            <p>Tree</p>
            <p>Shell</p>
            <p>Dam</p>
            <p>Spring</p>
            <p>Summer</p>
            <p onClick={() => props.updateFunc(["Fall"])}>Fall</p>
            <p>Winter</p>
            <p>Sign</p>
            <p>Water</p>
            <p>Beach</p>
            <p>Trail</p>
        </div>
    )
}