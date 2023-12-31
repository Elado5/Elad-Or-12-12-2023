import './MainPage.css'
import Header from '../Components/Header';
import CitySearch from '../Components/Search';
import HeroCard from '../Components/HeroCard';
import Forecast from '../Components/Forecast';
import { useSelector } from 'react-redux';

import { ThemeProvider, createTheme } from '@mui/material/styles';


function MainPage () {

  const mode = useSelector(state => state.theme.value);

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
    typography: {
      fontFamily: [
          'Roboto',
          'sans-serif',
          'Arial'
      ].join(','),
  }
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

export default MainPage
