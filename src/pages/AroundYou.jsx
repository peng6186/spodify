import React from 'react';
import axios from 'axios'
import {useState, useEffect} from "react"
import { useGetSongByCountryQuery } from '../redux/services/shazamCore';
import  Loader  from '../components/Loader';
import Error from '../components/Error';
import { SongCard } from '../components';
import { useSelector } from 'react-redux';

const options = {
    method: 'GET',
    url: 'https://ip-geo-location.p.rapidapi.com/ip/23.123.12.11',
    params: {format: 'json'},
    headers: {
      'X-RapidAPI-Key': '31ab5c0cd5msh49cb24bfdbdf58cp15d9fajsn962559b3c5df',
      'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com'
    }
  };


const AroundYou = () => {
    const [countryCode, setCountryCode] = useState("")
    const [loading, setLoading] = useState(true)
    const {data, isFetching, error} = useGetSongByCountryQuery(countryCode)
    const {isPlaying, activeSong} = useSelector(state => state.player)

    useEffect(() => {
       axios.request(options)
       .then(resp => setCountryCode(resp.data.country.code))
       .catch(err => console.log(err))
       .finally(setLoading(false))
    }, [countryCode])
    

    

    if(isFetching && loading) return <Loader title="Loading Songs Around You ..." />

    if(error && countryCode !== "") return <Error />

    return (
    <div className='flex flex-col'>
        <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
            Around You: <span className='font-black'>{countryCode}</span>
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


export default AroundYou;
