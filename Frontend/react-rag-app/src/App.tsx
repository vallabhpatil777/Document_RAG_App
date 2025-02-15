import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Application from "./Components/Application";

const App: React.FC = () => (
  <Provider store={store}>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      <Application />
    </div>
  </Provider>
);

export default App;
