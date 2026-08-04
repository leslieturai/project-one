

// Why does this give props.props?
export default function YearSlice (props) {
    
    return (
        <div>
            <p>{props ? props.props.years : "Loading..."}</p>
            <p>{props ? props.props.months : "Loading..."}</p>
            <p>{props ? props.props.days : "Loading..."}</p>
        </div>
    )
}