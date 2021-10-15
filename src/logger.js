import { createLogger, format, transports } from "winston";

const mode = process.env.NODE_ENV;

const customFormat = format.combine(
  format.timestamp(),
  format.printf(
    (log) =>
      `${log.timestamp} [${log.level.toUpperCase().padEnd(7)}] - ${log.message}`
  )
);

const logger = createLogger({
  format: customFormat,
  transports: [
    new transports.Console({
      level: mode === "development" ? "silly" : "info",
    }),
    new transports.File({ filename: "app.log", level: "info" }),
  ],
});

export default logger;
