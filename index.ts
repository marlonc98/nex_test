import express from 'express';
import typeRoomsRoutes from './src/routes/typeRooms.routes';

const app = express();

app.use(express.json());

app.listen(3000);

app.use('/api', typeRoomsRoutes);
console.log('Server started on port 3000');
console.log("sdasdasd");