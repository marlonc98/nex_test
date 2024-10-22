import { Router} from 'express';
import di from '../di/DependencyInjection';
import TypeRoomRepository, { TypeRoomRepositoryName } from '../repositories/typeRoom/TypeRoomRepository';

const router = Router();

router.post('/typeRooms', (req, res) => {
    res.send('Hello World');
    // return di.get<TypeRoomRepository>(TypeRoomRepositoryName).createTypeRoom(req.body.name, req.body.valuePerDay)
    
});

export default router;
