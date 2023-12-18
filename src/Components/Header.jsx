import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Home } from '@mui/icons-material';
import ThemeSlider from './SubComponents/ThemeSlider';
import { useSelector, useDispatch } from 'react-redux';
import { switchTempType } from '../redux/Slices/TempTypeSlice';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';


const Header = () => {

    const HeaderStyle = styled.div`
        opacity: 0.95;
        .MuiStack-root{
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
        @media screen and (max-width: 1024px){
            .MuiToolbar-root{
                flex-direction: column;
            }
        }
    `

    const dispatch = useDispatch();
    const temperatureFormat = useSelector(state => state.tempType.value);

    let navigate = useNavigate();


    return (
        <HeaderStyle>
            <AppBar position="static">
                <Toolbar>
                    <img type="image/svg+xml" src="../src/assets/svg/b_1_partly_cloudy.svg" width="50px" height="50px"></img>
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                        Abra Weather
                    </Typography>
                    <Stack direction='row' spacing={1}>
                            <Button onClick={() => navigate("/")} aria-label="Home Page"  ><Home sx={{color:'white', width:'1em', height:'1em'}}/></Button>
                            <Button onClick={() => navigate("/favorites")} aria-label="Favorites" ><FavoriteIcon sx={{color:'white', width:'1em', height:'1em'}}/></Button>
                        <Button aria-label="Temperature Format" sx={{color:'white', fontSize:'1.25em'}} onClick={() => dispatch(switchTempType())}>{temperatureFormat == "Celsius" ? "C" : "F"}</Button>
                        <ThemeSlider />
                    </Stack>
                </Toolbar>
            </AppBar>
        </HeaderStyle>
    )
};

export default Header;