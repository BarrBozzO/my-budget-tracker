import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "assets/scss/index.scss";
import App from "./screens/App";
import * as serviceWorker from "./serviceWorker";
import store, { persistor } from "store/store";
import { ActionsProvider } from "actions";

ReactDOM.render(
  <Provider store={store}>
    <ActionsProvider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </ActionsProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
