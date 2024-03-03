import { Provider } from "react-redux";
import { store } from "./store";
import { Main } from "./component/main";
import "./App.css";

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);
export default App;
