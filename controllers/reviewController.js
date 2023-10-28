import Review from '../models/Review.js';
import Tour from '../models/Tour.js'

export const createReview = async (req, res) => {
    const tourId = req.params.tourId
    const newReview = new Review({ ...req.body })
    try{
        const savedReview = await newReview.save();

        // after creating a new update the rewview array of the tour
        await Tour.findByIdAndUpdate(tourId, {
            $push: {reviews: savedReview._id}
        })

        return res.status(201).json({succes: true, message:'Review Submitted', data: savedReview});
    }catch(err){
        return res.status(500).json({err: console.log(err), success: false, message: 'Failed to submit'})
    }
}