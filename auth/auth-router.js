const router = require('express').Router();
const users = require('../users/users-model.js');

router.post('/register', async (req, res, next) => {

    // DON'T FORGET TO SEED THE DB AFTER THIS
    // knex migrate:latest
    // knex see:run

    let user = req.body;

    try {
        const saved = await users.add(user);
        res.status(201).json(saved);
    }
    
    catch (err) {
        next({
            apiCode: 500,
            apiMessage: 'error registering',
            ...err
        })
    }
})

module.exports = router