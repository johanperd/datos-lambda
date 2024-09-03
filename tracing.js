const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-http');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const logger = require('./logger'); 

const headers = {
  'Authorization': 'Basic OTg2MTA2OmdsY19leUp2SWpvaU1URTNOVE0yTmlJc0ltNGlPaUpoZDNNdFlYZHpMV3hoYldKa1lTSXNJbXNpT2lJMVJFUktORFk1VDA4eGVXaHdjVTh6VlRJM1NEWlBSRElpTENKdElqcDdJbklpT2lKMWN5SjlmUT09'
};

// Configura el nivel de diagnóstico (opcional)
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.TRACE);

// Configura el exportador de trazas
const traceExporter = new OTLPTraceExporter({
  url: 'https://otlp-gateway-prod-us-east-0.grafana.net/otlp/v1/traces', 
  headers: headers
});

// Configura el exportador de métricas
const metricExporter = new OTLPMetricExporter({
  url: 'https://otlp-gateway-prod-us-east-0.grafana.net/otlp/v1/metrics', 
  headers: headers
});

// Configura el exportador de logs
const logExporter = new OTLPLogExporter({
  url: 'https://otlp-gateway-prod-us-east-0.grafana.net/otlp/v1/logs', 
  headers: headers
});

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'datos-lambda'
  }),
  traceExporter,
  metricExporter,
  logExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

try {
  sdk.start();
  logger.info('Tracing initialized');
} catch (error) {
  logger.info('Error initializing tracing', error);
}

// Captura la finalización de la aplicación para limpiar el SDK
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('OpenTelemetry SDK cerrado'))
    .catch((error) => console.error('Error cerrando OpenTelemetry SDK', error))
    .finally(() => process.exit(0));
});
