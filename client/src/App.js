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
    fetch("/home").then(
      res => res.json()
    ).then(
      data => {setData(data)}
      
    )
  }, [])

  return (
    <div>
      { photoData ?  JSON.stringify(photoData) : <p>Loading...</p> }
      <br></br>
      { photoData ?  JSON.stringify(photoData.Path) : <p>Loading...</p> }
    <img height={500} width={500} src={ photoData ? process.env.PUBLIC_URL + "/" + photoData.Path + "/" + photoData.Name : "" }>
    
    </img>
    </div>
  );
}

export default App;
