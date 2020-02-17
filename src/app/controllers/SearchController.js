import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class SearchController {
  async index(req, res) {
    const { search } = req.query;

    const searchResult = await Recipient.findAll({
      where: {
        [Op.or]: [
          {
            name: { [Op.iLike]: `%${search}%` },
          },
          {
            cpf: search,
          },
        ],
      },
    });

    return res.json(searchResult);
  }
}

export default new SearchController();
