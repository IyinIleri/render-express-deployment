

const errorHandler = (err, req, res, next) => {
 if(err){
    const  statusCode = res.statusCode != 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: err.stack
    });
 }
}

module.exports = errorHandler