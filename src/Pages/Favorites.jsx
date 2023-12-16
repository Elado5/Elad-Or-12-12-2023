
import { Card, CardActions, CardContent, CardMedia,Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

const Favorites = () => {

    const temperatureFormat = useSelector(state => state.tempType.value);
    const favorites = useSelector(state => state.city.favorites);

    const CardGroup = styled.div`
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        margin-top: 2.5%;
        @media screen and (max-width: 1024px)
        {
            #favorite4{
                width: 100% !important;
                color:red;
            }
        }
    `
    const CardStyle = styled.div`
        display: flex;
        justify-content: center;
        justify-items: center;
        text-align: center;
        width: 20%;

        @media screen and (max-width: 1024px)
        {
            width: 50%;
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
    return (
        <CardGroup>
            {
                favorites.map((item, key) => {
                    return (
                        <CardStyle key={key} id={`favorite${key}`}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h3" color="text.secondary">
                                        {item.name}
                                    </Typography>
                                    <Typography gutterBottom variant="h3" component="div" justifySelf="center">
                                        {temperatureFormat == "Celsius" ? item.tempC : item.tempF}°
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        alt="forecast icon"
                                        height="150"
                                        //src="../src/assets/svg/a_1_sunny.svg"
                                        src={`https://www.accuweather.com/images/weathericons/${item.icon}.svg`}

                                    />
                                    <Typography gutterBottom variant="h4" component="div" justifySelf="center">
                                        {item.sky}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <IconButton aria-label="Favorites" >{<FavoriteIcon />}</IconButton>
                                </CardActions>
                            </Card>
                        </CardStyle>
                    )
                })
            }
        </CardGroup>)
};

export default Favorites;