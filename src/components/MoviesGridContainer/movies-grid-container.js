import MovieCard from "../MovieCard/movie-card";
import styled from "styled-components";

const Container = styled.div`
display: grid;
grid-template-columns:repeat(auto-fill ,minmax(190px,1fr));
justify-items: center;
gap:2rem;
width:100%;
background:black; 
overflow: hidden;
min-width:0;

@media screen and (max-width:800px){
    gap:1rem;
}

@media screen and (max-width:665px){
    grid-template-columns: repeat(auto-fit ,minmax(150px,1fr));
}

@media screen and (max-width:390px){
    grid-template-columns:repeat(2 ,1fr);
}
`

function MoviesGridContainer({movies,isLoading}){
    if (isLoading) 
    return (
        <Container>
            {Array.from({length:13}).map((_, index)=>(
                <MovieCard key={index} isLoading={true} />
            ))}
        </Container>
    )

    if (movies.length === 0)
    return(
        <div style={{width:'100%', textAlign:"center",color:"white",fontSize:"2rem"}}>No Movies available</div>
    )
    
    return (
        <Container>
            {movies && movies.length >= 1 && movies.map((movie,index)=>(
                <MovieCard key={movie?.id || index} style={{minWidth:"min(200px, 18%)"}} movie={movie}/>
            ))}
        </Container>
    )
}
export default MoviesGridContainer;