import React, { useEffect, useState } from "react";
import YearSlice from "./components/YearSlice/YearSlice";
import TagList from "./components/TagList/TagList";
import Settings from "./components/Settings/Settings";
import Utilities from "./components/Utilities/Utilities";

function App() {

  const [photoData, setData] = useState({})


  const [menuOpen, setMenu] = useState(null)

  const [timeDepth, setDepth] = useState(0)

  const [filters, setFilters] = useState(null)


  const handleFilterUpdate = (filterArg) => {
    if (filters !== null) {
          if (filters.includes(filterArg)) {
            console.log("Already here")
          }
    }
    setFilters(...[filterArg])
  }




  
  useEffect(() => {
        fetch("/dashboard").then(
          (res) => res.json()
        ).then((data) => {
          setData(data)
        
        })
      
    
  }, [])

/*   useEffect(() => {
      if (photoData[2] !== null && photoData[2] !== undefined) {
            console.log(
              photoData[2].filter((r) => r.Year == "2023").slice(
                0, 
                rangeLimit > 10 ? rangeLimit : 10)
            )
          }
  }, [photoData]) */

/*   useEffect(() => {
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
}, []) */




  return (
    <div>
      {/* Header */}
      <header>
          <h1 >Archive</h1>
          <p className="header-lesser-text" onClick={() => {
            if (menuOpen === 1) {
              setMenu(0)
              return
            }
            setMenu(1)
          }} >Tag list</p>
          <p className="header-lesser-text" onClick={() => {
            if (menuOpen === 2) {
              setMenu(0)
              return
            }
            setMenu(2)
          }}
          
          >Settings</p>
          <p className="header-lesser-text" onClick={() => {
            if (menuOpen === 3) {
              setMenu(0)
              return
            }
            setMenu(3)
          }}
          
          >Utilities</p>
          <div>
              {/* <input type="text" placeholder="Query with tags..."/> */}
              <div className="tag-div-group">
                  <p>Tags here</p>
              </div>
          </div>
      </header>



{/*       {timeDepth === 1 ? <h2 onClick={() => {
         setDepth(0)
          let fullURL = "/dashboard"
          fetch(fullURL).then(
            (res) => res.json()
          ).then((data) => {
            setData(data)
          })
      }}
      style={activeIndex === null ? null : {pointerEvents: "none"}}
      >{photoData[2][0].Year}</h2> : ""}
      {timeDepth === 2 ? <h2 onClick={() => {
          setDepth(1)
          let queryString = new URLSearchParams(photoData[2][0].Year).toString()
          let fullURL = "/time:" + queryString
          fetch(fullURL).then(
            (res) => res.json()
          ).then((data) => {
            setData(data)
          })
        }}
        style={activeIndex === null ? null : {pointerEvents: "none"}}
        >{photoData[2][0].Year + " > " + photoData[2][0].Month}</h2> : ""} */}
      

        
          <>
            {/* Fullscreen Arrow Navigation Elements */}
{/*             <div className="fullscreen-nav-arrows inactive">
                <p className="left-arrow inactive"
                  onClick={(e) => {decrementState()}}
                >&#10094;</p>
                <p className="right-arrow inactive"
                  onClick={() => incrementState()}
                >&#10095;</p>

            </div> */}
            {/* Photo Information Elements */}
            
{/*             <div className="img-info-div inactive">
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
            </div> */}
          </>
        )
      
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
      
      {/* 
        OPTION 1:
        Render first 10 of each timeFrame
        Render the button at the end
          If clicked, set next 10 of matching data to have a visible class
            If there are fewer than 10 left, show that in the button's text
        If there are none left, do not render the button

        OPTION 2:
        Render first 10 of each timeFrame
          By breaking render loop via a frameLimit state variable
        Render button at the end
        If clicked, increment limit by 10
          If there are fewer than 10 left, show that in the button's text
          If there are none left, do not render the button

      
      */}
      

      {
        photoData[0] !== undefined ? 
        
            ( 
              photoData[0].map((timeFrame, i) => {
                if (timeDepth === 0) {
                  
                  return (
                    <YearSlice timeFrame={timeFrame}
                      rows={
                        photoData[2].filter((r) => r.Year === timeFrame)
                      }
                     />
                  ) 
                }
              })
            )
            
        : <p>Loading...</p>
      }
    </div>
  );
}

export default App;
