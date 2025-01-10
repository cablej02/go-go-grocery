import { Outlet } from 'react-router-dom';
import './app.css';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  return (
    <div className="app-container">
      <Header />
      <main className='main-content container mt-5'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
