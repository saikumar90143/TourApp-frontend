
import './App.css';

import {ToastContainer}from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Routes,Route} from 'react-router-dom';
import Home from './pages/home/Home';



import Auth from './components/Auth';
import Header from './components/Header/Header';
import AddTour from './pages/AddTour';
import SingleTour from './pages/SingleTour';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/manageRoutes/PrivateRoute';
import Notfound from './components/Error/Notfound';
import TagTours from './pages/TagTours';



function App() {
    
  return (
    <>
    <div className="App">
            <Header/>
           <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/search/' element={<Home/>}></Route>
            <Route path='/tag/:tag' element={<TagTours/>}></Route>
           
            <Route path='/signup' element={<Auth/>}></Route>
            <Route path='/addtour' element={<PrivateRoute><AddTour/></PrivateRoute>}></Route>
            <Route path='/edittour/:id' element={<AddTour/>}></Route>
            <Route path='/tour/:id' element={<SingleTour/>}></Route>
            <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}></Route>
            <Route path='*' element={<Notfound/>}></Route>
           </Routes>
        
        <ToastContainer/>
    </div>

    
    </>
  );
}

export default App;
