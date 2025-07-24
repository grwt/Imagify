
import jwt from 'jsonwebtoken';

const userAuth=async (req, res, next) => {
  const {token}=req.headers;
   
  if(!token){
    return res.json({sucess:false ,message:'Not Authorzed,Login Again'});
  }
  try{
    const tokenDecode=jwt.verify(token,process.env.JWT_SECRET);

    if(tokenDecode.id){
      req.user = { id: tokenDecode.id };
    }
    else{
      return res.json({sucess:false ,message:'Not Authorized, login again'});
    }
    next();
  }
  catch(error){
    return res.json({sucess:false ,message:error.message});
  }
}

export default userAuth;
