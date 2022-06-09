import { Routes, Route } from "react-router-dom";

import Navigation from './routes/navigation/navigation.component';
import HomePage from "./routes/homepage/homepage.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from './routes/shop/shop.component';
import CheckoutPage from './routes/checkout/checkout.component';

import "./App.scss";

const App = () => {
  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
