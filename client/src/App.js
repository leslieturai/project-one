import React, { useEffect, useState } from "react";
import YearSlice from "./components/YearSlice/YearSlice";

function App() {

  const [photoData, setData] = useState({})

  const [activeIndex, setIndex] = useState(null)

  const [timeDepth, setDepth] = useState(0)

  const updateActiveImg = (newIndex) => {
    setIndex(newIndex)
  }

  const incrementState = () => {
    setIndex(activeIndex + 1)
  }

  const decrementState = () => {
    setIndex(activeIndex - 1)
  }


  
  useEffect(() => {
        fetch("/dashboard").then(
          (res) => res.json()
        ).then((data) => {
          setData(data)
        })
      
    
  }, [])

  useEffect(() => {
    if (photoData === null || photoData[2] === undefined || photoData == {} || photoData[2][0].Id === undefined) {
      console.log("Nothing here")
      return
    }

  document.addEventListener("keydown", function (event) {
    if (event.key === "e") {
      incrementState()
    } 
    if (event.key === "q") {
      decrementState()
    } 
    if (event.key == "Escape") {
      setIndex(null)
    }
  })
}, [activeIndex])
  return (
    <div>
      {
        activeIndex == null ? (
          ""
        ) :
        (
          <>
            {/* Fullscreen Arrow Navigation Elements */}
            <div className="fullscreen-nav-arrows">
                <p className="left-arrow"
                  onClick={() => decrementState()}
                >&#10094;</p>
                <p className="right-arrow"
                  onClick={() => incrementState()}
                >&#10095;</p>

            </div>
            {/* Photo Information Elements */}
            <div className="img-info-div">
              <p>
                {photoData[2][activeIndex].City ? photoData[2][activeIndex].City : "N/A" }, {photoData[2][activeIndex].Country}
              </p>
              <p>
                {photoData[2][activeIndex].Day ? photoData[2][activeIndex].Day : "N/A"}/
                {photoData[2][activeIndex].Month ? photoData[2][activeIndex].Month : "N/A"}/
                {photoData[2][activeIndex].Year ? photoData[2][activeIndex].Year : "N/A"}
              </p>
              <p>
                {photoData[2][activeIndex].Name ? photoData[2][activeIndex].Name : "N/A"}
              </p>
              <p>
                {photoData[2][activeIndex].Season ? photoData[2][activeIndex].Season : "N/A"}
              </p>
              <p>
                {photoData[2][activeIndex].Path? photoData[2][activeIndex].Path : "N/A"}
              </p>
            </div>
          </>
        )
      }
      {/* Main render for gallery  */}
      {
        photoData[0] !== undefined ? 
            (
              photoData[0].map((timeFrame, i) => {
                return (
                  <>
                    <h2 key={i}
                      onClick={(event) => {
                        setDepth(timeDepth + 1)
                        let queryString = new URLSearchParams(timeFrame).toString()
                        let fullURL = "/time:" + queryString
                        fetch(fullURL).then(
                          (res) => res.json()
                        ).then((data) => {
                          setData(data)
                        })
                      }}
                    >{timeFrame}</h2>
                    {
                      photoData[2] !== undefined ? 
                        photoData[2].map((row, j) => {
                          if (timeDepth === 0) {
                            if (row.Year == timeFrame) {
                              return <YearSlice key={j} props={row} 
                                updateFunction={updateActiveImg}
                                elIndex={j}
                                currIndex={activeIndex}
                              ></YearSlice>
                            } else {
                              return <></>
                            }
                          }

                          if (timeDepth === 1) {
                            if (row.Month == timeFrame) {
                              return <YearSlice key={j} props={row} 
                                updateFunction={updateActiveImg}
                                elIndex={j}
                                currIndex={activeIndex}
                              ></YearSlice>
                            } else {
                              return <></>
                            }
                          }

                          
                        })
                      : <p>Loading...</p>
                    }
                  </>
                )
              })
            )
            
        : <p>Loading...</p>
      }
    </div>
  );
}

export default App;
