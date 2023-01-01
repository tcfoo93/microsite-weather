import SearchHistoryModule from "@src/app/modules/SearchHistory/SearchHistory.module";
import TodaysWeatherModule from "@src/app/modules/TodaysWeather/TodaysWeather.module";
import React from "react";
 
function Landing() {
  return (
    <div className="main-flexbox-full vertical">
      <TodaysWeatherModule/>
      <SearchHistoryModule/>
    </div>
  );
}

export default Landing;