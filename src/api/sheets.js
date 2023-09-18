const { GoogleSpreadsheet } = require('google-spreadsheet');

const {
  GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  GOOGLE_SHEET_ID,
  GOOGLE_SHEET_INDEX,
} = process.env;

const INDEXES = {
  RATES: GOOGLE_SHEET_INDEX,
}

const HEADERS = {
  RATES: ['ID','Folio', 'ID Tarifa'],
}

/**
 * Loads the Google Spreadsheet
 * @returns {Promise<GoogleSpreadsheet>} Spreadsheet instance
 */
const loadDoc = async () => {
  try {
    const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID);

    await doc.useServiceAccountAuth({
      client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY
    });
    
    await doc.loadInfo();

    while(doc.sheetCount < Number(GOOGLE_SHEET_INDEX) + 1) {
      await doc.addSheet();
    }

    // Rates
    const ratesSheet = doc.sheetsByIndex[INDEXES.RATES];
    await ratesSheet.updateProperties({ title: 'Tarifas' });
    await ratesSheet.setHeaderRow(HEADERS.RATES);

    return doc;
  } catch(err) {
    console.error('Error al conectar con Google Sheets');
    return Promise.reject(err);
  }
}

class SheetsManager {
  constructor() {
    this.doc = null;
  }

  setDoc(doc) {
    this.doc = doc;
  }

  getDoc() {
    if(!this.doc) {
      console.error("No se ha configurado un documento válido");
    }

    return this.doc;
  }
}

const sheetsManager = new SheetsManager();

module.exports = {
  loadDoc,
  sheetsManager,
  INDEXES,
  HEADERS
}
