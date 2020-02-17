import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cpf: Sequelize.STRING,
        zip_code: Sequelize.STRING,
        city: Sequelize.STRING,
        uf: Sequelize.STRING(2),
        complement: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default Recipient;
