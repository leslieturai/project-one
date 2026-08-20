import React, { act, useEffect, useState } from "react";
import YearSlice from "./components/YearSlice/YearSlice";



function App() {

  const [photoData, setData] = useState({})
  //const [activeURL, setURL] = useState([])

  const [activeIndex, setIndex] = useState()

/*   const handleURLUpdate = (newURL, newIndex) => {
    setURL([newURL, newIndex])
  } */

    const updateActiveImg = (newIndex) => {
      setIndex(newIndex)
    }


          const incrementState = () => {

        //console.log(photoData[2][activeURL[1] + 1].Id)
       //handleURLUpdate ("http://localhost:3000/image:" + photoData[2][activeURL[1] + 1].Id , activeURL[1] + 1)
        setIndex(activeIndex + 1)
      }

      const decrementState = () => {
        setIndex(activeIndex - 1)
      }


/*   useEffect(() => {
    fetch("/api").then(
      res => res.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, []) */

/*   useEffect(() => {
    fetch("/dashboard").then(
      res => res.json()
    ).then(
      data => {setData(data)}
      
    )
  }, []) */

  
  useEffect(() => {
   /*  fetch("/image").then(
      res => res.blob()
    ).then((blob) => {
      const url = URL.createObjectURL(blob)
      setData(url)
    }) */

      fetch("/dashboard").then(
        (res) => res.json()
      ).then((data) => {
        setData(data)
        
      })


  }, [])

    useEffect(() => {
      if (photoData == null || photoData[2] == undefined || photoData == {} || photoData[2][0].Id == undefined) {
        console.log("Nothing here")
        return
      } /* else if (activeURL[1] == undefined) {
        console.log("No elId here yet")
        return
      } */





      document.addEventListener("keydown", function (event) {
        if (event.key == "e") {
          incrementState()
        } 
        if (event.key == "q") {
          decrementState()
        }
      })
     
      
  }, [activeIndex])

/*   useEffect(() => {
    fetch("/image:2").then(
      res => res.blob()
    ).then((blob) => {
      const url = URL.createObjectURL(blob)
      setImage(url)
    })
  }, []) */

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
{/*       <p>
        {
          activeURL == [] ? "Loading..." :
          JSON.stringify(photoData[2][activeURL[1]].Id)
        }
      </p> */}
      {/* <img height={600} width={500} src={"http://localhost:3000/image:2"}></img> */}
      {
        photoData[0] !== undefined ? 
            (
              photoData[0].map((year, i) => {
                return (
                  <>
                    <h2 key={i}>{year}</h2>
                    {
                      photoData[2] !== undefined ? 
                        photoData[2].map((row, j) => {
                          if (row.Year == year) {
                            return <YearSlice key={j} props={row} 
                              updateFunction={updateActiveImg}
                              elIndex={j}
                              currIndex={activeIndex}
                            ></YearSlice>
                          } else {
                            return <></>
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
