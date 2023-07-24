import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseURL = "https://image.tmdb.org/t/p/original";

function Row(props) {
    const [movies, setMovies] = useState([]);
    const [trailerURL, setTrailerURL] = useState("");
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(props.fetchURL);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [props.fetchURL]);

    function handleClick(movie) {
        if(trailerURL){
            setTrailerURL("");
        } else{
            movieTrailer(movie?.name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerURL(urlParams.get('v'));
            }).catch((err)=>{
                console.log(err);
            });
        }
    }

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        }
    };
    return (<div className="row">
        <h2>{props.title}</h2>
        <div className="row_posters">
            {movies.map((movie) => {
                return <img
                    onClick={() => handleClick(movie)}
                    className={"row_poster " + (props.isLargeRow ? "row_posterLarge" : "")}
                    key={movie.id}
                    src={baseURL + (props.isLargeRow ? movie.poster_path : movie.backdrop_path)} 
                    alt={movie.name}
                     />;
            })}
        </div>
        {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}
    </div>);
}

export default Row;