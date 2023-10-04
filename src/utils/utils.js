const successResponse = (data) => {
    return {
        success: true,
        payload: data
    }
}

const errorResponse = (message, error = null) => {
    return {
        success: false,
        description: message,
        payload: data
    }
}

module.exports = {
    successResponse,
    errorResponse
}