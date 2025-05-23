// middlewares/errorMiddleware.js

const errorHandler = (err, req, res, next) => {
      console.error(`[ERROR] ${err.message}`);
      res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
      });
    };
    
    module.exports = errorHandler;
    