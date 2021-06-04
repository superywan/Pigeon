// Error Handler If Route Not Found
export const notFound = (req, res, next) => {
    const error = new Error(`Route Not Found ${req.originalUrl}`);
    res.status(404);
    next(error);
};
