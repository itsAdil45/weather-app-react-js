import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Components/Home';
import Result from './Components/Result';
import DetailScreen from './Components/DetailScreen';
function App() {
  return (
    // <div className="App">
    //   <Home/>
    // </div>
    <Router>
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='result' element={<Result />}/>
          <Route path='detail' element={<DetailScreen />}/>
      </Routes>
    </Router>
  );
}

export default App;
