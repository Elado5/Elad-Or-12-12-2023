import ReactDOM from 'react-dom/client'
import MainPage from './Pages/MainPage.jsx'
import FavoritesPage from './Pages/FavoritesPage.jsx';
import './index.css'
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
  </Provider>
)
