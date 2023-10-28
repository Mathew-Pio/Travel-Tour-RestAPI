import Tour from '../models/Tour.js';

export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);
    try{
        const savedTour = await newTour.save();
        return res.status(201).json({success: true, message: 'Tour created successfully', data: savedTour})
    }catch(err){
        return res.status(500).json({success: false, message: 'Failed to create Tour, Try again'})
    }
}

export const updateTour = async (req, res) => {
    const id = req.params.id
    try{
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body
        },  {new:true})
        if(!updatedTour){
            return res.status(404).json({message:'No tour found'})
        }
        return res.status(200).json({success: true, message: 'Tour updated successfully', data: updatedTour})   
    }catch(err){
        return res.status(500).json({success: false, message: 'Failed to create Tour, Try again'})
    }
}

export const deleteTour = async (req, res) => {
    const id = req.params.id
    try{
         await Tour.findByIdAndDelete(id)
        return res.status(200).json({success: true, message: 'Tour deleted successfully' })   
    }catch(err){
        return res.status(500).json({success: false, message: 'Failed to delete Tour, Try again'})
    }
}

export const getSingleTour = async (req, res) => {
    try{
        const id = req.params.id;
        const tour = await Tour.findById(id).populate('reviews');

        return res.status(200).json({success: true, message: 'Tour found', data: tour})
    }catch(err){
        return res.status(500).json({success: false, message: 'Failed to find Tour, Try again'})
    }
}

export const getAllTours = async (req, res) => {

    // for pagination
    const page = parseInt(req.query.page);

    try{
        const tours = await Tour.find({}).populate('reviews')
        .skip(page * 8)
        .limit(8);
        return res.status(200).json({success: true, message: 'Tour found', count: tours.length, data: tours})
    }catch(err){
        return res.status(500).json({success: false, message: 'Failed to find Tour, Try again'})
    }
}


export const getTourBySearch = async (req, res) => {
    const city = new RegExp(req.query.city, 'i') // i for case sensitive
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)

    try{
        const queryCriteria = {};

        if(req.query.city){
            queryCriteria.city = city;
        }

        if (req.query.distance) {
            const distance = parseFloat(req.query.distance); // Assuming distance is a number
            if (!isNaN(distance)) {
              // Add $gte operator to the query
              queryCriteria.distance = { $gte: distance };
            } else {
              return res.status(404).json({message:'Not a number'})
            }
        }

        if(req.query.maxGroupSize){
            const maxGroupSize = parseFloat(req.query.maxGroupSize); // Assuming distance is a number
            if (!isNaN(maxGroupSize)) {
              // Add $gte operator to the query
              queryCriteria.maxGroupSize = { $gte: maxGroupSize };
            } else {
              return res.status(404).json({message:'Not a number'})
            }
        }
        // gte means greater than equal
        const tours = await Tour.find(queryCriteria).populate('reviews');
        if(tours.length === 0){
            return res.status(404).json({message:'No tours found'})
        }
        return res.status(200).json({success: true, count: tours.length, message: 'Tour found', data: tours})
    }catch(err){
        return res.status(500).json({success: false, message: 'Failed to find Tour'}) 
    }
}

// get featued tour

export const getFeaturedTours = async (req, res) => {

    try{
        const tours = await Tour.find({featured:true})
        .limit(8);
        return res.status(200).json({success: true, count: tours.length, message: 'Tour found', data: tours})
    }catch(err){
        return res.status(500).json({success: false, message: 'Failed to find Tour, Try again'})
    }
}

export const getTourCount = async (req, res) => {
    try{
        const tourCount = await Tour.estimatedDocumentCount();
        return res.status(200).json({success:true, data: tourCount})
    }catch(err){
        return res.status(500).json({success:false, message: 'failed to fetch'})
    }
}






























