import './css/Tailwind.css'
import './css/App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';


import Nav from './components/website/Nav';
import Footer from './components/website/Footer';

import Impressum from './pages/Impressum';

import UserContext from './components/UserContext';
import Spacegame from './components/game/Spacegame';



function App() {

  const [meta, setMeta] = useState({ endpoint: window.location.origin });

  return (

    <>
      <UserContext.Provider value={{ meta, setMeta }}>

        <Router basename="/spacegame">

          <Nav />

          <div className="min-h-screen md:min-h-full">
            <Routes>
              <Route path='/' element={<Spacegame />} />
              <Route path='/impressum' element={<Impressum />} />
            </Routes>
          </div>

        </Router>

        <Footer />

      </UserContext.Provider>

    </>

  );

}

export default App;
