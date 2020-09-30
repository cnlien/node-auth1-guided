const router = require('express').Router();
const users = require('../users/users-model.js');

router.post('/register', async (req, res, next) => {
    let user = req.body;

    try {
        const saved = await users.add(user);
        res.status(201).json(saved);
    }
    
    catch (err) {
        
    }
})


module.exports = router