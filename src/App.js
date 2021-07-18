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
import NewsList from './pages/news/NewsList';
import CreateNews from './pages/news/CreateNews';
import EditNews from './pages/news/EditNews';
import UploadPage from './pages/UploadPage';
import { ToastProvider } from 'react-toast-notifications';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MemberPage from './pages/MemberPage';
import PrivateRoute from './guard/auth';
import UserStoreProvider from './context/UserStoreContext';

// redux setup
import { Provider } from 'react-redux';
import CartPage from './pages/CartPage';
import configureStore from './redux/configureStore';
import PdfReport from './pages/report/PdfReport';

//const store = createStore(rootReducer);
const { store } = configureStore();

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
    <Provider store={store}>
      <UserStoreProvider>
        <ToastProvider autoDismiss autoDismissTimeout={3000}>
          <QueryClientProvider client={queryClient}>
            <Router>
              <div style={{ paddingBottom: '60px' }}>
                <NavBar />
                <Switch>
                  <Route path="/about" component={AboutPage} />
                  <Route path="/product" component={ProductPage} />
                  <Route
                    path="/detail/:id/title/:title"
                    component={DetailPage}
                  />
                  <Route path="/hospital" component={HospitalPage} />
                  <Route path="/news/create" component={CreateNews} />
                  <Route path="/news/edit/:id" component={EditNews} />
                  <Route path="/news" component={NewsList} />

                  {/*<Route
                path="/news"
                render={({ match: { url } }) => (
                  <>
                    <Route exact path={`${url}/`} component={NewsList} />
                    <Route path={`${url}/edit/:id`} component={EditNews} />
                    <Route path={`${url}/create`} component={CreateNews} />
                  </>
                )}
              />*/}
                  <Route path="/upload" component={UploadPage} />
                  <Route path="/register" component={RegisterPage} />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/upload" component={UploadPage} />
                  <Route path="/pdf" component={PdfReport} />

                  <PrivateRoute path="/member">
                    <MemberPage />
                  </PrivateRoute>
                  <Route path="/cart" component={CartPage} />
                  <Route exact path="/" component={HomePage} />
                </Switch>
                <Footer />
              </div>
            </Router>
          </QueryClientProvider>
        </ToastProvider>
      </UserStoreProvider>
    </Provider>
  );
}

export default App;
