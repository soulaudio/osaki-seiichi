import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import NotFound from "./pages/not-found";
import SunkenCityDetail from "./pages/sunken-city/sunken-city-detail";
import LostBookDetail from "./pages/lost-book/lost-book-detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sunken-city" element={<SunkenCityDetail />} />
        <Route path="/lost-book" element={<LostBookDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
