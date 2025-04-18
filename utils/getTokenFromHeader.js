
const getTokenFromHeader = (req)=>{

    const token = req?.headers?.authorization?.split(" ")[1];
    if(!token){
        return new Error("Token Not Found");
    }else{
        return token;
    }

}

export default getTokenFromHeader;
