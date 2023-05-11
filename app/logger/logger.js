const { createLogger, transports, format } = require('winston');
const { combine, timestamp, label, printf } = format;
const util = require('util');

const logger = createLogger({
  format: combine(
    label({ label: 'attendance_api' }),
    timestamp(),
    printf(({ level, message, label, timestamp }) => {
      return JSON.stringify({
        level,
        message,
        timestamp,
        label
      });
    })
  ),
  transports: [
    new transports.File({
        filename: '/home/ubuntu/soorya/miniProject2/app/logger/combined.log'
      })
  ]
});

function logRequest(req, metadata, timeTaken) {
  const message = util.format('Processed %s request to %s in %dms', req.method, req.originalUrl, timeTaken);
  logger.info(message, metadata);
}

// // Example usage
// const req = { method: 'GET', originalUrl: '/users' };
// const metadata = { user: 'johndoe' };
// const timeTaken = 100;
// logRequest(req, metadata, timeTaken);


module.exports=logRequest