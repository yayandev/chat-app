import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./components/Home";
import Error from "./components/Error";
import Login from "./components/Login";
import Regis from "./components/Regis";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Error/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/regis" element={<Regis/>}/>
      </Routes>
    </Router>
  );
}

export default App;
