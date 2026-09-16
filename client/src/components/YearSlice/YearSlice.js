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

    return (
    <>
        {
        rowData.row !== null && rowData.row !== undefined && rowData.row.length !== 0 ? (
            <h2>{rowData.row[0].Year}</h2>
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
                        <img loading="lazy" width={200} height={200} src={"http://localhost:3000/image:" + imgRow.Id}
                            className="img-preview"
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
                   <img loading="lazy" width={200} height={200} src={"http://localhost:3000/image:" + imgRow.Id}
                   className="img-preview"
                   ></img>
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


      