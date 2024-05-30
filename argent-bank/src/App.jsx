import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
const App = () => {
  return (
    <BrowserRouter>  
      <Header /> 
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<SignIn/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;