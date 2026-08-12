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
        photoData[3] !== undefined ? 
          photoData[3].map(
            (row, i) => <YearSlice key={i} props={photoData[3][i]}></YearSlice>
          )
        
        : <p>Loading...</p>
      }
    </div>
  );
}

export default App;
