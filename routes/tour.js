import express from 'express';
import { createTour, updateTour, deleteTour, getSingleTour, getAllTours, getTourBySearch, getFeaturedTours, getTourCount } from '../controllers/tourController.js';
import { verifyAdmin, verifyToken } from '../auth/verifyToken.js'
const router = express.Router();

router.post('/', verifyToken, createTour);

router.put('/:id', verifyToken, updateTour);

router.delete('/:id', verifyToken, deleteTour);

router.get('/:id', getSingleTour);

router.get('/', getAllTours);

router.get('/search/getTourBySearch', getTourBySearch);

router.get('/search/getFeaturedTour', getFeaturedTours);

router.get('/search/getTourCount', getTourCount);

export default router;