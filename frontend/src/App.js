import logo from './logo.svg';
import './App.css';
import HomePage from './Page/HomePage';
import { Route,Routes,Link } from 'react-router-dom';
import Register from './Page/Register';
import Login from './Page/Login';
import CreateBlogPage from './Page/Createblog';


function App(props) {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />} />
      <Route path='/createblog' element={<CreateBlogPage />} />
    </Routes>
  );
}

export default App;
