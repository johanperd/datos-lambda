const logsAPI = require('@opentelemetry/api-logs');
const {
    LoggerProvider,
    SimpleLogRecordProcessor,
    ConsoleLogRecordExporter,
  } = require('@opentelemetry/sdk-logs');
  
  // To start a logger, you first need to initialize the Logger provider.
  const loggerProvider = new LoggerProvider();
  // Add a processor to export log record
  loggerProvider.addLogRecordProcessor(
    new SimpleLogRecordProcessor(new ConsoleLogRecordExporter())
  );
  
  
  // You can also use global singleton
  logsAPI.logs.setGlobalLoggerProvider(loggerProvider);
  
  // emit a log record
  logger.emit({
    severityNumber: logsAPI.SeverityNumber.INFO,
    severityText: 'INFO',
    body: 'this is a log record body',
    attributes: { 'log.type': 'LogRecord' },
  });

  
const logger = logs.getLogger('datos-lambda', '1.0.0');

function info(message, attributes = {}) {
    logger.emit({
      severityNumber: SeverityNumber.INFO,
      severityText: 'INFO',
      body: message,
      attributes: attributes,
    });
  }

  module.exports = { logger, info };

