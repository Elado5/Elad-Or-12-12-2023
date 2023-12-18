import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { convertToFahrenheit} from '../utils/GeneralFuncs';

const Forecast = () => {

    const temperatureFormat = useSelector(state => state.tempType.value);
    const forecast = useSelector(state => state.city.forecast);

    function getDayName (dateString, locale = 'en-US') {
        let date = new Date(dateString);
        return date.toLocaleDateString(locale, { weekday: 'long' });
    }

    const CardGroup = styled.div`
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        margin-top: 1.1%;
        justify-content: space-between;
        
        @media screen and (max-width: 1024px)
        {
            #forecast4{
                width: 100% !important;
            }
        }
    `
    const StyledForecastCard = styled(Card)`
        display: flex;
        justify-content: center;
        justify-items: center;
        text-align: center;
        width: 19.5%;

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
                forecast.map((item, key) => {
                    return ( 
                    <StyledForecastCard key={key} id={`forecast${key}`}>
                            <CardContent>
                                <Typography variant="h5" color="text.secondary">
                                    {getDayName(item?.Date)}
                                </Typography>
                                <Typography gutterBottom variant="h4" component="div" justifySelf="center">
                                    {temperatureFormat == "Celsius" ? `${item?.Temperature?.Minimum?.Value}°-${item?.Temperature?.Maximum?.Value}°`
                                    : `${convertToFahrenheit(item?.Temperature?.Minimum?.Value)}°-${convertToFahrenheit(item?.Temperature?.Maximum?.Value)}°`}
                                </Typography>
                                <CardMedia
                                    component="img"
                                    alt="forecast icon"
                                    height="150"
                                    //src="../src/assets/svg/a_1_sunny.svg"
                                    //TODO add day/night get icon from 'Day' propert or 'Night' propert of forecast
                                    src={`https://www.accuweather.com/images/weathericons/${item.Day.Icon}.svg`}
                                />
                                <Typography gutterBottom variant="h4" component="div" justifySelf="center">
                                    {item?.Day?.IconPhrase}
                                </Typography>
                            </CardContent>
                    </StyledForecastCard>
                    )
                })
            }
        </CardGroup>)
};

export default Forecast;