import {useEffect, useRef} from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {Swiper, SwiperSlide} from "swiper/react"
import { FreeMode } from 'swiper';

import PlayPause from "./PlayPause"
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import {playPause, setActiveSong}  from "../redux/features/playerSlice"

import "swiper/css"
import "swiper/css/free-mode"

const TopCartCard = ({song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick})=> (
  <div className='w-full flex items-center py-2 p-4 rounded-lg cursor-pointer mb-2 hover:bg-[#4c426e]'>
    <h3 className='font-bold text-base text-white mr-3'>{i + 1}</h3>
    <div className='flex-1 flex flex-row justify-between items-center'>
      <img className='w-20 h-20 rounded-lg'
      src={song?.images?.coverart} alt={song?.title} />
      <div className='flex-1 flex flex-col justify-center mx-3'>
        <Link to={`/songs/${song.key}`}>
          <p className='text-xl font-bold text-white'>{song?.title}</p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className='text-base text-gray-300 mt-1'>
            {song?.subtitle}
          </p>
        </Link>
      </div>
    </div>
    <PlayPause 
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
)



const TopPlay = () => {
  const dispatch = useDispatch();
  const {activeSong, isPlaying} = useSelector((state)=> state.player)
  const {data} = useGetTopChartsQuery()
  const divRef = useRef(null)

  useEffect(() => {   
    divRef.current.scrollIntoView({
      behavior: 'smooth'
    })
  }, [])
  

  const topPlays = data?.slice(0, 5)

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
  <div ref={divRef}
  className='ml-0 mb-6 flex-1 max-w-full flex flex-col xl:ml-6 xl:mb-0 xl:max-w-[500px]'
  >
    <div className='w-full flex flex-col'>
      <div className="flex flex-row justify-between items-center">
        <h2 className='text-white font-bold text-2xl'>Top Charts</h2>
        <Link to="./top-charts">
          <p className='text-gray-300 text-base cursor-pointer'>See more</p>
        </Link>
      </div>

      <div className='flex flex-col mt-4 gap-1'>
        {topPlays?.map((song, i) => 
        <TopCartCard song={song} i={i} key={song.key}
        isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick}
        handlePlayClick={()=>handlePlayClick(song, i)}
        />)}
      </div>

      <div className='w-full flex flex-col mt-8'>
        <div className="flex flex-row justify-between items-center">
          <h2 className='text-white font-bold text-2xl'>Top Artists</h2>
          <Link to="./top-artists">
            <p className='text-gray-300 text-base cursor-pointer'>See more</p>
          </Link>
        </div>

        <Swiper slidesPerView="auto" spaceBetween={15} freeMode 
        centeredSlides centeredSlidesBounds modules={[FreeMode]}
        className='mt-4'
        >
          {topPlays?.map((song, idx) => (
            <SwiperSlide key={song?.key}
            style={{width:'25%', height:'auto'}}
            className='shadow-lg rounded-full animate-slideright'
            >
              <Link to={`artists/${song?.artists[0].adamid}`}>
                <img src={song?.images.background} alt="name"
                className='rounded-full w-full object-cover' 
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </div>
  
  )
};

export default TopPlay;
