import React from 'react';
import {  useGetSongsBySearchQuery } from '../redux/services/shazamCore';
import  Loader  from '../components/Loader';
import Error from '../components/Error';
import { SongCard } from '../components';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';



const Search = () => {
    const {searchTerm} = useParams(); 
    const {isPlaying, activeSong} = useSelector(state => state.player)
    const {data, isFetching, error} = useGetSongsBySearchQuery(searchTerm)

    const songs = data?.tracks?.hits?.map((song) => song.track)

    if(isFetching) return <Loader title="Loading Songs Around You ..." />

    if(error) return <Error />

    return (
    <div className='flex flex-col'>
        <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
           Showing the results for: <span className='font-black'> {searchTerm} </span>
        </h2>
        <div className='flex flex-wrap justify-center gap-8
        sm:justify-start '>
            {songs?.map((song, idx)=> (
                <SongCard 
                    key={song.key}
                    song={song}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={data}
                    i={idx}
                />
            ))}
        </div>

    </div>);

}


export default Search;
