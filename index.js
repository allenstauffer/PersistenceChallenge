

const express = require('express')

const app = express()

const db = require('./db.js');

const PORT = 8080

app.use(express.json())

app.get('/students/', (req, res) => {
    if(req.query.search == undefined)
    {
        db.query('SELECT *  FROM students', (err, results) => {

            if(err){
                res.status(500).end()
            } else {
                res.status(200).json(results.rows)
            }
        })
    }
    else{
        const search = req.query.search;
        db.query(`SELECT *  FROM students WHERE firstname like '${search}' OR lastname '${search}'`, (err, results) => {

            if(err){
                res.status(500).end()
            } else {
                res.status(200).json(results.rows)
            }
        })

    }
  })


app.get('/students/:studentId', (req, res) => {
 const studentId = req.params.studentId
  db.query(`SELECT *  FROM students WHERE student_id = ${studentId}`, (err, results) => { //${studentid}

        if(err){
            res.status(500).end()

        } else {
            res.status(200).json(results.rows)
        }
    })
})

app.get('/grades/:studentId', (req, res) => {
    const studentId = req.params.studentId
     db.query(`SELECT *  FROM grades WHERE student_id = ${studentId}`, (err, results) => { //${studentid}
   
           if(err){
               res.status(500).end()
   
           } else {
               res.status(200).json(results.rows)
           }
       })
   })

app.post('/grades/', (req, res) => {

    if(req.query.studentId == undefined && req.query.grade == undefined)
    {
        res.send("No Student Id or Grade Sent");
    }
    else if(req.query.studentId == undefined)
    {
        res.send("No Student Id Sent");
    }
    else if(req.query.grade == undefined)
    {
        res.send("No Grade Sent");
    }
    const studentId = req.params.studentId
    const grade = req.params.grade

     db.query(`INSERT INTO grades (student_id, grade)  Values(${studentId}, ${grade})`, (err, results) => { //${studentid}
   
           if(err){
               res.status(500).send()
   
           } else {
               res.status(200).send()
           }
       })
   })


   app.post('/register/', (req, res) => {

    if(req.query.username == undefined && req.query.password == undefined)
    {
        res.send("No username or password Sent");
    }
    else if(req.query.username == undefined)
    {
        res.send("No usernameSent");
    }
    else if(req.query.password == undefined)
    {
        res.send("No password Sent");
    }
    const username = req.params.username
    const password = req.params.password

     db.query(`INSERT INTO user (username, password)  Values(${username}, ${password})`, (err, results) => {
   
           if(err){
               res.status(500).end()
   
           } else {
               res.status(200)
           }
       })
   })


   

var server = app.listen(PORT)



module.exports = server