import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetRelatedSongsQuery, useGetSongDetailsQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
    const dispatch = useDispatch()
    const {songid} = useParams()
    const {activeSong, isPlaying} = useSelector(state => state.player)
    const {data: songData, isFetching: isFetchingSongData} = useGetSongDetailsQuery(songid)
    const {data: relatedSongsData, isFetching: isFetchingRelatedSongs, error} = useGetRelatedSongsQuery(songid)

    const handlePauseClick = () => {
        dispatch(playPause(false));
      };
    
      const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({ song, relatedSongsData, i }));
        dispatch(playPause(true));
      };
    

    if (isFetchingSongData || isFetchingRelatedSongs) 
        return <Loader title="Searching song details"/>

    if (error) return <Error />    

    return (
    <div className="flex flex-col">
        <DetailsHeader artistId="" songData={songData} />
        <div className="mb-10">
            <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
            <div className="mt-5">
                {songData?.sections[1].type === 'LYRICS' ? songData?.sections[1]?.text.map((line, idx) => (
                   <p key={`${line}-${idx}`}
                   className="text-base my-1 text-gray-400"> {line} </p>
                )): <p className="text-base my-1 text-gray-400">Sorry, no lyrics found!</p>}
            </div>
        </div>
        <RelatedSongs
         data={relatedSongsData}
         isPlaying={isPlaying}
         activeSong={activeSong}
         handlePauseClick={handlePauseClick}
         handlePlayClick={handlePlayClick}
        />
    </div>
    )
}
export default SongDetails;
