import React, { useLayoutEffect, useState } from "react";
import { IListingState } from "../SearchHistory.interfaces";
import ApiRequest from "@src/app/services/ApiRequest.service";
 
function Listing() {
  const [state, setState] = useState<IListingState>({
    loaded: false
  });

  const onPageLoad = async () => {
    setState({
      ...state,
      loaded: true
    });
  };

  useLayoutEffect(() => {
    onPageLoad();
  }, []);

  if (!state.loaded) {
    return null;
  }

  return (
    <React.Fragment>
    </React.Fragment>
  );
}

export default Listing;
