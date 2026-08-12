import React, { useEffect, useState } from "react";
import YearSlice from "./components/YearSlice/YearSlice";



function App() {

  const [photoData, setData] = useState({})
  const [testImage, setImage] = useState()

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
      {/* <img height={600} width={500} src={"http://localhost:3000/image:2"}></img> */}
      {
        photoData[0] !== undefined ? 
            (
              photoData[0].map((year, i) => {
                return (
                  <>
                    <p key={i}>{year}</p>
                    {
                      photoData[2] !== undefined ? 
                        photoData[2].map((row, j) => {
                          if (row.Year == year) {
                            return <YearSlice key={j} props={row}></YearSlice>
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
