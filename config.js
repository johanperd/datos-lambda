

const { getEnv } = ('@opentelemetry/core');
const {
  appendResourcePathToUrl,
  appendRootPathToUrlIfNeeded,
  OTLPExporterConfigBase,
} =  ('@opentelemetry/otlp-exporter-base');


const DEFAULT_COLLECTOR_RESOURCE_PATH = 'v1/logs';
const DEFAULT_COLLECTOR_URL = `https://otlp-gateway-prod-us-east-0.grafana.net/otlp/${DEFAULT_COLLECTOR_RESOURCE_PATH}`;

const { getEnv } = require('./path-to-getEnv'); // Asegúrate de ajustar la ruta según tu estructura de proyecto
const { OTLPExporterConfigBase } = require('./path-to-OTLPExporterConfigBase'); // Asegúrate de ajustar la ruta según tu estructura de proyecto

/**
 * common get default url
 * @param {OTLPExporterConfigBase} config - Exporter config
 * @returns {string} - URL string
 */
function getDefaultUrl(config) {
  if (typeof config.url === 'string') {
    return config.url;
  }

  const env = getEnv();
  if (env.OTEL_EXPORTER_OTLP_LOGS_ENDPOINT.length > 0) {
    return appendRootPathToUrlIfNeeded(env.OTEL_EXPORTER_OTLP_LOGS_ENDPOINT);
  }

  if (env.OTEL_EXPORTER_OTLP_ENDPOINT.length > 0) {
    return appendResourcePathToUrl(
      env.OTEL_EXPORTER_OTLP_ENDPOINT,
      DEFAULT_COLLECTOR_RESOURCE_PATH
    );
  }

  return DEFAULT_COLLECTOR_URL;
}

module.exports = {
  DEFAULT_COLLECTOR_URL,
  getDefaultUrl,
};
