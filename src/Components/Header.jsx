import { AppBar, Toolbar, Typography, Stack, Button, Icon, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Home } from '@mui/icons-material';
import ThemeSlider from './SubComponents/ThemeSlider';
import { useSelector, useDispatch } from 'react-redux';
import { switchTempType } from '../redux/Slices/TempTypeSlice';
import styled from '@emotion/styled';


const Header = () => {

    const HeaderStyle = styled.div`
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

    console.log('temperatureFormat =>', temperatureFormat);

    return (
        <HeaderStyle>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton size="medium" edge="start" color="inherit" aria-label="logo">
                    <WbSunnyOutlined />
                </IconButton> */}
                    <img type="image/svg+xml" src="../src/assets/svg/b_1_partly_cloudy.svg" width="50px" height="50px"></img>
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                        Abra Weather
                    </Typography>
                    <Stack direction='row' spacing={1}>
                        <Button aria-label="Home Page" color={'inherit'}><Home /></Button>
                        <Button aria-label="Favorites" color={'inherit'}><FavoriteIcon /></Button>
                        <Button aria-label="Temperature Format" color={'inherit'} onClick={() => dispatch(switchTempType())}>{temperatureFormat == "Celsius" ? "C" : "F"}</Button>
                        <ThemeSlider />
                    </Stack>
                </Toolbar>
            </AppBar>
        </HeaderStyle>
    )
};

export default Header;