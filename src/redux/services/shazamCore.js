import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

// const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': '31ab5c0cd5msh49cb24bfdbdf58cp15d9fajsn962559b3c5df',
//       'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
//     }
//   };
  
//   fetch('https://shazam-core.p.rapidapi.com/v1/charts/world', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));


export const shazamCoreApi = createApi({
    reducerPath: "shazamCoreApi", 
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set("X-RapidAPI-Key", "31ab5c0cd5msh49cb24bfdbdf58cp15d9fajsn962559b3c5df")
            return headers
        }
    }),
    endpoints: (builder)=> ({
        getTopCharts: builder.query({query: ()=> '/v1/charts/world'}),
        getSongsByGenre: builder.query({query: (genre)=> `/v1/charts/genre-world?genre_code=${genre}`}),
        getSongDetails: builder.query({query: (songid) => `/v1/tracks/details?track_id=${songid}`}),
        getRelatedSongs: builder.query({query: (songid)=> `/v1/tracks/related?track_id=${songid}`}),
        getArtistDetails: builder.query({ query: (artistId) => `/v2/artists/details?artist_id=${artistId}` }),
        getSongByCountry: builder.query({query: (countryCode) => `/v1/charts/country?country_code=${countryCode}`}),
        getSongsBySearch: builder.query({query: (searchTerm) => `/v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`})
    
    }),
})

    export const {
        useGetTopChartsQuery,
        useGetSongDetailsQuery,
        useGetRelatedSongsQuery,
        useGetArtistDetailsQuery,
        useGetSongByCountryQuery,
        useGetSongsByGenreQuery,
        useGetSongsBySearchQuery,
     } = shazamCoreApi