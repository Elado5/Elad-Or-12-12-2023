import './App.css'
import Header from './Components/Header';
import Search from './Components/Search';
import ChosenCity from './Components/ChosenCity';
import Forecast from './Components/Forecast';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

//! Make this a theme changable by global state update


function App () {

  const mode = useSelector(state => state.theme.value);

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Header></Header>
        <Search></Search>
        <ChosenCity></ChosenCity>
        <Forecast></Forecast>
      </ThemeProvider>
    </>
  )
}

export default App
