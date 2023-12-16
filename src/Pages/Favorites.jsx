
import { Card, CardActions, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { useEffect, useState, useMemo, useCallback } from 'react';


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

const Favorites = () => {

    const temperatureFormat = useSelector(state => state.tempType.value);
    const [favorites, setFavorites] = useState([]);

    //TODO useCallback
    const getFavorites = useCallback(() => {
        Object.keys(localStorage).forEach((key) => {
            let temp =[]
            temp[temp.length] = JSON.parse(localStorage.getItem(key));
        })
        setFavorites();
        console.log('favorites => ', favorites)
    }, [favorites])

    useEffect(() => {
        getFavorites()
    }, [])

    //TODO useMemo
    const isFavoriteLocal = (key) => {
        if (localStorage.getItem(key) !== null){
            let temp = favorites.filter((item) => item.key !== localStorage.getItem(key));
            setFavorites(temp)
            return true;
        }
        else {
            setCurrentlyFavorite(false);
            return false;
        }
    }

    const addToFavoritesLocal = (key, city) => {
        if(localStorage.length < 5){
            localStorage.setItem(key, JSON.stringify(city));
            setCurrentlyFavorite(true);
        }
        else{
            console.log('Max amount of favorites is 5');
        }
    }

    const removeFromFavoritesLocal = (key) => {
        localStorage.removeItem(key);
        setCurrentlyFavorite(false);
        console.log('localStorage.getItem(key)', localStorage.getItem(key));
    }


    console.log('favorites', favorites)
    return (
        <CardGroup><p>AYOOO</p>
            {
                favorites?.map((item, key) => {
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
                                        src={`https://www.accuweather.com/images/weathericons/${item.icon}.svg`}

                                    />
                                    <Typography gutterBottom variant="h4" component="div" justifySelf="center">
                                        {item.sky}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {currentlyFavorite ?
                                        <IconButton aria-label="Favorites" onClick={() => removeFromFavoritesLocal(item.key)}> <FavoriteIcon /> </IconButton>
                                        : <IconButton aria-label="Favorites" onClick={() => addToFavoritesLocal(item.key, item)} ><FavoriteBorderIcon /></IconButton>}
                                </CardActions>
                            </Card>
                        </CardStyle>
                    )
                })
            }
        </CardGroup>)
};

export default Favorites;