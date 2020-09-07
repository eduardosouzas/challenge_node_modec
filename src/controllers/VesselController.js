import Vessel from '../models/vessel';
import * as Yup from 'yup';

class VesselController {
  async index(req, res) {
    const vessels = await Vessel.find().populate('equipments').sort({createdAt: 'ASC'});
    return res.json(vessels);
  }

  async update(req, res) {
    const vessel = await Vessel.findByIdAndUpdate(
      req.params.id,
      { read: true},
      {new: true}
    );
    return res.json(vessel);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({error: 'validation fails'});

    const { code } = req.body;
    const checkCode = await Vessel.findOne({ where: { code: code }});

    if (checkCode) {
      return res.status(400).json({error: 'Code has already been used.'});
    }
    await Vessel.create({
      code: code
    });
    const vessel = await Vessel.findOne({code: code});
    return res.json(vessel);
  }
}


export default new VesselController();
