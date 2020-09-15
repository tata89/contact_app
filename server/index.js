const fs = require('fs');
const express = require('express')
const app = express()
var cors = require('cors');
const { validateChar, validateupdateChar } = require("./validate");
app.use(express.json())
app.use(cors())
var data = fs.readFileSync('store.json')
var user_data = JSON.parse(data)
//current date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = dd + '-' + mm + '-' + yyyy;
//Read
app.get("/api/user_data", (req, res) => {
    let user = req.query.usr
    let location = req.query.loc
    const usersearch = user_data.filter((usr) => usr.name == user)
    const userloc = user_data.filter((usr) => usr.location == location)
    if (user) {
        res.send(usersearch)
    } else if (location) {
        res.send(userloc)
    } else {
        res.send(user_data)
    }
})
//Create
app.post('/api/user_data/:name/:number/:incoming_call_count/:location/:outgoing_call_count', (req, res) => {
    const user = {
        id: user_data.length + 1,
        name: req.params.name,
        created_date: today,
        number: req.params.number,
        incoming_call_count: req.params.incoming_call_count,
        location: req.params.location,
        outgoing_call_count: req.params.outgoing_call_count
    }
    console.log(user)
    const { error } = validateChar(user)
    if (error) return res.status(400).send(error.details[0].message)
    user_data.push(user)
    let res_user_data = JSON.stringify(user_data, null, 2)
    fs.writeFile("store.json", res_user_data, (err) => {
        if (err) {
            console.log(err)
        }
    })

    res.send(user)
})

//Update
app.put('/api/user_data/:id', (req, res) => {
    let res_body = req.body
    const user = user_data.find(c => c.id === parseInt(req.params.id))
    if (!user) return res.status(404).send("the course with given id was not found")
    const { error } = validateupdateChar(res_body)
    if (error) return res.status(400).send(error.details[0].message)
    for (let elm in res_body) {
        user[elm] = res_body[elm]
    }
    //user.name = req.body.name
    let res_user_data = JSON.stringify(user_data, null, 2)
    fs.writeFile("store.json", res_user_data, (err) => {
        if (err) {
            console.log(err)
        }
    })
    res.send(user);
})

//Delete
app.delete('/api/user_data/:id', (req, res) => {
    const user = user_data.find(c => c.id === parseInt(req.params.id))
    if (!user) return res.status(404).send("the course with given id was not found")
    const index = user_data.indexOf(user)
    user_data.splice(index, 1)
    let res_user_data = JSON.stringify(user_data, null, 2)
    fs.writeFile("store.json", res_user_data, (err) => {
        if (err) {
            console.log(err)
        }
    })
    res.send(user);
})

const port = process.env.PORT || 3030
app.listen(port, () => console.log(`listeing on port ${port}... Enable cors in all requests..`))