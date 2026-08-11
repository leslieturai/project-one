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
        // Create blobs - I should try just sending the HTML here directly because it already has the path. Also saves the client processing time.
        data[3].forEach(element => {
          element.Path = URL.createObjectURL(new Blob([element.Path]))
        });
        setData(data)
      })


  }, [])

  return (
    <div>
      { photoData == null ? <p>Loading...</p> : <p>{JSON.stringify(photoData)}</p>  }
      <br></br>
      
    </div>
  );
}

export default App;
