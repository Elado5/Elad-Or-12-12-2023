import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styled from '@emotion/styled'
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/Slices/FavoritesSlice';
import { useEffect, useMemo, useCallback } from 'react';
import { setHeroCity } from '../utils/Funcs';
import { errorToast, infoToast } from '../utils/Toasts';
import { Stack } from '@mui/material';
import { getGeopositionResults } from '../services/api';
import 'react-toastify/dist/ReactToastify.css';

const StyledHeroCardContainer = styled.div`
    display: flex;
    justify-content: center;
    alignItems: center;
    `

const StyledHeroCard = styled(Card)`
display: flex;
flex-direction: column;
justify-content: center;
justify-items: center;
text-align: center;
width: 100%;

.MuiCardMedia-img{
        object-fit: fill;
        display:inline;
    }
    
.MuiCardActions-root{
        justify-content: center;
        width: 100%;
    }
.MuiCard-Root{
        width: 100%;
    }`

const HeroCard = () => {

    const dispatch = useDispatch();
    const city = useSelector(state => state.city);
    const { name, key, tempF, tempC, sky, icon } = city;
    const favorites = useSelector(state => state.favorites);
    const temperatureFormat = useSelector(state => state.tempType.value);
    const theme = useSelector(state => state.theme.value);

    const isCurrentCityFavorite = useMemo(() => Boolean((favorites || []).find(fav => fav.key === city.key)), [favorites, city]);

    const getUserGeolocation = useCallback(() => {
        if (navigator.geolocation) {
            // what to do if geolocation is supported
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    infoToast("Getting weather for you location...", theme)
                    const { latitude, longitude } = position.coords;
                    let q = ({ latitude, longitude });
                    let results = await getGeopositionResults(q);
                    let userGeolocation = results.data;
                    setHeroCity({ label: userGeolocation.EnglishName, key: userGeolocation.Key }, dispatch, theme)
                },
                (error) => {
                    errorToast("Error getting user location: " + error.message, theme)
                }
            )
        }
        else {
            errorToast('Geolocation is not supported by this browser', theme);
        }
    }, [dispatch])

    useEffect(() => {
        //on load check if a city is currently set (by checking key)
        //so it doesn't override redirects from favorites
        if (key === '0') {
            setHeroCity({ label: "Tel Aviv - Israel", key: '215854' }, dispatch, theme);
            getUserGeolocation();
        }
    }, [])


    return (
        <StyledHeroCardContainer>
            <StyledHeroCard p={24} sx={{
                maxWidth: 1200,
                width: '100%',
                backgroundImage: "url('https://i.ibb.co/3hQsK0n/clouds-img-semi-trans.png')",
                backgroundRepeat: 'no-repeat',
                backgroundSize: '165%',
                backgroundPosition: 'center'
            }}>
                <CardContent>
                    <Typography variant="h3" color="text.secondary">
                        {name}
                    </Typography>
                    <Typography variant="h1" component="div" justifySelf="center">
                        {temperatureFormat == "Celsius" ? tempC : tempF}°
                    </Typography>
                    <Stack flex={1} alignItems={'flex-end'}>
                        <CardMedia
                            component="img"
                            alt="forecast icon"
                            height="100px"
                            width="50px"
                            sx={{ marginBottom: 0 }}
                            src={`https://www.accuweather.com/images/weathericons/${icon}.svg`}

                        />
                    </Stack>
                    <Typography gutterBottom variant="h4" component="div" justifySelf="center">
                        {sky}
                    </Typography>
                </CardContent>
                <CardActions>
                    {isCurrentCityFavorite ?
                        <IconButton aria-label="Favorites" onClick={() => dispatch(removeFromFavorites(key))}> <FavoriteIcon sx={{ color: 'rgba(180,0,0,0.7)', fontSize: '3.5rem' }} fontSize='1rem' /> </IconButton>
                        : <IconButton aria-label="Favorites" onClick={() => dispatch(addToFavorites(city, theme))} ><FavoriteBorderIcon sx={{ fontSize: '3.5rem' }} /></IconButton>}
                </CardActions>
            </StyledHeroCard>
        </StyledHeroCardContainer>
    )
};

export default HeroCard;