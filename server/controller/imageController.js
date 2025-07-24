import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";

export const generateImage = async (req, res) => {
 try
 {
  const userId = req.user.id;
  const prompt = req.body.prompt;
  const user = await userModel.findById(userId);
  if(!user||!prompt){
    return res.json({sucess:false,message:"Missing Details"})
  }
  if(user.creditBalance===0 || userModel.creditBalance<0){
    return res.json({sucess:false,message:"Insufficient Credits",creditBalnace:user.creditBalance})
  }


  const formData=new FormData();
  formData.append('prompt',prompt)
  const {data}= await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
    headers: {
    'x-api-key': process.env.CLIPDROP_API,
  },
  responseType: 'arraybuffer'
  });


const base64Image=Buffer.from(data,'binary').toString('base64')
const resultImage=`data:image/png;base64,${base64Image}`


const updatedUser= await userModel.findByIdAndUpdate(
  userId,
  { $inc: { creditBalance: -1 } },
  { new: true }
);
 


return res.json({
  success:true,
  message:"Image Generated Successfully",
  creditBalance:updatedUser.creditBalance,
  resultImage
});

} catch(error){
  console.log(error.message)
  return res.json({success:false, message:error.message})
}


};