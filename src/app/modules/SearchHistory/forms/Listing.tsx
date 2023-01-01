import React, { useEffect, useState } from "react";
import { IListingState } from "../SearchHistory.interfaces";
 
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

  useEffect(() => {
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
