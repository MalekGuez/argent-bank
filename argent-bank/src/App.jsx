import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
const App = () => {
  return (
    <BrowserRouter>  
      <Header /> 
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<SignIn/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;