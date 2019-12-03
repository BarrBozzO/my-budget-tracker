import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import rootSaga from "./sagas";
import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["auth", "modal"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware, logger)
);
export const persistor = persistStore(store);

// start saga
sagaMiddleware.run(rootSaga);

export default store;
