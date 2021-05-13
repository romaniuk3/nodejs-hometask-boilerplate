const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post('/', createUserValid, (req, res, next) => {   
    try {       
        const data = UserService.createNewUser(req.body)
        res.data = data;        
    }    
    catch (err) {       
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/', (req, res, next) => {
    try {
        const data = UserService.searchAll()
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
    try {
        const id = req.params.id

        const data = UserService.searchOne(id)
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.put('/:id', updateUserValid, (req, res, next) => {
    try {
        const id = req.params.id
        const data = UserService.updateUserData(id, req.body)

        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
    try {
        const id = req.params.id
        const data = UserService.delete(id)
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;