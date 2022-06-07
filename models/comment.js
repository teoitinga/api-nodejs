const { Model, DataTypes } = require('sequelize');

class Comment extends Model {
 
  static init(connection) {
    super.init({
      comments: DataTypes.STRING,
      from: DataTypes.STRING,
      to: DataTypes.STRING,
      previous: DataTypes.STRING,
      taskid: DataTypes.STRING,
      createdby: DataTypes.STRING,
      updatedby: DataTypes.STRING,
      created: DataTypes.DATE,
      updated: DataTypes.DATE
    }, {
      createdAt: 'created',
      updatedAt: 'updated',
      sequelize: connection,
      modelName: 'Comment',
    })
  }
}; 
module.exports = Comment;