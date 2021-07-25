import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavBar, Footer } from './components';
import {
  HomePage,
  AboutPage,
  ProductPage,
  DetailPage,
  UploadPage,
  LoginPage,
  RegisterPage,
  MemberPage,
  CartPage,
} from './pages';
import TopBarProgress from 'react-topbar-progress-indicator';
import { HospitalPage } from './pages/hospital';
import { NewsList, CreateNews, EditNews } from './pages/news';
import { ToastProvider } from 'react-toast-notifications';
import PrivateRoute from './guard/auth';
import UserStoreProvider from './context/UserStoreContext';

// redux setup
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { PdfReport, ChartReport } from './pages/report';

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
                  <Route path="/chart" component={ChartReport} />

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
