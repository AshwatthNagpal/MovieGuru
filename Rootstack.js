import React, { Component } from 'react';
import {
    ScrollView,
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions,
    Text,
    Image,
    ToastAndroid
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import CBTN from './src/screens/first'
import Movie from './src/screens/movie'
import MovieList from './src/screens/elements/movielist1';
import Cast from './src/screens/cast';
import Images from './src/screens/images';
import GenerSpecific from './src/screens/generspecific';
import EntireMovieList from './src/screens/entiremovielist';
import SimilarMovies from './src/screens/similarmovies';
import CriticReview from './src/screens/component/criticreview';
import TvSeriesDetails from './src/screens/tv/tvseriesdetails';
import SeasonsList from './src/screens/tv/seasonslist';
import Season from './src/screens/tv/season';
import EpisodeList from './src/screens/tv/episodelist';
import GenerSpecificTv from './src/screens/tv/generspecificTv';
import SimilarTvShows from './src/screens/tv/similartvshows';
import SearchBar from './src/screens/component/searchbar';
export default RootStack = StackNavigator({
    first: CBTN,
    movies: Movie,
    movielist: MovieList,
    cast: Cast,
    images: Images,
    generspecific: GenerSpecific,
    generspecificTv: GenerSpecificTv,
    entiremovielist: EntireMovieList,
    similarmovies: SimilarMovies,
    criticreview: CriticReview,
    tvseriesdetails: TvSeriesDetails,
    seasonslist: SeasonsList,
    season: Season,
    episodelist: EpisodeList,
    similartvshows: SimilarTvShows,


},
    {
        headerMode: 'float',

        navigationOptions: {

            header: null/*(
                <View backgroundColor={"#000000"} paddinTop={10} elevation={20}
                    height={70} width={Dimensions.get('window').width} >
                    <SearchBar onclick={({ item }) => {

                        if (item.media_type === 'tv')
                            this.props.navigation.push('tvseriesdetails', { id: item.id });
                        else if (item.media_type === 'movie')
                            this.props.navigation.push('movies', { id: item.id });


                    }} />
                </View>
            )*/,

            headerStyle: {
                zIndex: 30

            }

        },
        initialRoute: 'first',

    }
)