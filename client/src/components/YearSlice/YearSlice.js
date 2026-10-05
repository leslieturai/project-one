import { useEffect, useState } from "react"

export default function YearSlice (row) {
    const [rowData, setRow] = useState(row)

    const [rangeLimit, setLimit] = useState(10)

    const [activeIndex, setIndex] = useState(null)

    const [changedBool, setBool] = useState(false)

    const handleLimit = () => {
        setLimit (rangeLimit + 10)
    }

    const handleClassChange = (ev) => {
        if (ev.target.className == "fullscreen") {
            ev.target.className = "img-preview"
            setIndex(null)
            //props.updateFunc(null)
        } else {
            ev.target.className = "fullscreen"
        }
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        const form = ev.target
        const formData = new FormData(form)

        const Id = new URLSearchParams(rowData.row[activeIndex].Id).toString()
        const Country = formData.get("Country").toString().length == 0 ? new URLSearchParams(rowData.row[activeIndex].Country) : new URLSearchParams(formData.get("Country")).toString()
        const Season = formData.get("Season").toString().length == 0 ? new URLSearchParams(rowData.row[activeIndex].Season) : new URLSearchParams(formData.get("Season")).toString()
        const Date = formData.get("Date").toString().length == 0 ? new URLSearchParams(rowData.row[activeIndex].Day + "/" + rowData.row[activeIndex].Month + "/" + rowData.row[activeIndex].Year) : new URLSearchParams(formData.get("Date")).toString()

        const months = [
            "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"
        ]

        console.log(
            Id, Country, Season, Date
        )
        
        /* Date Field Validation */
        const currentTime = new window.Date()

        Date.split("%2F").forEach((elem, i) => {
            if (i == 0) {
                if (Number(elem) <= 0 ||  Number(elem) > 31) {
                    alert("SUBMISSION ERROR: DAY INCORRECTLY FORMATTED")
                    return
                } 
            }
            if (i == 1) {
                if (!months.includes(elem)) {
                    alert("SUBMISSION ERROR: MONTH INCORRECTLY FORMATTED")
                    return
                }
            }
            if (i == 2) {
                if (Number(elem.split("=")[0]) > currentTime.getFullYear() || Number(elem.split("=")[0]) < 1800 ) {
                    alert("SUBMISSION ERROR: YEAR INCORRECTLY FORMATTED")
                    return
                }
            }
        })

        console.log("date okay")

        // Add City
        // Format URL on backend
        // Send

        


        //console.log(Id, Country)
        
        /* fetch("/set/img/:" + Id + "/:" + Country, {
            method: "POST"
        }).then((res) => {
            res.json()
        }).then((data) => {
            console.log(data)
        }) */
    }

    useEffect(() => {
        setRow(row)
        //console.log(row)
    }, [row])


    if (row.depth === 0) {
        return (
    <>
        {
            activeIndex !== null ? (
                <form className="info-form" onSubmit={handleSubmit}>
                    <p>{rowData.row[activeIndex] ? rowData.row[activeIndex].Name : "N/A"}</p>
                    <input name="Date" onChange={() => setBool(true)} placeholder={rowData.row[activeIndex] ? rowData.row[activeIndex].Day + "/" + rowData.row[activeIndex].Month + "/" + rowData.row[activeIndex].Year : "N/A"}></input>
                    <input name="Country" onChange={() => setBool(true)}  placeholder={rowData.row[activeIndex] ? rowData.row[activeIndex]?.City + rowData.row[activeIndex]?.Country : "N/A" }></input>
                    {/* <p>{rowData.row[activeIndex] ? rowData.row[activeIndex]?.Weather : "N/A"}</p> */}
                    <input name="Season" onChange={() => setBool(true)} placeholder={rowData.row[activeIndex] ? rowData.row[activeIndex].Season : "N/A"}></input>
                    <input name="Id" disabled={true} placeholder={rowData.row[activeIndex] ? "Id: #" + rowData.row[activeIndex].Id : "N/A"}></input>
                    <p>{rowData.row[activeIndex] ? "Tags: " + rowData.row[activeIndex].Tags.toString() : "N/A"}</p>
                    <button disabled={!changedBool} type="submit">Submit Changes</button>
                </form>
            ) : (<></>)
        }

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
                                <img loading="lazy" width={200} height={200} src={"http://localhost:3000/image:" + imgRow.Id} className="img-preview"
                                    onClick={(e) => {
                                        handleClassChange(e)
                                        setIndex(i)
                                    }}
                                ></img>
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
                            <img loading="lazy" width={200} height={200} src={"http://localhost:3000/image:" + imgRow.Id} className="img-preview" onClick={(e) => {
                                setIndex(i)
                                handleClassChange(e)}}></img>
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
    } else {
        console.log(rowData)
        return (
            <h2>error</h2>
        )
    }

    
}


      