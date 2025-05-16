import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Routes from './routes/routes';

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <Routes/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
