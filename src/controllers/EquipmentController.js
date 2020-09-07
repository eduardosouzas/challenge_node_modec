import * as Yup from 'yup';
import Equipment from '../models/equipment'
import Vessel from '../models/vessel'

class EquipmentController {
  async index(req, res) {
    const equipaments = await Equipment.find({status: true}).populate('vessel');
    return res.json(equipaments);
  }

  async inactive(req, res) {
    const schema = Yup.object().shape({
      equipaments: Yup.array().of(
        Yup.object().shape({
          code: Yup.string().required()
        })
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({error: 'validation fails'});
    }

    const { equipments } = req.body;
    let errors = [];
    const promises = equipments.map(async object => {
      const equipment = await Equipment.findOne({ where: { code: object.code, status: true}});
      if (!equipment)  {
        errors.push(`equipmanet code ${object.code} not found! `);
        return
      }
      equipment.status = false;
      await equipment.save()
    });
    await Promise.all(promises);
    return res.json({errors});
  }
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      code: Yup.string().required(),
      location: Yup.string().required(),
      vessel_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({error: 'validation fails'});
    }
    const { name, code, location, vessel_id} = req.body;
    const vessel = await Vessel.findOne({code: vessel_id})

    if (!vessel) {
      return res.status(400).json({error:  `vessel with the code ${vessel_id} was not found`});
    }

    const checkCode = await Equipment.findOne({code: code});

    if (checkCode) {
      return res.status(400).json({error: 'Code has already been used.'});
    }
    const equipment = await Equipment.create({
      name,code,location, vessel: vessel._id,
    });

    vessel.equipments.push(equipment);
    await vessel.save();

    return res.json(equipment.populate('vessel'));
  }
}

export default new EquipmentController;
