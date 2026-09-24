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
      if (filters === null) {
        console.log("first")
        setFilters([String(filterArg)])
      } else if (filters.length >= 1) {
        console.log("second")
        if (filters.includes(String(filterArg))) {
          if (filters.length === 1) {
            setFilters(null)
            return
          } else {
            console.log("already here!")
            setFilters(
              filters.filter(f => f !== String(filterArg))
            )
            return
          }
        }
        setFilters([...filters, String(filterArg)])
      }
  }

  const handleDataUpdate = (dataArg) => {
    setData(dataArg)
  }

  const handleDepth = (depthArg) => {
    setDepth(depthArg)
  }

  useEffect(() => {
        if (timeDepth === 0) {
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
        } 
  }, [timeDepth])
  

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
                  <YearSlice key={i} row={data.filter(r => filters.includes(r.Tags))} depth={timeDepth}
                      updateDepth={handleDepth}
                      updateFunc={handleDataUpdate}/>
                )
              } else {
                return (
                  <>
                    
                    <YearSlice 
                      key={i} 
                      row={data}
                      depth={timeDepth}
                      updateDepth={handleDepth}
                      updateFunc={handleDataUpdate}
                      />
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
