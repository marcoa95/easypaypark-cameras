const mapXmlToRecord = (data, cameraId) => ({
  cameraId,
  plate: data.ANPR?.licensePlate ?? '',
  type: data.ANPR?.vehicleType ?? '',
  uuid: data.UUID ?? '',
  fileName: data.ANPR?.pictureInfoList?.pictureInfo?.[1]?.fileName ?? '',
  model: data.ANPR.vehicleInfo?.vehileModel ?? '',
});

module.exports = {
  mapXmlToRecord
}
