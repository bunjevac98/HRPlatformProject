import "./App.css";
import NavBar from "./NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import configureValidations from "./Validation";
import routes from "./route-config";

//We have made our custom validation for uppercase here Validations global.d.ts wher we initialize module
configureValidations();

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="body">
        <Routes>
          {routes.map((route) => (
            <Route  key={route.path} path={route.path} element={<route.element/>}>
            </Route>
          ))}
        </Routes>
      </div>




    </BrowserRouter>
  );
}

export default App;
