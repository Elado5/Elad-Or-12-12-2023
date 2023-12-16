import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Favorites from './Pages/Favorites.jsx';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
//redux
import store from './redux/store.js'
import { Provider} from 'react-redux'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
]);

const router2 = createBrowserRouter([
  {
    path: "/favorites",
    element: <Favorites/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <RouterProvider router={router2} />
  </Provider>
)
