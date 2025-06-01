// Do not delete this, we use MQTT communication with device in helps of this array!
const climateModels = [
  'CARRIER',
  'DAIKIN',
  'ARCELIK',
  'FUJİTSU',
  'GENERAL',
  'GREE',
  'LG',
  'MITSUBISHI',
  'TOSHIBA',
  'BOSCH',
  'VESTEL',
  'YORK',
]

const deviceTypes = [
  'DT-100',
  'DT-200',
  'DT-300',
]

const deviceLocationTypes = [
  'INTEGRATED',
  'INDEPENDENT',
]

const deviceStatuses = [
  'ON',
  'OFF',
]

const deviceMeasurementTypes = [
  'TEMPERATURE',
  'HUMIDITY',
  'CURRENT',
]

module.exports = {
  climateModels,
  deviceTypes,
  deviceLocationTypes,
  deviceStatuses,
  deviceMeasurementTypes,
}