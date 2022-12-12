import "./styles.scss";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { TextField } from "@mui/material";
import axios from 'axios';
import { useEffect, useState } from "react";
interface IDetails{


    condition: {
      text:string;
      icon:string
    },
    last_updated: string;
    humidity:string;
    feelslike_c:string;
    feelslike_f:string;

  
  

}
interface ILocation{

    country:string;
    region:string;
    tz_id:string;
  
}



export const Weather: React.FC = () => {

  let date = new Date().toString();
    const [data , setData] =useState<IDetails >();
    const [location , setLocation]=useState<ILocation>();


// useEffect(()=>{navigator.geolocation.getCurrentPosition((position)=>{setLat(position.coords.latitude as unknown as ILocation) ; setLong(position.coords.longitude as unknown as ILocation)
//     const getData=()=>{
//      axios.get(`http://api.weatherapi.com/v1/current.json?key=690a103c6fde42f7b49100151220912&q=Tamil Nadu&aqi=no`).then((response)=>{setData(response.data.data)})
    
//     }
//     getData()
// })},[lat  , long])



useEffect(()=>{
  const  getData=async()=>{
   
   const response = await axios.get(
    `http://api.weatherapi.com/v1/current.json?key=690a103c6fde42f7b49100151220912&q=Tamil Nadu&aqi=no`);
    const data = response.data;
    setLocation(data.location)
    setData(data.current)
   }
   getData()
},[])



  return (
    <div className="weather">
      <div className="border">
        <div className="search-location">
          <div>
            {" "}
            <TextField
              type="text"
              sx={{}}
              size="small"
              placeholder="search..."
            />
          </div>
          <div className="icons">
            <AddLocationIcon style={{height:"50px"}} />
          </div>
          <div className="temp-far">C | F</div>
        </div>
        <div className="date-time">
            {date}


        </div>

        <div>
{
  data ? (
    <div> <div>Temperature :{data.feelslike_c}</div>
   <div>text:{data.condition.text}</div>
 
   <div><img src={`https:${data.condition.icon}`} alt={data.condition.text} /></div>
   <div>{data.condition.icon} </div>
    <div>humidity:{data.humidity}</div>
    <div>Last Updated : {data.last_updated}</div>
    
    </div>

  ) : null
}
{
  location ? (
    <div> <div>Temperature :{location.country}</div>
   
    
    </div>

  ) : null
}
        </div>
      </div>
    </div>
  );
};
