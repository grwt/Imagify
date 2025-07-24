import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";

export const generateImage = async (req, res) => {
  try {
    const userId = req.user.id;
    const prompt = req.body.prompt;

    if (!userId || !prompt) {
      return res.status(400).json({ success: false, message: "Missing user ID or prompt" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    if (user.creditBalance <= 0) {
      return res.status(403).json({
        success: false,
        message: "Insufficient credits",
        creditBalance: user.creditBalance
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
          ...formData.getHeaders()
        },
        responseType: "arraybuffer"
      }
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $inc: { creditBalance: -1 } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Image Generated Successfully",
      creditBalance: updatedUser.creditBalance,
      resultImage
    });
  } catch (error) {
    console.error("Generate Image Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
