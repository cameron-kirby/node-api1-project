const express = require('express'); // CommonJS Module
const shortid = require('shortid');

const server = express(); // Creates server instance

server.use(express.json()); // teaches express how to read JSON from body of requests

let users = [
    {
        id: shortid.generate(), // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
    }
]

server.get('/', (req, res) => {
    res.json({successMessage: 'successful connection'})
})

server.post('/api/users', (req, res) => {
    const newUser = req.body;
    newUser.id = shortid.generate();

    users.push(newUser);
    
    res.json(users);
})

server.get('/api/users', (req, res) => {
    res.json(users);
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const userInfo = users.find(user => (user.id === id));

    res.json(userInfo);
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const deleted = users.find(user => (user.id === id));

    users = users.filter(user => user.id !== id);
    
    res.json(deleted);
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    const index = users.findIndex(user => (user.id === id));

    if(index !== -1) {
        // Found a user with ID
        users[index] = {...users[index], changes};
    } else {
        // Did no find user with ID
        res.status(404).json({ message: 'User not found' });
    }
    
    res.json(hubs[index]);
})

const PORT = 8000;
server.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});

console.log('server running...');