const logger=require('./logger')
const util = require('util');

const loggerFormat=(req, metadata, timeTaken)=>{
    const message = util.format('Processed %s request to %s in %dms', req.method, req.originalUrl, timeTaken);
    logger.info(message, metadata);
  }

module.exports=loggerFormat
