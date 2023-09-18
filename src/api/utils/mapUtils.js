const mapXmlToRecord = (data, cameraId) => ({
  cameraId,
  plate: data.ANPR?.[0].licensePlate?.[0] ?? '',
  type: data.ANPR?.[0].vehicleType?.[0] ?? '',
  uuid: data.UUID?.[0] ?? '',
  fileName: data.ANPR?.[0].pictureInfoList?.[0]?.pictureInfo?.[0]?.fileName?.[0] ?? '',
  model: data.ANPR?.[0].vehicleInfo?.[0]?.vehileModel?.[0] ?? '',
});

module.exports = {
  mapXmlToRecord
}
