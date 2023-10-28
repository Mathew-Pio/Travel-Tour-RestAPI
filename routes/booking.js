import express from 'express';
import { createBooking, getAllBookings, getBooking } from '../controllers/bookingController.js'
import { verifyUser, verifyAdmin } from '../auth/verifyToken.js'
const router = express.Router();

router.post('/', verifyUser, createBooking);

router.get('/', verifyAdmin, getAllBookings);

router.get('/:id', verifyUser, getBooking);

export default router;