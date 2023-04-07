import React, { useEffect, useState } from "react";
import { BiSearch, BiWind } from "react-icons/bi";
import { TiLocation } from "react-icons/ti";
import { TbTemperatureCelsius } from "react-icons/tb";
import { WiHumidity, WiBarometer } from "react-icons/wi";
import axios from "axios";
import { MagnifyingGlass } from "react-loader-spinner";

const Weather = () => {
  const [weatherinfo, setWeatherInfo] = useState(null);
  const [input, setInput] = useState("");
  const [datetime, setDateTime] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [errStrip, setErrorSripe] = useState(false);

  const fetchdata = async (cityname = "bhadrak") => {
    let apikey = "ba73afc5e719ded46f04d35ce014c003";

    try {
      setIsloading(true);
      let weatherdata = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}&units=metric`
      );
      
      setWeatherInfo({
        cityname: weatherdata.data.name,
        region: weatherdata.data.sys.country,
        temp: weatherdata.data.main.temp,
        humidity: weatherdata.data.main.humidity,
        pressure: weatherdata.data.main.pressure,
        wind: weatherdata.data.wind.speed,
        heading: weatherdata.data.weather[0].main,
        desc: weatherdata.data.weather[0].description,
        icon: weatherdata.data.weather[0].icon,
      });
      setIsloading(false);
    } catch (e) {
      console.log(e);
      setErrorSripe(true);
      setIsloading(false);
    }
  };
  const timeDateFunc = () => {
    const date = new Date();
    setDateTime({
      date: date.getUTCDate(),
      month: date.getUTCMonth(),
      year: date.getUTCFullYear(),
      minute: date.getMinutes(),
      hour: date.getHours(),
    });
  };

  useEffect(() => {
    fetchdata();
    timeDateFunc();
  }, []);

  const handleInput = (e) => {
    if (!input) return;
    fetchdata(input);
    timeDateFunc();
  };

  return (
    <>
      {/* error popup stripe */}
      <div
        className={` h-12  bg-red-300 rounded-lg ${
          errStrip ? "top-5" : "-top-20"
        }  duration-300 text-center absolute flex items-center justify-center shadow-xl p-3`}
      >
        Enter valid City Name
        <button
          className="px-2 py-1 ml-2 bg-red-400 rounded-md text-red-600 "
          onClick={() => setErrorSripe(false)}
        >
          OK
        </button>
      </div>

      {(weatherinfo && (
        <div className="flex items-center justify-center mx-4    rounded-xl   bg-purple-100 overflow-hidden shadow-xl shadow-purple-400 ">
          <div className="h-full w-full backdrop-blur-md bg-white/30 flex items-center flex-col px-4 rounded-xl">
            {/* loder */}
            {isLoading && (
              <div className="absolute top-48">
                <MagnifyingGlass
                  width="150"
                  glassColor="#c0efff"
                  color="#E162E7"
                />
              </div>
            )}

            <div className="py-4 font-bold flex items-center mt-4 text-2xl">
              <span className="text-blue-700 ">
                <TiLocation />
              </span>
              <span className="drop-shadow-lg ">{weatherinfo?.cityname}</span>
            </div>
            <div
              className="w-full mx-4  p-4 flex justify-between items-center
                bg-gradient-to-tl from-indigo-500 via-purple-500 to-pink-500 rounded-2xl
                shadow-lg shadow-purple-400 text-white  "
            >
              <div className="drop-shadow-lg">
                <div className="">
                  <img src={`https://openweathermap.org/img/wn/${weatherinfo.icon}@2x.png`} alt="" className="" />
                </div>
                <h2 className="mt-2 font-bold">{weatherinfo?.heading}</h2>
                <h2 className=" ">{weatherinfo?.desc}</h2>
              </div>
              <div className="font-bold sm:text-5xl text-4xl mr-4 drop-shadow-lgtext-slate-100">
                {weatherinfo?.temp}
                <div className="absolute text-[25px] right-6 top-[135px]">
                  <TbTemperatureCelsius />
                </div>
              </div>
            </div>
            <div className="w-full mx-4  rounded-2xl bg-white shadow-md my-8">
              <div className="flex justify-between p-4">
                <div className="left flex flex-col items-center justify-center">
                  <div className="font-bold text-3xl">
                    {`${
                      datetime.hour.toString().length < 2
                        ? "0" + datetime.hour
                        : datetime.hour
                    }:${
                      datetime.minute.toString().length < 2
                        ? "0" + datetime.minute
                        : datetime.minute
                    }`}
                    <div className="text-xl">
                      {datetime.hour >= 12 ? <div>PM</div> : <div>AM</div>}
                    </div>
                  </div>
                  <h3>{`${datetime.date}.${datetime.month}.${datetime.year}`}</h3>
                </div>

                <div className="right text-lg">
                  <div className="flex items-center">
                    <div>
                      <WiBarometer />
                    </div>
                    <span className="ml-2">{weatherinfo?.pressure}</span>
                  </div>
                  <div className="flex items-center">
                    <div>
                      <WiHumidity />
                    </div>
                    <span className="ml-2">{weatherinfo?.humidity}</span>
                  </div>
                  <div className="flex items-center">
                    <div>
                      <BiWind />
                    </div>
                    <span className="ml-2">{weatherinfo.wind}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* searchbar */}
            <div className="rounded-full flex bg-white px-1 mb-8 overflow-hidden items-center shadow-lg w-full ">
              <input
                type="text"
                className="py-2 outline-none mx-3 w-full placeholder:text-center text-center"
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter City Here"
                id="myinputId"
              />
              <div
                className=" rounded-full p-2 bg-purple-200 cursor-pointer active:scale-75 hover:bg-slate-500 hover:text-white"
                onClick={handleInput}
              >
                <BiSearch />
              </div>
            </div>
          </div>
        </div>
      )) || (
        <MagnifyingGlass width="150" glassColor="#c0efff" color="#E162E7" />
      )}
    </>
  );
};

export default Weather;