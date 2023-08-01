import {Error, Loader, SongCard} from "../components"
import {genres} from "../assets/constants"
import { selectGenreListId } from "../redux/features/playerSlice"
import { useGetTopChartsQuery, useGetSongsByGenreQuery } from "../redux/services/shazamCore"
import { useSelector, useDispatch } from "react-redux"

const Discover = () => {
    const dispatch = useDispatch();
    const {isPlaying, activeSong, genreListId}  = useSelector(state => state.player)
    const { data, isFetching, error} = useGetSongsByGenreQuery(genreListId || "POP")
    
    // console.log(data);
    if (isFetching) return <Loader  title="Loading Now..."/>
    if (error) return <Error />
    
    const genre = genres.find(({value}) => value ===genreListId)?.title

    return (
        <div className="flex flex-col">
            <div className="w-full mt-4 mb-10 flex flex-col justify-between items-center sm:flex-row">
                <h2 className="text-white text-3xl text-left font-bold">Discover {genre}</h2>
                <select onChange={(e)=>{dispatch(selectGenreListId(e.target.value))}} 
                 className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
                 value={genreListId || 'pop'}
                 >
                    {genres.map(song => <option key={song.value} value={song.value}>
                        {song.title}
                    </option>)}
                </select>
            </div>
            <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
                {
                    data?.map((song, idx)=> 
                        <SongCard key={song.key} song={song} 
                        i={idx} isPlaying={isPlaying} 
                        activeSong={activeSong}
                        data={data}
                        />
                    )
                }
            </div>
        </div>
    )
}


export default Discover;
