const { DataTypes, Sequelize, ModelCtor } = require('sequelize');

/**
 * 
 * @param {Sequelize} db 
 * @returns {ModelCtor}
 */
const defineCount = db =>{
  const Count = db.define('Count', {
    count: DataTypes.BIGINT,
  });

  Count.sync()
  .then(() => Count.findOne({ where: { id: 1 } }))
  .then(result => {
    if(result) {
      return;
    }

    const newCount = Count.build({ count: 0 });
    
    newCount.save()
    .catch(err => console.error(err));
  });

  return Count;
}

module.exports = {
  defineCount
};
