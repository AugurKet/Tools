import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// Replace with your Amadeus API credentials
const API_KEY = "YOUR_AMADEUS_API_KEY";
const API_SECRET = "YOUR_AMADEUS_API_SECRET";

let accessToken = null;

async function getToken(){

 const res = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token",{
  method:"POST",
  headers:{"Content-Type":"application/x-www-form-urlencoded"},
  body:`grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`
 });

 const data = await res.json();
 accessToken = data.access_token;

}

app.get("/search", async (req,res)=>{

 if(!accessToken){
  await getToken();
 }

 const origin=req.query.origin;
 const date=req.query.date;

 const url=`https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${origin}&departureDate=${date}`;

 const response=await fetch(url,{
  headers:{
   Authorization:`Bearer ${accessToken}`
  }
 });

 const data=await response.json();

 res.json(data);

});

app.listen(3000,()=>{
 console.log("Server running on http://localhost:3000");
});
