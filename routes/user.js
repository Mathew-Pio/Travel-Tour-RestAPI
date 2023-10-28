import express from 'express';
import { updateUser, deleteUser, getSingleUser, getAllUsers } from '../controllers/userController.js';
import { verifyUser } from '../auth/verifyToken.js';
const router = express.Router();

router.put('/:id', verifyUser, updateUser);

router.delete('/:id', verifyUser, deleteUser);

router.get('/:id', verifyUser, getSingleUser);

router.get('/', getAllUsers);

export default router;