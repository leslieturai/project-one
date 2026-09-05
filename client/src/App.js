import React, { useEffect, useState } from "react";
import YearSlice from "./components/YearSlice/YearSlice";
import TagList from "./components/TagList/TagList";
import Settings from "./components/Settings/Settings";
import Utilities from "./components/Utilities/Utilities";

function App() {

  const [photoData, setData] = useState({})

  const [activeIndex, setIndex] = useState(null)

  const [menuOpen, setMenu] = useState(null)

  const [timeDepth, setDepth] = useState(0)

  const [filters, setFilters] = useState(null)

  const updateActiveImg = (newIndex) => {
    setIndex(newIndex)
  }

  const incrementState = () => {
    setIndex(activeIndex + 1)
  }

  const decrementState = () => {
    setIndex(activeIndex - 1)
  }

  const handleFilterUpdate = (filterArg) => {
    setFilters(...[filterArg])
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
      {/* Header */}
      <header>
          <h1>Archive</h1>
          <p className="header-lesser-text" onClick={() => {
            if (menuOpen === 1) {
              setMenu(0)
              return
            }
            setMenu(1)
          }}>Tag list</p>
          <p className="header-lesser-text" onClick={() => {
            if (menuOpen === 2) {
              setMenu(0)
              return
            }
            setMenu(2)
          }}>Settings</p>
          <p className="header-lesser-text" onClick={() => {
            if (menuOpen === 3) {
              setMenu(0)
              return
            }
            setMenu(3)
          }}>Utilities</p>
          <div>
              {/* <input type="text" placeholder="Query with tags..."/> */}
              <div className="tag-div-group">
                  <p>Tags here</p>
              </div>
          </div>
      </header>



      {timeDepth === 1 ? <h2 onClick={() => {
         setDepth(0)
          let fullURL = "/dashboard"
          fetch(fullURL).then(
            (res) => res.json()
          ).then((data) => {
            setData(data)
          })
      }}>{photoData[2][0].Year}</h2> : ""}
      {timeDepth === 2 ? <h2 onClick={() => {
          setDepth(1)
          let queryString = new URLSearchParams(photoData[2][0].Year).toString()
          let fullURL = "/time:" + queryString
          fetch(fullURL).then(
            (res) => res.json()
          ).then((data) => {
            setData(data)
          })
        }}>{photoData[2][0].Year + " > " + photoData[2][0].Month}</h2> : ""}
      {
        activeIndex == null ? (
          ""
        ) :
        (
          <>
            {/* Fullscreen Arrow Navigation Elements */}
            <div className="fullscreen-nav-arrows">
                <p className="left-arrow"
                  onClick={(e) => {decrementState()}}
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
        filters !== null && filters !== undefined && filters !== undefined ? 
        <p className="filter-text">Results for: {filters[0]}</p>
        : 
        ""
      }
      {
        menuOpen === 1 ? (
          <TagList updateFunc={handleFilterUpdate}/>
        ) :
        (
          <></>
        )
      }

            {
        menuOpen === 2 ? (
          <Settings/>
        ) :
        (
          <></>
        )
      }

            {
        menuOpen === 3 ? (
          <Utilities/>
        ) :
        (
          <></>
        )
      }
      

      {
        photoData[0] !== undefined ? 
        
            ( 
              photoData[0].map((timeFrame, i) => {

                
                return (
                  
                  
                  <>


                  
                                          
                    {
                        filters === null || timeDepth < 1 ? (<h2 className="time-heading" key={i}
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
                      >{timeFrame}</h2>) : "" 
                      }


                      {
                        timeDepth === 1 && filters !== null ? <h2 className="time-heading" key={i}
                      onClick={(event) => {
                        setDepth(timeDepth + 1)
                        let queryString = new URLSearchParams(timeFrame).toString()
                        let fullURL = "/month:" + queryString + "/:" + photoData[2][0].Year
                        fetch(fullURL).then(
                          (res) => res.json()
                        ).then((data) => {
                          setData(data)
                        })
                      }}
                    >{timeFrame}</h2> : ""
                      }
                    

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
                              if (filters !== null) {
                                if (
                                  [row.Tags].some(r => filters.includes(r))
                                ) {
                                return <YearSlice key={j} props={row} 
                                updateFunction={updateActiveImg}
                                elIndex={j}
                                currIndex={activeIndex}
                              ></YearSlice>
                                } else {
                                  return <></>
                                }
                              } else {
                                return <YearSlice key={j} props={row} 
                                updateFunction={updateActiveImg}
                                elIndex={j}
                                currIndex={activeIndex}
                              ></YearSlice>
                              }
                            } else {
                              return <></>
                            }
                          }

                          if (timeDepth === 2) {
                            if (row.Day == timeFrame) {
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
