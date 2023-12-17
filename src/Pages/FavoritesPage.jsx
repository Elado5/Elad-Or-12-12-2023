import Favorites from "../Components/Favorites";
import Header from "../Components/Header";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector } from "react-redux";

const FavoritesPage = () => {
    const mode = useSelector(state => state.theme.value);

    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <Header />
            <Favorites />
        </ThemeProvider>
    )
}

export default FavoritesPage;