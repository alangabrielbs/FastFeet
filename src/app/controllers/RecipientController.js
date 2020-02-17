import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string().required(),
      zip_code: Yup.string().required(),
      city: Yup.string().required(),
      uf: Yup.string()
        .max(2)
        .required(),
      complement: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipientExists = await Recipient.findOne({
      where: { cpf: req.body.cpf },
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    // não recebe o cpf pois o mesmo não
    // pode ser alterado.
    const schema = Yup.object().shape({
      name: Yup.string(),
      zip_code: Yup.string(),
      city: Yup.string(),
      uf: Yup.string().max(2),
      complement: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // procurar por uma forma de ja buscar o recipient e
    // fazer update em uma unica chamada como o
    // findByIdAndUpdate do mongoose

    const recipient = await Recipient.findByPk(req.params.id);

    const updatedRecipient = await recipient.update(req.body);

    return res.json(updatedRecipient);
  }

  async index(req, res) {
    try {
      const recipients = await Recipient.findAll();

      return res.json(recipients);
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao buscar destinatarios' });
    }
  }
}

export default new RecipientController();
