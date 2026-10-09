/* Server Setup & Configuration */
const express = require("express")
const app = express()
const sqlite3 = require("sqlite3")
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use(express.text({
    type: "*/*",
    limit: "10mb"
}));

app.use(express.json({
    type: "*/*",
    limit: "10mb"
}))

app.use(express.static(path.join(__dirname, "Photos")))

// Variable for dashboard
var records = []

// Constructor for reading/writing
function Record (path, year, month, day, name, season, country, city, weather, tags) {
    this.path = path
    this.year = year,
    this.month = month,
    this.day = day,
    this.name = name,
    this.season = season,
    this.country = country,
    this.city = city,
    this.weather = weather
    this.tags = ""
}

// Return season for tags
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

/* Return commonly used formatted URL params */
function returnParamStr (strArg) {
    if (strArg === null || strArg === undefined) {
        return ""
    }
    return strArg.split(":")[1].split("=")[0]
}

// Get the date from the directory when creating DB records
/* Date is derived from organized paths like 2024/December/12 */
function extractDate (pathStr) {
    return [
        pathStr.split("\\")[1],
        pathStr.split("\\")[2],
        pathStr.split("\\")[3]
    ]
}

 /* Create Database */
const db = new sqlite3.Database("./Archive.db", (err) => {
    if (err) return console.log(err)
    console.log("Database created!")
})

 // Check if Archive.db exists first, returns to avoid constant writing upon refresh
if (fs.existsSync("./Archive.db")) {
    console.log("DB is present")
} else {
    fs.readdir("./Photos", {withFileTypes: true, recursive: true}, (err, files) => {
    // Read photos, create records with dirctories, constructor, and sqLite
    let tempFile = {}
    files.forEach((file) => {
        let tempDate = extractDate(file.parentPath)
        // Gloss over folders
        if (tempDate[0] == undefined || tempDate[1] == undefined || tempDate[2] == undefined) {
            return
        }
        
        tempFile = new Record(
            file.parentPath,
            tempDate[0],
            tempDate[1],
            tempDate[2],
            file.name,
            "Spring",
            "Netherlands",
            "",
            "",
            ""
        )

        tempFile.tags = returnSeason(tempFile.month)

        records.push(tempFile)
    })

    db.run(
        `CREATE TABLE IF NOT EXISTS Photos (
                Id INTEGER PRIMARY KEY AUTOINCREMENT,
                Path TEXT NOT NULL,
                Year TEXT NOT NULL,
                Month TEXT NOT NULL,
                Day TEXT NOT NULL,
                Name TEXT NOT NULL,
                Season TEXT,
                Country TEXT,
                City TEXT,
                Weather TEXT,
                Tags TEXT
            )`, (err) => {
            if (err) return console.log(err)
            console.log("Table create successfully!")
            /* Inserting Data */
            query = 
            `
                INSERT INTO Photos 
                (Path, Year, Month, Day, Name, Season, Country, City, Weather, Tags) 
                VALUES 
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `

            for (let i = 0; i < records.length; i++) {
                db.run(query, Object.values(records[i]), (err) => {
                if (err) return console.log(err)

                db.all(`SELECT * FROM Photos`, (err, rows) => {
                    if (err) return console.log(err)
                    })
                })
            }
        }
    )
}) 
}

/* Dashboard request */
app.get("/dashboard", (req, res) => {
    db.all(
    `SELECT DISTINCT YEAR FROM PHOTOS`,
    (err, years) => {
        let tempData = [[]]
        // Getting the most shallow elements
      if (err) return console.log(err)
        years.forEach((year) => tempData[0].push(year.Year))      
            let query = `SELECT * FROM PHOTOS WHERE YEAR BETWEEN ` + Math.min(...tempData[0])  + ` AND ` + Math.max(...tempData[0]) +
            ` GROUP BY Year, Month, Day` // Organized via SQL
            db.all(query, (err, months) => {
                if (err) return console.log(err)
                    tempData[tempData.length + 1] = months
                    res.json(tempData)
                    return
            })
        }
    )
})

/* General image request */
app.get("/image:id", (req, res) => {
    let row = db.all(`SELECT * FROM Photos WHERE Id = ` + req.params.id.split(":")[1], (err, rows) => {
        if (err) return console.log(err)
        res.sendFile(path.join((__dirname, "/WebDevProjects/project-one/server/" + rows[0].Path + "/" + rows[0].Name)), (err) => {
            if (err) return console.log(err)
        })
    })
})

/* Monthly view in a year */
app.get("/time:year", (req, res) => {
    console.log("Getting monthly view")
    let tempData = [[]]
    db.all(
        `SELECT DISTINCT Month FROM Photos WHERE Year = ` + returnParamStr(req.params.year), (err, months) => {
            if (err) return console.log(err)
            months.forEach (month => tempData[0].push(month.Month))
            db.all(
                `SELECT * FROM Photos WHERE Year = ` + returnParamStr(req.params.year), (err, days) => {
                    if (err) return console.log(err)
                    tempData[0].forEach((tempMonth, i) => {
                        tempData.push(
                            days.filter((e, i) => e.Month === tempMonth)
                        )
                    })
                    res.json(tempData)
                }
            )

        }
    )
})

/* Daily view of a month */
app.get("/test/:month/:year", (req, res) => {
    console.log("here at day!")
    console.log(req.params)
    let tempData = [[]]
    db.all(
        `SELECT DISTINCT Day FROM Photos WHERE Month = ` + JSON.stringify(returnParamStr(req.params.month)) + 
        ` AND Year = ` + JSON.stringify(returnParamStr(req.params.year)), 
        (err, days) => {
            if (err) return console.log(err)
            days.forEach (day => tempData[0].push(day.Day))
            db.all(
                `SELECT * FROM Photos WHERE Month = ` + JSON.stringify(returnParamStr(req.params.month)) + 
                ` AND Year = ` + JSON.stringify(returnParamStr(req.params.year)), 
                (err, rows) => {
                    if (err) return console.log(err)

                    tempData[0].forEach((tempDay, i) => {
                        tempData.push(
                            rows.filter((e , i) => e.Day === tempDay)
                        )
                    })
                    res.json(tempData)
                }
            )
        }
    )
})


/* POST request for updating image fields */
app.post("/set/img/:id/{:country}{/:season}{/:city}{/:weather}{/:date}{/:tags}", (req, res) => {
    console.log(req.params)
    let id = returnParamStr(req.params.id)
    let country = returnParamStr(req.params.country).split("+")[1] == undefined ? returnParamStr(req.params.country) : returnParamStr(req.params.country).split("+")[1] 
    let season = returnParamStr(req.params.season)
    let city = returnParamStr(req.params?.city) // Format to process no value
    let weather = returnParamStr(req.params.weather)
    
    let date = req.params.date.split(":")[1]

    let day = date.split("/")[0]
    let month = date.split("/")[1]
    let year = date.split("/")[2].split("=")[0]


    let queryWithoutCity = `UPDATE Photos SET ` +
    `SEASON = ` + JSON.stringify(season) +
    `COUNTRY = ` + JSON.stringify(country) +
    `WEATHER = ` + JSON.stringify(weather) +
    `DAY = ` + JSON.stringify(day) +
    `MONTH = ` + JSON.stringify(month) +
    `YEAR = ` + JSON.stringify(year)
    + `WHERE ID = ` + JSON.stringify(id)

    let queryWithCity = `UPDATE Photos SET ` +
    `Season = ` + JSON.stringify(season) + "," +
    `Country = ` + JSON.stringify(country) + "," +
    `City = ` + JSON.stringify(city) + "," +
    `Weather = ` + JSON.stringify(weather) + "," +
    `Day = ` + JSON.stringify(day) + "," +
    `Month = ` + JSON.stringify(month) + "," +
    `Year = ` + JSON.stringify(year) 
    + ` WHERE Id = ` + JSON.stringify(id)

    if (city.length == 0) {
        console.log("No city")
        console.log(
            id, country, season, city, weather,
            day, month, year
        )
        db.run(queryWithoutCity, (err) => {
        if (err) return console.log(err)
        
        res.send("Data set!")
    })
    } else {
        console.log("City present")
        db.run(queryWithCity, (err) => {
        if (err) return console.log(err)
        
        res.send("Data set!")
    })
    }
})

app.post("/upload/", async (req, res) => {
    const months = [
            "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"
        ]
    
    /* Get Month for Photo URL */
    let testDate = new Date(JSON.parse(req.body).Date.split("/")[2] + "-" + JSON.parse(req.body).Date.split("/")[1] + "-" + JSON.parse(req.body).Date.split("/")[0])
    let monthURL = months[testDate.getMonth()]
    /* Reversing submtitted date */
    let tempURL = "Photos/" + JSON.parse(req.body).Date.split("/")[2] + "/" + monthURL + "/" + JSON.parse(req.body).Date.split("/")[0]
    
    /* Check if path exists */
    if (fs.existsSync(tempURL)) {
        console.log("Exists, writing")
        const base64 = JSON.parse(req.body).Image
        const buffer = Buffer.from(base64, "base64")
        fs.writeFileSync(tempURL + "/" + "test.jpg", buffer)

        // DB Operations
        query = 
                `
                    INSERT INTO Photos 
                    (Path, Year, Month, Day, Name, Season, Country, City, Weather, Tags) 
                    VALUES 
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `
        
        let tempFile = new Record(
            tempURL, JSON.parse(req.body).Date.split("/")[2], months[testDate.getMonth()], JSON.parse(req.body).Date.split("/")[0],
            "test.jpg", JSON.parse(req.body).Season, JSON.parse(req.body).Country, JSON.parse(req.body)?.City, 
            JSON.parse(req.body).Weather, JSON.parse(req.body).Season
        )

        db.run(query, Object.values(tempFile), (err) => {
            if (err) return  console.log(err)
            console.log("Writing...")

            db.all(`SELECT * FROM PHOTOS WHERE NAME = "test.jpg"`, (err, rows) => {
                if (err) return console.log(err)
                console.log("Done!")
                console.log(rows[0])
            })
        })

    } else if (!fs.existsSync(tempURL)) {
        console.log("Doesn't exist, writing")
        fs.mkdirSync(tempURL)
        const base64 = JSON.parse(req.body).Image
        const buffer = Buffer.from(base64, "base64")
        fs.writeFileSync(tempURL + "test.jpg", buffer)
        
        // DB Operations
        query = 
                `
                    INSERT INTO Photos 
                    (Path, Year, Month, Day, Name, Season, Country, City, Weather, Tags) 
                    VALUES 
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `
        
        let tempFile = new Record(
            tempURL, JSON.parse(req.body).Date.split("/")[2], months[testDate.getMonth()], JSON.parse(req.body).Date.split("/")[0],
            "test.jpg", JSON.parse(req.body).Season, JSON.parse(req.body).Country, JSON.parse(req.body)?.City, 
            JSON.parse(req.body).Weather, JSON.parse(req.body).Season
        )

        db.run(query, Object.values(tempFile), (err) => {
            if (err) return  console.log(err)
            console.log("Writing...")

            db.all(`SELECT * FROM PHOTOS WHERE NAME = "test.jpg"`, (err, rows) => {
                if (err) return console.log(err)
                console.log("Done!")
                console.log(rows[0])
            })
        })
    }
})

app.listen(5000, () => {
    console.log("Server started on port 5000!")
})