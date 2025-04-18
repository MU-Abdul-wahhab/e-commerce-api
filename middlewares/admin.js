import User from "../model/User.js"

const isAdmin = async (req,res,next)=>{
    const user = await User.findById(req.userAuthId);

    if(user.isAdmin) return next();

    next(new Error("Access Denied"));
}

export default isAdmin;