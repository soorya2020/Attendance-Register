const { createLogger, transports, format } = require('winston');
const { combine, timestamp, label, printf } = format;

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

module.exports=logger