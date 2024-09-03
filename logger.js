
import { DiagConsoleLogger, DiagLogLevel, diag } from '@opentelemetry/api';
import { logs, SeverityNumber } from '@opentelemetry/api-logs';
import {
  LoggerProvider,
  SimpleLogRecordProcessor,
} from '@opentelemetry/sdk-logs';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';



diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const headers = {
    'Authorization': 'Basic OTg2MTA2OmdsY19leUp2SWpvaU1URTNOVE0yTmlJc0ltNGlPaUpoZDNNdFlYZHpMV3hoYldKa1lTSXNJbXNpT2lJMVJFUktORFk1VDA4eGVXaHdjVTh6VlRJM1NEWlBSRElpTENKdElqcDdJbklpT2lKMWN5SjlmUT09'
  };

  const collectorOptions = {
    url: 'https://otlp-gateway-prod-us-east-0.grafana.net/otlp/v1/logs', 
    headers: headers,
  };

  const exporter = new OTLPLogExporter(collectorOptions);

const loggerProvider = new LoggerProvider();
loggerProvider.addLogRecordProcessor(
  new SimpleLogRecordProcessor(exporter)
);

logs.setGlobalLoggerProvider(loggerProvider);

const logger = logs.getLogger('datos-lambda', '1.0.0');

/** 
logger.emit({
  severityNumber: SeverityNumber.INFO,
  severityText: 'INFO',
  body: 'this is a log record body',
  attributes: { 'log.type': 'custom' },
});*/

module.exports = logger;

