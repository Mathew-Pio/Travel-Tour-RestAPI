import Booking from '../models/Booking.js'

export const createBooking = async(req, res) => {
    const newBooking = new Booking(req.body)
    try{
        const savedBooking = await newBooking.save();
        return res.status(201).json({success: true, message: 'Your tour is booked', data:savedBooking});
    }catch(err){
        return res.status(201).json({success: true, message: 'Internal Server error'});
    }
}

export const getBooking = async(req, res) => {
    const id = req.params.id;
    try{
        const book = await Booking.findById(id);
        return res.status(201).json({success: true, message: 'Successful', data: book});
    }catch(err){
        return res.status(201).json({success: true, message: 'Internal Server error'});
    }
}

export const getAllBookings = async(req, res) => {
    try{
        const bookings = await Booking.find({});
        return res.status(201).json({success: true, message: 'Successful', data: bookings});
    }catch(err){
        return res.status(201).json({success: true, message: 'Internal Server error'});
    }
}