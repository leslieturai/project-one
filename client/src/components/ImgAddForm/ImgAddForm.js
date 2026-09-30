

export default function ImgAddForm () {

    const handleSubmit = (ev) => {
        ev.preventDefault()

         const form = ev.target
        const formData = new FormData(form)

        const Image = formData.get("Image")


        /* fetch("/set/img/:" + Id + "/:" + Country, {
            method: "POST"
        }).then((res) => {
            res.json()
        }).then((data) => {
            console.log(data)
        }) */

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

            
            
           /*  convertToBase64(Image, (str) => {
                console.log(str)
            }) */
            
        
            convertToBase64(Image, (str) => {
                fetch("/upload/", {
                method: "POST",
                body: str
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
            <input placeholder="Date (DD/MM/YYYY)" type="text"/>
            <input placeholder="Country" type="text"/>
            <input placeholder="City" type="text"/>
            <input placeholder="Weather" type="text"/>
            <input placeholder="Season" type="text"/>
            <input name="Image" placeholder="Select image" type="file"/>
            <button type="submit">Submit</button>
        </form>
    )
}