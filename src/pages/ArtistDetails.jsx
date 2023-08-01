import { useParams } from "react-router-dom";
import { useSelector,  } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { useGetArtistDetailsQuery, useGetRelatedSongsQuery,  } from "../redux/services/shazamCore";

const ArtistDetails = () => {
    const {id: artistId} = useParams()
    const {activeSong, isPlaying} = useSelector(state => state.player)
    const {data: artistData, 
      isFetching: isFetchingArtistData,
      error
    } = useGetArtistDetailsQuery(artistId)

    if (isFetchingArtistData) 
        return <Loader title="Loading Artist details"/>

    if (error) return <Error />    

    return (
    <div className="flex flex-col">
        <DetailsHeader 
        artistId={artistId} 
        artistData={artistData?.data[0]}
        />

        <RelatedSongs
         data={artistData?.data[0].views['top-songs']?.data}
         artistId={artistId}
         isPlaying={isPlaying}
         activeSong={activeSong}

        />
    </div>
    )
}
export default ArtistDetails;