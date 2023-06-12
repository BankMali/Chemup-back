module.exports = (err, req, res, next) => {
    console.log(err.name)
    if(err.name ==='JsonWebTokenError')
        err.statusCode = 401

    res.status(err.statusCode || 500).json({error: err.message})
}