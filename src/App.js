import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductPage from './pages/ProductPage';
import TopBarProgress from 'react-topbar-progress-indicator';
import DetailPage from './pages/DetailPage';
import HospitalPage from './pages/hospital/HospitalPage';
import NewsPage from './pages/news/NewsPage';
import CreatePage from './pages/news/CreatePage';
import EditPage from './pages/news/EditPage';

TopBarProgress.config({
  barColors: {
    0: '#b5bcb4',
    '1.0': '#ffffff',
  },
  shadowBlur: 5,
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div style={{ paddingBottom: '60px' }}>
          <NavBar />
          <Switch>
            <Route path="/about" component={AboutPage} />
            <Route path="/product" component={ProductPage} />
            <Route path="/detail/:id/title/:title" component={DetailPage} />
            <Route path="/hospital" component={HospitalPage} />
            {/*<Route path="/news/create" component={CreatePage} />
            <Route path="/news/edit/:id" component={EditPage} />
            <Route path="/news" component={NewsPage} />*/}
            <Route
              path="/news"
              render={({ match: { url } }) => (
                <>
                  <Route exact path={`${url}/`} component={NewsPage} />
                  <Route path={`${url}/edit/:id`} component={EditPage} />
                  <Route path={`${url}/create`} component={CreatePage} />
                </>
              )}
            />
            <Route exact path="/" component={HomePage} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
