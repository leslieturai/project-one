

// Why does this give props.props?
export default function YearSlice (props) {
    return (
        <div>
           <img loading="lazy" width={500} height={500} src={"http://localhost:3000/image:" + props.props.Id}></img>
        </div>
    )
}