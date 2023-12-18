import ReactDOM from 'react-dom/client'
import MainPage from './Pages/MainPage.jsx'
import FavoritesPage from './Pages/FavoritesPage.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/favorites",
    element: <>
      <FavoritesPage />
    </>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer/>
  </Provider>
)
