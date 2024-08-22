import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Views/Home';
import Result from './Components/SearchResult';
import DetailScreen from './Views/DetailScreen';
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
