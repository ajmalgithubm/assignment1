import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import { Routes, Route} from 'react-router-dom';


function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
  );
}

export default App;
