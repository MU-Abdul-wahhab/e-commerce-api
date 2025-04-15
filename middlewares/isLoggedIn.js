import getTokenFromHeader from "../utils/getTokenFromHeader.js"
import { verifyToken } from "../utils/verifyToken.js";

export const isLoggedIn = (req,res,next)=>{

    const token = getTokenFromHeader(req);
    const decoded = verifyToken(token);

    if(!decoded){
        throw new Error("Token Has Been Expired");
    }else{
        req.userAuthId = decoded?.id
        next();
    }

 

}