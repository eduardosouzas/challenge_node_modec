import { Router } from 'express';

import VesselController from './controllers/VesselController';
import EquipmentController from './controllers/EquipmentController';

const routes = new Router();

routes.get('/vessel', VesselController.index);
routes.post('/vessel', VesselController.store);
routes.get('/equipment', EquipmentController.index);
routes.post('/equipment', EquipmentController.store);
routes.put('/equipment/inactive', EquipmentController.inactive);

export default routes;
