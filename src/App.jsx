import './App.css'
import Header from './Components/Header';
import CitySearch from './Components/Search';
import HeroCard from './Components/HeroCard';
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
        <HeroCard></HeroCard>
        <Forecast></Forecast>
      </ThemeProvider>
    </>
  )
}

export default App
