import winston, { format, transports } from 'winston';

const { combine, printf } = format;
const { Console } = transports;

const formatOutput = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level.toLocaleUpperCase()} | ${message}`;
});

// eslint-disable-next-line arrow-body-style
const GetLogger = (label) => {
  return winston.loggers.add(label, {
    level: process.env.LOGGING || 'info',
    format: combine(
      format.label({ label }),
      format.timestamp(),
      formatOutput,
    ),
    transports: [
      new Console(),
    ],
  });
};

export default GetLogger;
