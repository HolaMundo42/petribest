/*import { NextResponse } from "next/server"

import  axios  from 'axios';
const https = require('https'); // Import the 'https' module

type Props = {
  params: {
      image_url: string
  }
} 

export async function GET(req: Request) {
  const header = 
  {
    'Content-Type': 'application/json'
  }

  const body = 
  {
    'image_url': 'https://res.cloudinary.com/dso4vg1hw/image/upload/f_auto,q_auto/fknm0eyvz0lzhrrykdwy'
  }

  let response = await axios.post('https://petrilabapi.onrender.com/process_image/',body, header, 
      {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  });
  
    console.log(response.value);
  }
*/