import express from 'express';
import TypeRoomsRoutes from './src/routes/typeRooms.routes';
import RoomRoutes from './src/routes/rooms.routes';
import RentalAdjustmentsRoutes from './src/routes/rentalAdjustments.routes';
import BookingsRoutes from './src/routes/bookings.routes';

const app = express();

app.use(express.json());

const port = process.env.PORT || 2000
app.listen(port);

app.use('/api', BookingsRoutes);
app.use('/api', TypeRoomsRoutes);
app.use('/api', RoomRoutes);
app.use('/api', RentalAdjustmentsRoutes);
console.log(`Server started on port ${port}`);