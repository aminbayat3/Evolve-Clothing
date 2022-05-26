import { Routes, Route } from "react-router-dom";

import Navigation from './routes/navigation/navigation.component';
import HomePage from "./routes/homepage/homepage.component";
import SignIn from "./routes/sign-in/sign-in.component";

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
          <Route path="signIn" element={<SignIn />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
