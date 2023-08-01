import React from 'react';
import {  useGetTopChartsQuery } from '../redux/services/shazamCore';
import  Loader  from '../components/Loader';
import Error from '../components/Error';
import { SongCard } from '../components';
import { useSelector } from 'react-redux';




const TopCharts = () => {
    const {data, isFetching, error} = useGetTopChartsQuery()
    const {isPlaying, activeSong} = useSelector(state => state.player)


    if(isFetching) return <Loader title="Loading Songs Around You ..." />

    if(error) return <Error />

    return (
    <div className='flex flex-col'>
        <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
            Discover Top Charts
        </h2>
        <div className='flex flex-wrap justify-center gap-8
        sm:justify-start '>
            {data?.map((song, idx)=> (
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


export default TopCharts;
