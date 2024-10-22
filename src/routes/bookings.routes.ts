import { Router } from 'express';
import di from '../di/DependencyInjection';
import CreateRoomService, { CreateRoomServiceName } from '../services/room/CreateRoomService';
import ParseResponseEither from '../utils/ParseResponseEither';
import CreateRentalAdjustmentService, { CreateRentalAdjustmentServiceName } from '../services/rentalAdjustment/CreateRentalAdjustmentService';
import DeleteRentalAdjustmentService, { DeleteRentalAdjustmentServiceName } from '../services/rentalAdjustment/DeleteRentalAdjustmentService';
import CancelBookingService, { CancelBookingServiceName } from '../services/bookings/CancelBookingService';
import CreateBookingService, { CreateBookingServiceName } from '../services/bookings/CreateBookingService';
import GetAllBookingsService, { GetAllBookingsServiceName } from '../services/bookings/GetAllBookingsService';

const router = Router();

router.post('/bookings', async (req, res) => {
    const response = await di.get<CreateBookingService>(CreateBookingServiceName).call(
        req.body.roomId,
        new Date(req.body.initDate),
        new Date(req.body.endDate),
        req.body.guestsNumber,
        req.body.includeBreakfast
    );
    ParseResponseEither(res, response);
});

router.delete('/bookings/:id', async (req, res) => {
    const response = await di.get<CancelBookingService>(CancelBookingServiceName).call(req.params.id);
    ParseResponseEither(res, response);
});

router.get('/bookings', async (req, res) => {
    const response = await di.get<GetAllBookingsService>(GetAllBookingsServiceName).call();
    ParseResponseEither(res, response);
});


export default router;
