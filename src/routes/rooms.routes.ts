import { Router } from 'express';
import di from '../di/DependencyInjection';
import CreateRoomService, { CreateRoomServiceName } from '../services/room/CreateRoomService';
import ParseResponseEither from '../utils/ParseResponseEither';
import GetAvailableRoomsService, { GetAvailableRoomsServiceName } from '../services/room/GetAvailableRoomsService';

const router = Router();

router.post('/rooms', async (req, res) => {
    const response = await di.get<CreateRoomService>(CreateRoomServiceName).call(req.body.name, req.body.typeRoomId);
    ParseResponseEither(res, response);
});

router.post('/rooms/availables', async (req, res) => {
    const response = await di.get<GetAvailableRoomsService>(GetAvailableRoomsServiceName).call(
        new Date(req.body.checkIn),
        new Date(req.body.checkOut),
        req.body.numberOfGuests,
        {
            includeBreakfast: req.body.includeBreakfast,
            typeOfRoomIds: req.body.typeOfRoomIds
        });
    ParseResponseEither(res, response);
})

export default router;
