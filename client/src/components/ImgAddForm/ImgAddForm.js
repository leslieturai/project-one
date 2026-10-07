

export default function ImgAddForm () {

    const handleSubmit = (ev) => {
        ev.preventDefault()

        const form = ev.target
        const formData = new FormData(form)

        let tempDate = formData.get("Date")
        const Country = formData.get("Country")
        const City = formData.get("City")
        const Weather = formData.get("Weather")
        const Season = formData.get("Season")

        const Image = formData.get("Image")

        const months = [
            "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"
        ]

        const currentTime = new window.Date()

        console.log(tempDate.length)

        if (tempDate === null || tempDate === undefined || tempDate === "" || tempDate.length === 0) {
            alert("ERROR: DATE NOT PROVIDED")
            return
        }

        if (formData.get("Date").toString().length !== 0) {
            console.log("Checking date")
            tempDate.split("/").forEach((elem, i) => {
            if (i == 0) {
                if (Number(elem) <= 0 ||  Number(elem) > 31) {
                    alert("SUBMISSION ERROR: DAY INCORRECTLY FORMATTED")
                    return
                } 
            }
            if (i == 1) {
                if (elem < 1 || elem > 12) {
                    alert("SUBMISSION ERROR: MONTH INCORRECTLY FORMATTED")
                    return
                }
            }
            if (i == 2) {
                if (Number(elem.split("=")[0]) > currentTime.getFullYear() || Number(elem.split("=")[0]) < 1800 ) {
                    alert("SUBMISSION ERROR: YEAR INCORRECTLY FORMATTED")
                    return
                }
            }
        })
        }

        console.log("Date okay")
        const Date = tempDate

        function convertToBase64 (file, callback) {
            const reader = new FileReader()

            reader.readAsDataURL(file)

            reader.addEventListener("load", () => {
                const result = reader.result
                const resultStr = result
                const base64String =  resultStr.slice(resultStr.indexOf(',')+1);

                callback(base64String)
            })
        }
            
        convertToBase64(Image, (str) => {
            fetch("/upload/", {
            method: "POST",
            headers: {
                "Accept":"application/json", 
                "Content-Type":"application/json"
            },
            body: JSON.stringify(
                {
                    Date: Date,
                    Country: Country,
                    City: City,
                    Weather: Weather,
                    Season: Season,
                    Image: str
                }
            )
        }).then((res) => {
            res.json()
        }).then((data) => {
            console.log(data)
        })
        })

            
        
        
    }

    return (
        <form id="img-add-form" onSubmit={handleSubmit}
        encType="multipart/form-data">
            <input  name="Date" placeholder="Date (DD/MM/YYYY)" type="text"/>
            <input name="Country" placeholder="Country" type="text"/>
            <input name="City" placeholder="City" type="text"/>
            <input name="Weather" placeholder="Weather" type="text"/>
            <input  name="Season" placeholder="Season" type="text"/>
            <input  name="Image" placeholder="Select image" type="file"/>
            <button type="submit">Submit</button>
        </form>
    )
}