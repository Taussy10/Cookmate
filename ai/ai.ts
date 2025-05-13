import OpenAI from 'openai';
// import Axios from "axios"
// const axios = require('axios');
import axios from "axios"
import { Keys } from '~/key';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
});

// always use try catch with function(For catching error in case it occurs)
// use arrow function just convention

export const Model = async (prompt:any) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      // model: "google/gemini-2.0-flash-thinking-exp-1219:free",
      // model:"mistralai/mistral-small-3.1-24b-instruct:free",
      messages: [{ role: 'user', content: prompt}],
      // response_format: {"type":"json_object"}
    });

    // console.log("AI result from ai.ts :", completion.choices[0].message.content);
    // If you call this funciton in diffrent file and store it in variable 
    // then for storing it's content you have to return something in funciton 
    //  that you want to store  
    console.log("result of AI from ait.ts :",completion.choices[0].message.content);
    
    return completion.choices[0].message.content
    // completion.choices[0].message.content
  } catch (error) {
    console.log('Error from ai.ts', error);
  }
};
 

const BASE_URL='https://aigurulab.tech';

// export const generateAiImage = async(imagePrompt:string) => {
// // export const generateAiImage = async() => {
//   try {
//     const result = await axios.post(`${BASE_URL}/api/generate-image`,
//       {
//           width: 1024,
//           height: 1024,
//           input: imagePrompt,
//           model: 'sdxl',//'flux'
//           aspectRatio:"1:1"//Applicable to Flux model only
//       },{
//           headers: {
//             // In this process method doesn't work maybe due to this AI doesn't work Nodejs 
//               // 'x-api-key': process.env.EXPO_PUBLIC_AIGURULAB_API_KEY, // Your API Key
//               // if you commit then remove it then commit 
//               'x-api-key': Keys.AIGURULAB_API_KEY, // Your API Key
//               'Content-Type': 'application/json', // Content Type
//           },
//       })
//       console.log("outpput result of image from ai.ts :" ,result.data.image) //Output Result: Base 64 Image   
//       return result.data.image
//       // .image
//   } catch (error) {
//     console.log("Error from generateImage", error);
//     throw new Error("Error while generating images")
    
//   }
 
// }


export const generateAiImage = async(imagePrompt:string) => {
// export const generateAiImage = async() => {
  try {
    const result = await console.log("Hello")
    
      // console.log("outpput result of image from ai.ts :" ,result.data.image) //Output Result: Base 64 Image   
      // return result.data.image
      // .image
  } catch (error) {
    console.log("Error from generateImage", error);
    throw new Error("Error while generating images")
    
  }
 
}
