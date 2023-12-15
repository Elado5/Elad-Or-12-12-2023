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
import { useEffect } from 'react';
import { LookupAndSetLocation } from './Search';



const ChosenCity = () => {

    const dispatch = useDispatch();
    const name = useSelector(state => state.city.name);
    const key = useSelector(state => state.city.key);
    const tempF = useSelector(state => state.city.tempF);
    const tempC = useSelector(state => state.city.tempC);
    const sky = useSelector(state => state.city.sky);
    const icon = useSelector(state => state.city.icon);
    const favorites = useSelector(state => state.city.favorites);
    const temperatureFormat = useSelector(state => state.tempType.value);

    const isFavorite = () => {
        let result = false;
        favorites.forEach(item => {
            if (item?.key == key) {
                result = true;
            }
        }
        );
        return result;
    }

    useEffect(() => {
        console.log('function set off');
        LookupAndSetLocation({ label: "Tel Aviv - Israel", key: '215854' }, dispatch);

    }, [])


    const CardStyle = styled.div`
    display: flex;
    justify-content: center;
    justify-items: center;
    text-align: center;
    width: 100%;
    .MuiCardMedia-img{
            object-fit: cover;
            display:inline;
            width: auto;
        }
        
    .MuiCardActions-root{
            justify-content: center;
            width: 100%;
        }
    .MuiCard-Root{
            width: 100%;
        }
    `

    return (
        <CardStyle>
            <Card sx={{ maxWidth: 1200, width: '100%' }}>
                <CardContent>
                    <Typography variant="h3" color="text.secondary">
                        {name}
                    </Typography>
                    <Typography gutterBottom variant="h3" component="div" justifySelf="center">
                        {temperatureFormat == "Celsius" ? tempC : tempF}°
                    </Typography>
                    <CardMedia
                        component="img"
                        alt="forecast icon"
                        height="150"
                        //src="../src/assets/svg/a_1_sunny.svg"
                        src={`https://www.accuweather.com/images/weathericons/${icon}.svg`}

                    />
                    <Typography gutterBottom variant="h4" component="div" justifySelf="center">
                        {sky}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="Favorites" >{isFavorite() ? <FavoriteIcon /> : <FavoriteBorderIcon />}</IconButton>
                </CardActions>
            </Card>
        </CardStyle>)
};

export default ChosenCity;