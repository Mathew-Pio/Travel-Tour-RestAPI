import User from '../models/User.js';

export const updateUser = async (req, res) => {
    const id = req.params.id
    try{
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        },  {new:true})
        if(!updatedUser){
            return res.status(404).json({message:'No User found'})
        }
        return res.status(200).json({success: true, message: 'User updated successfully', data: updatedUser})   
    }catch(err){
        return res.status(500).json({success: false, message: 'Failed to create User, Try again'})
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id
    try{
         await User.findByIdAndDelete(id)
        return res.status(200).json({success: true, message: 'User deleted successfully' })   
    }catch(err){
        return res.status(500).json({success: false, message: 'Failed to delete User, Try again'})
    }
}

export const getSingleUser = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await User.findById(id);

        return res.status(200).json({success: true, message: 'User found', data: user})
    }catch(err){
        return res.status(500).json({success: false, message: 'Failed to find User, Try again'})
    }
}

export const getAllUsers = async (req, res) => {

    try{
        const users = await User.find({})
        return res.status(200).json({success: true, message: 'User found', count: users.length, data: users})
    }catch(err){
        return res.status(500).json({success: false, message: 'Failed to find user, Try again'})
    }
}
