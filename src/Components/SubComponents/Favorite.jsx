
import { Card, CardActions, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/Slices/FavoritesSlice';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { setHeroCity } from '../../utils/Funcs';



const StyledFavoriteCard = styled(Card)`
color: 'inherit'; 
text-decoration: 'inherit';
display: flex;
flex-direction: column;
justify-content: center;
justify-items: center;
text-align: center;
width: 18%;
    background-image: url('./src/assets/png/clouds_img_semi_trans.png');
    background-repeat: no-repeat;
    background-size: 250%;
    background-position: center;

@media screen and (max-width: 1024px)
{
    width: 49%;
}
.MuiCardMedia-img{
    display:inline;
    width: auto;
}
.MuiCardActions-root{
    justify-content: center;
    width: 100%;
}
.MuiPaper-root{
width: 100%;
opacity: 0.9;
}
`

const Favorite = (city) => {

    const dispatch = useDispatch();
    const temperatureFormat = useSelector(state => state.tempType.value);
    const favorites = useSelector(state => state.favorites);
    const theme = useSelector(state => state.theme.value);
    const { name, tempC, tempF, sky, icon, key } = city.city;

    const isFavorite = useMemo(() => Boolean((favorites || []).find(fav => fav.key === key)), [favorites, key]);

    let navigate = useNavigate();

    const handleClick = async () => {
        await setHeroCity({ label: name, key: key }, dispatch, theme);
        navigate("/");
    }

    return (

        <StyledFavoriteCard id={`forecast${city.id}`}>

            <CardContent onClick={handleClick}>
                <Typography gutterBottom variant="h6" color="text.secondary">
                    {name}
                </Typography>
                <Typography gutterBottom variant="h4" component="div" justifySelf="center">
                    {temperatureFormat == "Celsius" ? tempC : tempF}°
                </Typography>
                <CardMedia
                    component="img"
                    alt="forecast icon"
                    height="100"
                    src={`https://www.accuweather.com/images/weathericons/${icon}.svg`}
                />
                <Typography variant="h5" component="div" justifySelf="center">
                    {sky}
                </Typography>
            </CardContent>
            <CardActions>
                {isFavorite ?
                    <IconButton aria-label="Favorites" onClick={() => dispatch(removeFromFavorites(key))}> <FavoriteIcon sx={{ color: 'rgba(180,0,0,0.7)' }} /> </IconButton>
                    : <IconButton aria-label="Favorites" onClick={() => dispatch(addToFavorites(key, city, theme))} ><FavoriteBorderIcon /></IconButton>}
            </CardActions>
        </StyledFavoriteCard>
    )

};



export default Favorite;