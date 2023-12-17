
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import Favorite from './SubComponents/Favorite.jsx';

const CardGroup = styled.div`
display: flex;
flex-wrap: wrap;
flex-direction: row;
justify-content: space-around;
margin-top: 2.5%;
gap: 5px;
@media screen and (max-width: 1024px)
{
    #forecast4{
        width: 99%;
    }
}
`
const Favorites = () => {

    const favorites = useSelector(state => state.favorites);

    return (
        <CardGroup>
            {
                favorites?.map((data, index) => {
                    console.log('index', index)
                    return (
                        <Favorite city={data} id={index} key={data.key}/>
                    )
                })
            }
        </CardGroup>)
};



export default Favorites;