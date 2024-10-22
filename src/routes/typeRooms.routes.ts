import { Router } from 'express';
import di from '../di/DependencyInjection';
import CreateTypeRoomService, { CreateTypeRoomServiceName } from '../services/typeRoom/CreateTypeRoomService';
import ParseResponseEither from '../utils/ParseResponseEither';
import GetAllTypeRoomService, { GetAllTypeRoomServiceName } from '../services/typeRoom/GetAllTypeRoomService';

const router = Router();

router.post('/typeRooms', async (req, res) => {
    const response = await di.get<CreateTypeRoomService>(CreateTypeRoomServiceName).call(req.body.name, req.body.valuePerDay, req.body.guestsNumber);
    ParseResponseEither(res, response);
});

router.get('/typeRooms', async (req, res) => {
    const response = await di.get<GetAllTypeRoomService>(GetAllTypeRoomServiceName).call();
    ParseResponseEither(res, response);
});

export default router;
