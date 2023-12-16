import './App.css'
import Header from './Components/Header';
import CitySearch from './Components/Search';
import ChosenCity from './Components/ChosenCity';
import Forecast from './Components/Forecast';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

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
        <CitySearch></CitySearch>
        <ChosenCity></ChosenCity>
        <Forecast></Forecast>
      </ThemeProvider>
    </>
  )
}

export default App
