

/* DB Operations */

/*
    Function to extract params like this: JSON.stringify(req.params.month.split(":")[1].split("=")[0])
    and (optionally) use them in queries

    Store ALL queries to avoid repetition of long strings in file
        let queryWithoutCity = `UPDATE Photos SET ` +
    `SEASON = ` + JSON.stringify(season) +
    `COUNTRY = ` + JSON.stringify(country) +
    `WEATHER = ` + JSON.stringify(weather) +
    `DAY = ` + JSON.stringify(day) +
    `MONTH = ` + JSON.stringify(month) +
    `YEAR = ` + JSON.stringify(year)
    + `WHERE ID = ` + JSON.stringify(id)
    (This is also repetetive)

    Include this here because it's used a few times
    const months = [
            "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"
        ]

    function returnSeason (monthArg) {
    let spring = ["March", "April", "May"]
    let summer = ["June", "July", "August"]
    let fall = ["September", "October", "November"]
    let winter = ["December", "January", "February"]

    if (spring.includes(monthArg)) return "Spring"
    if (summer.includes(monthArg)) return "Summer"
    if (fall.includes(monthArg)) return "Fall"
    if (winter.includes(monthArg)) return "Winter"
}

    function extractDate (pathStr) {
        return [
            pathStr.split("\\")[1],
            pathStr.split("\\")[2],
            pathStr.split("\\")[3]
        ]
    }

    This from imgAddform.js and yearSlice.js
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

    Maybe make another function that contains the two variants of this
         if (formData.get("Date").toString().length !== 0) { (from imgAddForm.js)

    Can our fetch calls be placed here and simplified?

    

*/

export function returnSeason (monthArg) {
    let spring = ["March", "April", "May"]
    let summer = ["June", "July", "August"]
    let fall = ["September", "October", "November"]
    let winter = ["December", "January", "February"]

    if (spring.includes(monthArg)) return "Spring"
    if (summer.includes(monthArg)) return "Summer"
    if (fall.includes(monthArg)) return "Fall"
    if (winter.includes(monthArg)) return "Winter"
}