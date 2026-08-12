

// Why does this give props.props?
export default function YearSlice (props) {
    return (
        <div>
           <p>{props ? props.props.Name : "Loading..."}</p>
        </div>
    )
}