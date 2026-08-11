import React, { useEffect, useState } from "react";



function App() {

  const [photoData, setData] = useState({})

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

      fetch("/image").then(
        (res) => res.json()
      ).then((data) => {
        setData(data)
      })


  }, [])

  return (
    <div>
      {/* { photoData == null ? <p>Loading...</p>  : <img src={photoData}></img> } */}
      <br></br>
{/*     <img height={500} width={500} src={ photoData ? process.env.PUBLIC_URL + "/" + photoData.Path + "/" + photoData.Name : "" }>
    
    </img> */}
    </div>
  );
}

export default App;
