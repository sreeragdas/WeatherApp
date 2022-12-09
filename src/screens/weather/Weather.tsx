import "./styles.scss";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { TextField } from "@mui/material";
import axios from 'axios';
import { useEffect, useState } from "react";

interface IData{
  location :string,
  current:string
}

export const Weather: React.FC = () => {
  // const [lat ,setLat  ] = useState<ILocation>();
  // const [long , setLong]=useState<ILocation>()
  let date = new Date().toString();
    const [data , setData] =useState<any>([])
    console.log(data , 'datatatatat')
    // for (const k in data) {
    //   const v = data[k];
    //         console.log(v ,'itetetetetetetetetet')
    // }
   
   
// useEffect(()=>{navigator.geolocation.getCurrentPosition((position)=>{setLat(position.coords.latitude as unknown as ILocation) ; setLong(position.coords.longitude as unknown as ILocation)
//     const getData=()=>{
//      axios.get(`http://api.weatherapi.com/v1/current.json?key=690a103c6fde42f7b49100151220912&q=Tamil Nadu&aqi=no`).then((response)=>{setData(response.data)})
    
//     }
//     getData()
// })},[lat  , long])
useEffect(()=>{
  const getData=()=>{
    axios.get(`http://api.weatherapi.com/v1/current.json?key=690a103c6fde42f7b49100151220912&q=Tamil Nadu&aqi=no`).then((response)=>{setData(response.data)})
   
   }
   getData()
},[])

if(data) {
  console.log(data ,'datatatataat')
  console.log(data.location.name ,'dsgdscg')
}
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
      
     
        </div>
      </div>
    </div>
  );
};
