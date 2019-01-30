import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configure from "store/configure";
import AppContainer from "./containers/AppContainer";


// Appcontianer로 바꿔서 헤더 하려 했는데 흠 잘안됨 여기서 부터 봐라

const Root = () => {
  const store = configure();
  return (
    <Provider store={store}>
      <BrowserRouter>        
        <AppContainer />                
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
