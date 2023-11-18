import User from '../models/User.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    const { username, email, password, photo } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    try{
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            photo
        })

        await newUser.save();
        return res.status(200).json({success:true, message: 'Successfully created', data:newUser})
    }catch(err){
        return res.status(500).json({err,success:false, message: 'Failed to signup, try again'})
    }
}

export const login = async (req, res) => {
    const { email } = req.body;
    try{
        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({success:false, message:'User not found'})
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)

        if(!isPasswordMatch){
            return res.status(401).json({success:false, message:'Incorrect email or password'})
        }

        const {password, role,...rest} = user._doc

        // create jwt token
        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET_KEY,
            {expiresIn:'15d'}
        )
        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: token.expiresIn
        }).status(200).json({token, role,success: true, message:'successfull login', data: {...rest}})
    }catch(err){
        return res.status(500).json({err: console.log(err), success:false, message:'failed to login'})
    }
}