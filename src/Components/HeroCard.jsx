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
import { useEffect, useMemo } from 'react';
import { setHeroCity } from '../utils/Funcs';
import { Stack } from '@mui/material';

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


    // b
    const isCurrentCityFavorite = useMemo(() => Boolean((favorites || []).find(fav => fav.key === city.key)), [favorites, city]);

    // you Dont need this
    useEffect(() => {
        setHeroCity({ label: "Tel Aviv - Israel", key: '215854' }, dispatch);
        // isFavoriteLocal(key);
    }, [dispatch])


    return (
        <StyledHeroCard p={24} sx={{
            maxWidth: 1200,
            width: '100%',
            backgroundImage: "url('./src/assets/png/clouds_img.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: '120%',
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
                        //src="../src/assets/svg/a_1_sunny.svg"
                        src={`https://www.accuweather.com/images/weathericons/${icon}.svg`}

                    />
                </Stack>
                <Typography gutterBottom variant="h4" component="div" justifySelf="center">
                    {sky}
                </Typography>
            </CardContent>
            <CardActions>
                {isCurrentCityFavorite ?
                    <IconButton sx={{fontSize: '3.5rem'}} aria-label="Favorites" onClick={() => dispatch(removeFromFavorites(key))}> <FavoriteIcon fontSize='1rem'/> </IconButton>
                    : <IconButton sx={{fontSize: '3.5rem'}} aria-label="Favorites" onClick={() => dispatch(addToFavorites(city))} ><FavoriteBorderIcon fontSize='1rem'/></IconButton>}
            </CardActions>
        </StyledHeroCard>
    )
};

export default HeroCard;