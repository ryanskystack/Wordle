import { Provider } from "react-redux";
import { store, persistGate } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Main } from "./component/main";
import "./App.css";

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistGate}>
      <Main />
    </PersistGate>
  </Provider>
);
export default App;
