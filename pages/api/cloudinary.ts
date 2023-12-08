import { NextApiRequest, NextApiResponse } from 'next';
import {v2 as cloudinary} from 'cloudinary';


// Load Cloudinary credentials from environment variables
const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

// Configure Cloudinary with environment variables
cloudinary.config(cloudinaryConfig);

export default async function handler(req:any, res:any) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const file = req.files?.image;

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Upload the file to Cloudinary
    const cloudinaryUploadResult = await cloudinary.uploader.upload(file.path, {
      folder: 'Dishes', // Specify the folder in Cloudinary where you want to store the file
      // Add any additional Cloudinary options as needed
    });

    // Return the Cloudinary upload result
    res.status(200).json(cloudinaryUploadResult);
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
