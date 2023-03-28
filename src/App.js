import './App.css';
import { Route, Routes, NavLink } from 'react-router-dom';
import Home from './page/home';
import List from './page/list';
function App() {
  return (
    <div className="App">
      <div className='menu'>
        <div className='list'>
          <h3><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>쿠폰 발급</NavLink></h3>
          <h3 style={{ marginLeft: "60px" }}><NavLink to="/list" className={({ isActive }) => isActive ? "active" : ""}>발급 이력</NavLink></h3>
        </div>
      </div>
      <div className='bass'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/List" element={<List />} />
        </Routes>
      </div>
    </div>
  );
}


export default App;
