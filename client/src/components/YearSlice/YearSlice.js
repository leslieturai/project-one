import { useEffect, useRef, useState } from "react"

export default function YearSlice (row) {
    const [rowData, setRow] = useState(row)

    const [rangeLimit, setLimit] = useState(10)

    const handleLimit = () => {
        setLimit (rangeLimit + 10)
    }

    useEffect(() => {
        setRow(row)
        //console.log(row)
    }, [row])


    if (row.depth === 0) {
        return (
    <>
        { 
            rowData.row !== null && rowData.row !== undefined && rowData.row.length !== 0 ? (
                <h2
                    onClick={() => {
                        row.updateDepth(1)                
                        let queryString = new URLSearchParams(rowData.row[0].Year.toString())
                        let fullURL = "/time:" + queryString
                        fetch(fullURL).then(
                            (res) => res.json()
                        ).then((data) => {
                            row.updateFunc(data)
                        })
                    }}
                >{ rowData.row[0].Year }</h2>
            ) : (
                <p>Loading...</p>
            )
        }
        
       <section className="img-section">
        {
            rowData.row !== null && rowData.row !== undefined ? (
                rowData.row.slice(0, rangeLimit).map((imgRow, i) => {
                    if (i === Number(rowData.row.slice(0, rangeLimit).length - 1)) {
                        return (
                            <>
                                <img loading="lazy" width={200} height={200} src={"http://localhost:3000/image:" + imgRow.Id} className="img-preview"></img>
                                {
                                    rowData.row !== null && rowData.row !== undefined && rowData.row.length !== 0 && rowData.row.length - rangeLimit > 0 ? (
                                        <button className="add-img-btn" onClick={() => handleLimit()}>
                                            {"Show more - " + Number(rowData.row.length - rangeLimit) +  " remaining"}
                                        </button>
                                    ) : (
                                        <></>
                                    )
                                }      
                            </>
                    )
                } else {
                     return (
                        <>
                            <img loading="lazy" width={200} height={200} src={"http://localhost:3000/image:" + imgRow.Id} className="img-preview"></img>
                        </>
                    )
                }
                })
                ) : (<p>{JSON.stringify(row)}</p>)
            }
        </section>
    </>
    )
    } else if (row.depth === 1) {
        return (
    <>
        { 
            rowData.row !== null && rowData.row !== undefined && rowData.row.length !== 0 ? (
                <h2
                    onClick={() => {
                        row.updateDepth(2)
                        ///test/:month/:year"                
                        let monthString = new URLSearchParams(rowData.row[0].Month.toString())
                        let yearString = new URLSearchParams(rowData.row[0].Year.toString())
                        let fullURL = "/test/:" + monthString + "/:" + yearString
                        fetch(fullURL).then(
                            (res) => res.json()
                        ).then((data) => {
                            row.updateFunc(data)
                        })
                    }}
                >{ rowData.row[0].Month }</h2>
            ) : (
                <p>Loading...</p>
            )
        }
        
       <section className="img-section">
        {
            rowData.row !== null && rowData.row !== undefined ? (
                rowData.row.slice(0, rangeLimit).map((imgRow, i) => {
                    if (i === Number(rowData.row.slice(0, rangeLimit).length - 1)) {
                        return (
                            <>
                                <img loading="lazy" width={200} height={200} src={"http://localhost:3000/image:" + imgRow.Id} className="img-preview"></img>
                                {
                                    rowData.row !== null && rowData.row !== undefined && rowData.row.length !== 0 && rowData.row.length - rangeLimit > 0 ? (
                                        <button className="add-img-btn" onClick={() => handleLimit()}>
                                            {"Show more - " + Number(rowData.row.length - rangeLimit) +  " remaining"}
                                        </button>
                                    ) : (
                                        <></>
                                    )
                                }      
                            </>
                    )
                } else {
                     return (
                        <>
                            <img loading="lazy" width={200} height={200} src={"http://localhost:3000/image:" + imgRow.Id} className="img-preview"></img>
                        </>
                    )
                }
                })
                ) : (<p>{JSON.stringify(row)}</p>)
            }
        </section>
    </>
    )
    } else if (row.depth === 2) {
                return (
    <>
        { 
            rowData.row !== null && rowData.row !== undefined && rowData.row.length !== 0 ? (
                <h2
                    onClick={() => {
                        row.updateDepth(1)
                        ///test/:month/:year"                
                        let monthString = new URLSearchParams(rowData.row[0].Month.toString())
                        let yearString = new URLSearchParams(rowData.row[0].Year.toString())
                        let fullURL = "/test/:" + monthString + "/:" + yearString
                        fetch(fullURL).then(
                            (res) => res.json()
                        ).then((data) => {
                            row.updateFunc(data)
                        })
                    }}
                >{ rowData.row[0].Day }</h2>
            ) : (
                <p>Loading...</p>
            )
        }
        
       <section className="img-section">
        {
            rowData.row !== null && rowData.row !== undefined ? (
                rowData.row.slice(0, rangeLimit).map((imgRow, i) => {
                    if (i === Number(rowData.row.slice(0, rangeLimit).length - 1)) {
                        return (
                            <>
                                <img loading="lazy" width={200} height={200} src={"http://localhost:3000/image:" + imgRow.Id} className="img-preview"></img>
                                {
                                    rowData.row !== null && rowData.row !== undefined && rowData.row.length !== 0 && rowData.row.length - rangeLimit > 0 ? (
                                        <button className="add-img-btn" onClick={() => handleLimit()}>
                                            {"Show more - " + Number(rowData.row.length - rangeLimit) +  " remaining"}
                                        </button>
                                    ) : (
                                        <></>
                                    )
                                }      
                            </>
                    )
                } else {
                     return (
                        <>
                            <img loading="lazy" width={200} height={200} src={"http://localhost:3000/image:" + imgRow.Id} className="img-preview"></img>
                        </>
                    )
                }
                })
                ) : (<p>{JSON.stringify(row)}</p>)
            }
        </section>
    </>
    )
    }

    
}


      