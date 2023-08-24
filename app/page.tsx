"use client"

import Input from "./components/Input"
import Current from "./components/Current";
import WeatherDetails from "./components/WeatherDetails";
import WeekForcast from "./components/WeekForcast";
import { useState } from "react";


function Home() {

  const[data,setData]= useState({
    current:{
      condition:{
          icon:"",
          text:"",
      },
      temp_c:0,
  },
  location:{
      name:"",
      region:"",
  }
  })

  const [details,setDetails]=useState({
    current:{
      wind_mph:0,
      humidity:0,
      wind_dir:"",
      pressure_mb:"",
      feelslike_c:"",
      vis_km:0,

  },
  forecast:{
      forecastday:[{
          astro:{
              sunrise:"",
              sunset:"",
          },
      },
    ],
  },

  })

  const [weatherData, setWeatherData] = useState({
    forecast: {
      forecastday: [],
    },
  });
  const [location,setLocation]=useState("")
  const [error,setError]=useState("")
  const url=`https://api.weatherapi.com/v1/forecast.json?key=96464713b01548d3b7e60320230208&q=${location}&days=7&aqi=yes&alerts=yes`
  const handleSearch= async(e:React.KeyboardEvent <HTMLInputElement>)=>{
 if(e.key==="Enter"){
  e.preventDefault()
  try{
    const response= await fetch(url)
    if(!response.ok){
      throw new Error()
    }
    const data= await response.json()
    setData(data)
    setWeatherData(data)
    setDetails(data)
    setLocation("")
    setError("")
    


  }catch(error){
    setError("City not found")

  }
 }
  }

  let content;
  if(data.location.name.length===0 && error===""){
    content=(
      <div className="text-white text-center h-screen mt-[5rem]">
        <h2 className="text-3xl font-bold mb-4 "> welcome to weather app</h2>
        <p className="text-xl"> Enter a city to get the weather</p>
      </div>
    )
  }else if(error!==""){
    content=(
      <div className="text-white text-center h-screen mt-[5rem]">
        <p className="text-3xl font-bold mb-4 ">City Not Found</p>
        <p className="text-xl"> Enter a Valid City</p>
      </div>
    )
  }else{
    
    content=(
      <>
      <div className="flex md:flex-row flex-col p-12 item-center justify-between">
      <Current data={data}/>
      <WeekForcast data={weatherData}/>

      </div>
      <div>
      <WeatherDetails data={details}/>
      </div>
      </>
     
    )
  }

  return (
    <div className="bg-cover bg-gradient-to-r from-blue-500 to-blue-300 h-fit">
      <div className="bg-white/25 w-ful rounder-lg flex flex-col h-fit ">
        {/* INPUT AND LOGO */}
        <div className="flex flex-col md:flex-row justify-between items-center p-12">
          <Input  handleSearch={handleSearch} setLocation={setLocation}/>
          <h1 className=" mb-8 md:mb-0 order-1  text-white py-2 px-4 rounded-xl italic font-bold"> Weather App.</h1>
        </div>
        {content}
      </div>
    </div>
  );
}

export default Home;
