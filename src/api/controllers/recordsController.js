const puppeteer = require('puppeteer').default;
const moment = require('moment');
const { mainModelsManager } = require('../models/modelsManager');
const { mapXmlToRecord } = require('../utils/mapUtils');
const { NON_EXISTING_RECORD } = require('../errors/recordsErrors');
const { NON_EXISTING_CAMERA } = require('../errors/camerasErrors');
const HBS = require('../hbs');

const { HTTP_PORT, LOGO_FILENAME, PARKING_NAME } = process.env;

const findAllRecords = ({ where, offset, limit }) => new Promise((resolve, reject) => mainModelsManager.getModel('Record').findAll({
  where,
  offset,
  limit,
  raw: true,
  nest: true,
  order: [['createdAt', 'DESC']],
  include: [
    {
      association: 'camera'
    },
  ]})
  .then(results => resolve(results))
  .catch(err => reject(err))
);

const findRecord = where => new Promise((resolve, reject) => mainModelsManager.getModel('Record').findOne({
  where,
  include: [
    {
      association: 'camera'
    },
  ]})
  .then(result => result ? result : Promise.reject(NON_EXISTING_RECORD))
  .then(result => resolve(result))
  .catch(err => reject(err))
);

const createRecord = (rawRecord, cameraName) => new Promise((resolve, reject) => mainModelsManager.getModel('Camera')
  .findOne({ where: { name: cameraName } })
  .then(camera => camera ? camera.id : Promise.reject(NON_EXISTING_CAMERA))
  .then(cameraId => mainModelsManager.getModel('Record').build(mapXmlToRecord(rawRecord, cameraId)))
  .then(newRecord => newRecord.save())
  .then(result => resolve(result.id))
  .catch(err => reject(err))
);

const generateRecordsPdf = query => new Promise(async (resolve, reject) => {
  let browser, page;
  try {
    const reports = await findAllRecords(query);
    const content = HBS.renderTemplate('report', {
      port: HTTP_PORT,
      logo: LOGO_FILENAME,
      name: PARKING_NAME,
      title: 'Reporte de cámaras',
      today: new Date().toISOString(),
      start: query.start,
      end: query.end,
      reports,
    });
    
    browser = await puppeteer.launch({ headless: 'new' });
    page = await browser.newPage();
    await page.setContent(content);

    const pdf = await page.pdf({
      format: 'A4',
      landscape: true,
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '',
      footerTemplate: `
        <html>
          <style>html {-webkit-print-color-adjust: exact;}</style>
          <div style="font-size: 18px; color: white; width: 100%; background-color: #103856; margin: 8px; padding: 12px 8px; display: flex; justify-content: space-between;">
            <div>Consultado en ${moment(new Date()).format('DD/MM/YYYY, h:mm:ss a')}</div>
            <div><span class="pageNumber"></span> de <span class="totalPages"></span></div>
          </div>
        </html>
      `,
      margin: { top: '10px', bottom: '100px' },
    });
   
    resolve(pdf);
  } catch(err) {
    reject(err);
  } finally {
    page?.close();
    browser?.close();
  }
});

module.exports = {
  findAllRecords,
  findRecord,
  createRecord,
  generateRecordsPdf,
}
