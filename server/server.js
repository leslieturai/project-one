const express = require("express")
const app = express()

const sqlite3 = require("sqlite3")

const path = require('path')
const fs = require('fs')

app.use(express.static(path.join(__dirname, "Photos")))

var records = []

function Record (path, year, month, day, name, season, country, city, weather) {
    this.path = path
    this.year = year,
    this.month = month,
    this.day = day,
    this.name = name,
    this.season = season,
    this.country = country,
    this.city = city,
    this.weather = weather
}

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
    if (
        fs.existsSync("./Archive.db")
    ) {
        console.log("DB is present")
    } else {
        fs.readdir("./Photos", {withFileTypes: true, recursive: true}, (err, files) => {
        
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
                ""
            )
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
                    Weather TEXT
                )`, (err) => {
                if (err) return console.log(err)
                console.log("Table create successfully!")
                /* Inserting Data */
                query = 
                `
                    INSERT INTO Photos 
                    (Path, Year, Month, Day, Name, Season, Country, City, Weather) 
                    VALUES 
                    (?, ?, ?, ?, ?, ?, ?, ?, ?)
                `

                for (let i = 0; i < records.length; i++) {
                    db.run(query, Object.values(records[i]), (err) => {
                    if (err) return console.log(err)

                    db.all(`SELECT * FROM Photos`, (err, rows) => {
                        if (err) return console.log(err)
                        //console.log(rows)
                        })
                    })
                }
            }
        )
    }) 
}

app.get("/home", (req, res) => {
    let row = db.all(`SELECT * FROM Photos LIMIT 1`, (err, rows) => {
        if (err) return console.log(err)
            res.json(
                rows[0]
            )
        })
        console.log("Row: " + row)
})

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
            ` GROUP BY Year, Month, Day` 
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
        //console.log(rows[0])
        res.sendFile(path.join((__dirname, "/WebDevProjects/project-one/server/" + rows[0].Path + "/" + rows[0].Name)), (err) => {
            if (err) return console.log(err)
        })
    })
})

/* Monthly view in a year */
app.get("/time:year", (req, res) => {
    console.log("here at year")
    let tempData = [[]]
    //req.params.year.split(":")[1].split("=")[0]
    db.all(
        `SELECT DISTINCT Month FROM Photos WHERE Year = ` + req.params.year.split(":")[1].split("=")[0], (err, months) => {
            if (err) return console.log(err)
            //console.log(months)
            months.forEach (month => tempData[0].push(month.Month))
            //console.log(tempData)
            db.all(
                `SELECT * FROM Photos WHERE Year = ` + req.params.year.split(":")[1].split("=")[0], (err, days) => {
                    if (err) return console.log(err)
                    tempData[tempData.length + 1] = days
                    //console.log(tempData)
                    res.json(tempData)
                }
            )

        }
    )

})

/* Daily view of a monthy */
app.get("/month:day/:year", (req, res) => {
    console.log("here at day!")
    console.log(req.params)
    let tempData = [[]]
    db.all(
        `SELECT DISTINCT Day FROM Photos WHERE Month = ` + JSON.stringify(req.params.day.split(":")[1].split("=")[0]) + 
        ` AND Year = ` + JSON.stringify(req.params.year.split(":")[1]), 
        (err, days) => {
            if (err) return console.log(err)
            days.forEach (day => tempData[0].push(day.Day))

            db.all(
                `SELECT * FROM Photos WHERE Month = ` + JSON.stringify(req.params.day.split(":")[1].split("=")[0]) + 
                ` AND Year = ` + JSON.stringify(req.params.year.split(":")[1]), 
                (err, rows) => {
                    if (err) return console.log(err)
                    
                    tempData[tempData.length + 1] = rows
                    console.log("here, sending...")
                    res.json(tempData)
                }
            )
        }
    )



    
})




app.listen(5000, () => {
    console.log("Server started on port 5000!")
})