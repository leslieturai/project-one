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
/*             test = [
                    'Photos\\2026\\April\\29',
                    '2026',
                    'April',
                    '29',
                    'IMG_6150.JPG',
                    'Spring',
                    'Netherlands',
                    '',
                    ''
                ] */

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










app.get("/api", (req, res) => {
    res.json({"files": [
        {"2026": ["April", "May"]}
    ]})
})

app.get("/home", (req, res) => {

    let row = db.all(`SELECT * FROM Photos LIMIT 1`, (err, rows) => {
        if (err) return console.log(err)
        console.log(rows[0])
        res.json(
        
            rows[0]
        
    )
        })
        console.log("Row: " + row)

    
})

app.get("/image", (req, res) => {
        let row = db.all(`SELECT * FROM Photos LIMIT 1`, (err, rows) => {
        if (err) return console.log(err)
        console.log(rows[0])
        res.sendFile(path.join((__dirname, "/WebDevProjects/project-one/server/Photos/2026/April/29/" + rows[0].Name)), (err) => {
            if (err) return console.log(err)
        })
        })
})

app.listen(5000, () => {
    console.log("Server started on port 5000!")
})

