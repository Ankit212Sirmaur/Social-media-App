const success = (data, statusCode) => {
    return {
        status: 'ok',
        data,
        statusCode: statusCode
    }
}

const error = (message, statusCode) =>{
    return{
        status: 'error',
        message: message,
        statusCode: statusCode
    }
}

module.exports = {
    success, error
}