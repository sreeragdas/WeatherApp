import "./styles.scss";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";

interface IDetails {
  condition: {
    text: string;
    icon: string;
  };
  last_updated: string;
  humidity: string;
  feelslike_c: string;
  feelslike_f: string;
  pressure_in: string;
  wind_dir: string;
  wind_degree: string;
  wind_kph: string;
}
interface ILocation {
  country: string;
  region: string;
  tz_id: string;
}

export const Weather: React.FC = () => {
  const [data, setData] = useState<IDetails>();
  const [location, setLocation] = useState<ILocation>();
  const [text, setText] = useState<string>("Tamil Nadu");
  const [converter , setConverter]=useState(false)

  // useEffect(()=>{navigator.geolocation.getCurrentPosition((position)=>{setLat(position.coords.latitude as unknown as ILocation) ; setLong(position.coords.longitude as unknown as ILocation)
  //     const getData=()=>{
  //      axios.get(`http://api.weatherapi.com/v1/current.json?key=690a103c6fde42f7b49100151220912&q=Tamil Nadu&aqi=no`).then((response)=>{setData(response.data.data)})

  //     }
  //     getData()
  // })},[lat  , long])

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=690a103c6fde42f7b49100151220912&q=${text}&aqi=no`
      );
      const data = response.data;
      setLocation(data.location);
      setData(data.current);
    };
    getData();
  }, [text]);

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
              name="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="paper-style">
          <Paper elevation={5}>
            {data ? (
              <div className="weather-details">
                <div className="location">
                  <div>
                    <AddLocationIcon
                      style={{ height: "50px", marginTop: "-17px" }}
                    />
                  </div>
                  <div className="country">{location?.country},</div>
                  <div>{location?.region}</div>
                </div>
                <div className="converted">
                  <div className="converter" onClick={(e)=>{setConverter(false)}}>C </div>
                  <div> |</div>
                  <div className="converter" onClick={(e)=>{setConverter(true)}}>F</div>

                </div>
                <div className="temp">{ !converter ? data.feelslike_c : data.feelslike_f}</div>
                <div style={{ textAlign: "center" }}>{data.condition.text}</div>
                <div className="img">
                  <img
                    style={{ height: "100px" }}
                    src={`https:${data.condition.icon}`}
                    alt={data.condition.text}
                  />
                </div>

                <div className="atmosphere-details">
                  <div className="sub-details">
                    <div>{data.humidity}</div>
                    <div className="title">Humidity</div>
                  </div>
                  <div>
                    <div>{data.wind_dir}</div>
                    <div className="title">Wind Direction</div>
                  </div>
                  <div>
                    <div>{data.wind_degree}</div>
                    <div className="title">Wind Degree</div>
                  </div>
                </div>
              </div>
            ) : null}
          </Paper>
        </div>
      </div>
    </div>
  );
};
