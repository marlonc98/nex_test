import { Router } from 'express';
import di from '../di/DependencyInjection';
import CreateRoomService, { CreateRoomServiceName } from '../services/room/CreateRoomService';
import ParseResponseEither from '../utils/ParseResponseEither';
import CreateRentalAdjustmentService, { CreateRentalAdjustmentServiceName } from '../services/rentalAdjustment/CreateRentalAdjustmentService';
import DeleteRentalAdjustmentService, { DeleteRentalAdjustmentServiceName } from '../services/rentalAdjustment/DeleteRentalAdjustmentService';

const router = Router();

router.post('/rental-adjustments', async (req, res) => {
    const response = await di.get<CreateRentalAdjustmentService>(CreateRentalAdjustmentServiceName).call(req.body.minDays, req.body.discount, req.body.typeRoomId);
    ParseResponseEither(res, response);
});

router.delete('/rental-adjustments/:id', async (req, res) => {
    const response = await di.get<DeleteRentalAdjustmentService>(DeleteRentalAdjustmentServiceName).call(req.params.id);
    ParseResponseEither(res, response);
});


export default router;
