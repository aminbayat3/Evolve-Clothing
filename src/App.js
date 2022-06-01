import { Routes, Route } from "react-router-dom";

import Navigation from './routes/navigation/navigation.component';
import HomePage from "./routes/homepage/homepage.component";
import Authentication from "./routes/authentication/authentication.component";

import "./App.scss";

const Shop = () => {
  return(
    <div>
      <h1> Shop page</h1>
    </div>
  )
}

const App = () => {
  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
