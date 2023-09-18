class ModelsManager {
  constructor() {
    this.db = null;
  }

  setDatabase(db) {
    this.db = db;
  }

  getModel(model) {
    if(!this.db) {
      console.error('Base de datos sin inicializar!')
      return;
    }

    return this.db.models[model];
  }
}

const mainModelsManager = new ModelsManager();

module.exports = {
  mainModelsManager,
}
