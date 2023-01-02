import { ILandingState } from "@src/MicrositeWeather.interface";
import SearchHistoryModule from "@src/app/modules/SearchHistory/SearchHistory.module";
import TodaysWeatherModule from "@src/app/modules/TodaysWeather/TodaysWeather.module";
import { useState } from "react";
 
function Landing() {
  const [landingState, setLandingState] = useState<ILandingState>({} as ILandingState);
  return (
    <div className="main-flexbox vertical">
      <TodaysWeatherModule landingState={landingState} setLandingState={setLandingState} />
      <SearchHistoryModule landingState={landingState} setLandingState={setLandingState} />
    </div>
  );
}

export default Landing;