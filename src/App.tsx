import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Navigation } from "./navigation/Navigation";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </>
  );
};
