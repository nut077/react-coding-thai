import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Switch from 'react-bootstrap/Switch';
import AboutPage from './pages/AboutPage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/about" component={AboutPage} />
        <Route path="/product" component={ProductPage} />
        <Route exact path="/" component={HomePage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
