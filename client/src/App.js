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
    if (filters && filters.length >= 1) {
            console.log("Already here")
            setFilters([...filters, ...filterArg])
    } else {
      setFilters(filterArg)
    }
    
  }
  
  useEffect(() => {
        fetch("/dashboard").then(
          (res) => res.json()
        ).then((data) => {
          //setData(data)
          let tempData = []
          tempData[0] = data[0]

          data[0].forEach((timeFrame, i) => {
            tempData.push(
              data[2].filter((row) => row.Year == timeFrame)
            )
          })

          //console.log(tempData)

          setData(tempData)
        })
      
  }, [])

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

      </header>



      {timeDepth === 1 ? <h2 onClick={() => {
         setDepth(0)
          let fullURL = "/dashboard"
          fetch(fullURL).then(
            (res) => res.json()
          ).then((data) => {
            setData(data)
          })
      }}
      
      >{photoData[2][0].Year}</h2> : <></>}
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
        
        >{photoData[2][0].Year + " > " + photoData[2][0].Month}</h2> : <></>}
      

        
{/*           {
            activeIndex !== null ? (
              <>
            
             <div className="fullscreen-nav-arrows inactive">
                <p className="left-arrow inactive"
                  onClick={(e) => {decrementIndex()}}
                >&#10094;</p>
                <p className="right-arrow inactive"
                  onClick={() => incrementIndex()}
                >&#10095;</p>

            </div> 
           
            
            <div className="img-info-div inactive">
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
            ) :
            <></>
          } */}
        )
      
      {/* Main render for gallery  */}
      {
        filters !== null && filters !== undefined && filters !== undefined ? 
        <p className="filter-text">Results for: {filters[0]}</p>
        : 
        <></>
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
        photoData !== null && photoData !== undefined && Array.isArray(photoData) ? (
          photoData.slice(1, photoData.length).map((data, i) => {
              if (filters) {
                
                //console.log(data.filter(r => filters.includes(r.Tags)))
                return (
                  <YearSlice key={i} row={data.filter(r => filters.includes(r.Tags))}/>
                )
              } else {
                return (
                  <>
                    
                    <YearSlice key={i} row={data}/>
                  </>
                )
              }
          })
        ) : (<p>Loading...</p>)
      }
      

    </div>
  );
}

export default App;
