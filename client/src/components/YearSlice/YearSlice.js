import { Link } from "react-router-dom";


// Why does this give props.props?
export default function YearSlice (props) {
    return (
        <Link to={"/fullscreen/:" + props.props.Id}>
            <img loading="lazy" width={200} height={200} src={"http://localhost:3000/image:" + props.props.Id}></img>
        </Link>
    )
}