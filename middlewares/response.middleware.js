const validationError  = require('../errors/validationError');
const notFoundError = require('../errors/notFoundError');

const responseMiddleware = (req, res, next) => {
    if (res.data){
        res.send(res.data);
    }else if(res.err){
        if(res.err instanceof validationError){
            res.body = res.status(400).json({
                error: true,
                message: res.err.message
            })
        }
        else if(res.err instanceof notFoundError){
            res.body = res.status(400).json({
                error: true,
                message: res.err.message
            })
        }
        else  {
            res.send({error: true, message: res.err.message});
        }
    }else {
        next();
    }
}

exports.responseMiddleware = responseMiddleware;