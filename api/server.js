// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');
const server = express();
server.use(express.json());

server.get('/hello', (req, res)=>{
    res.json({ message: 'hello' })
})

server.get('/api/users', (req, res)=>{
    User.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.status(500).json({ 
            message: "Couldn't get all users",
            error: err.message
        })
    })
})

// server.get('/api/server/users', async (req, res)=>{
//     try {
//         const users = await User.find()
//         res.json(users)
//     } catch (err) {
//         res.status(500).json({ 
//             message: 'something bad happened',
//             error: err.message
//         })
//     }
// })

server.get('/api/users/:id', async (req, res) =>{
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(404).json({
                message: `User by id ${req.params.id} does not exist`
            })
        } else {
            res.json(user)
        }
    } catch (err) {
        res.status(500).json({ 
            message: "Couldn't get user by id",
            error: err.message
        })
    }
})

server.post('/api/users', async (req, res)=> {
    try {
        if (!req.body || !req.body.bio) {
            res.status(400).json({
                message: 'name and bio are required!'
            })
        } else {
            const newUser = await User.insert(req.body)
            res.status(201).json(newUser)
        }
    } catch (err) {
        res.status(500).json({ 
            message: "Couldn't post new user",
            error: err.message
        })
    }
})

server.put('/api/users/:id', async (req, res)=> {
    const { id } = req.params 
    const { body } = req 
    try {
        const updated = await User.update(id, body)
        if (!updated) {
            res.status(404).json({
                message: `User by id ${id} does not exist`
            })
        } else {
            res.json(updated)
        }
    } catch (err) {
        res.status(500).json({ 
            message: "Couldn't update new user",
            error: err.message
        })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}