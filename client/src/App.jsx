import './App.css';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <>
      <Navbar />
      <Outlet/>
    
      {/* The routing will be handled by createBrowserRouter in main.jsx */}
    </>
  );
}

export default App;
