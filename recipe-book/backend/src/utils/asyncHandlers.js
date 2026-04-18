const asyncHandler = (requestHandler) => {
    return async (req, res, next) => {
        try {
            await requestHandler(req, res, next);
        } catch (error) {

            res.status(Number(error.statusCode) || 500).json({ success: false, message: error.message || "Internal server error" })
        }
    }
}

export { asyncHandler }