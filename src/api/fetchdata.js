import React, { Component } from 'react';
import {
    Alert,
} from 'react-native';
const API_KEY = 'e9854cd26bab97bcdd2a7657868112fd'
const BASE_URL = "https://api.themoviedb.org/3/";
const TOP_RATED_MOVIES = "movie/top_rated";
const POPULAR_MOVIE = "movie/popular?"
const UPCOMING_MOVIE = "movie/upcoming?"
const IMAEG_URL = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/";
const IMAGE_FULL = "https://image.tmdb.org/t/p/w1400_and_h450_bestv2/";
const PROFILE_IMAGE = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";
const MOVIE_DETAILS = "movie_detils";
const NOWPLAYING_MOVIES = "movie/now_playing?";
const MOVIE = "movie/";
const REGION = "IN";
const PERSON = "person/";
const APPEND = "append_to_response=";

class FetchApi extends Component {
    async  getSpeicficTypeMovieList(what, type, page) {
        return await fetch('https://api.themoviedb.org/3/' + what + '/' + type + '?api_key=e9854cd26bab97bcdd2a7657868112fd&language=en-US&page=' + page).
            then(response => response.json()).catch((error) => {
                Alert.alert(error)
            });

    }
    async  getTrending(type) {
        return await fetch("https://api.themoviedb.org/3/trending/"+type+"/day?api_key=e9854cd26bab97bcdd2a7657868112fd").
            then(response => response.json()).catch((error) => {
                Alert.alert(error)
            });

    }

    async  MultiSearch(query) {
        return await fetch("https://api.themoviedb.org/3/search/multi?api_key=e9854cd26bab97bcdd2a7657868112fd&language=en-US&query=" + query + "&page=1&include_adult=false").
            then(response => response.json()).catch((error) => {
                Alert.alert(error)
            });

    }
    async  getSeason(id, number) {
        return await fetch("https://api.themoviedb.org/3/tv/" + id + "/season/" + number + "?api_key=e9854cd26bab97bcdd2a7657868112fd&language=en-US&append_to_response=credits%2Cimages%2Cvideos").
            then(response => response.json()).catch((error) => {
                Alert.alert(error)
            });

    }

    async  getTopRated() {
        return await fetch(BASE_URL + TOP_RATED_MOVIES + "?api_key=" + API_KEY + "&language=en-US&page=1").
            then(response => response.json()).then(d => d.results).catch((error) => {
                Alert.alert(error)
            });

    }
    async  getPopularMovie() {
        return await fetch('https://api.themoviedb.org/3/movie/popular?api_key=e9854cd26bab97bcdd2a7657868112fd&language=en-US&page=1').
            then(response => response.json()).then(d => d.results).catch((error) => {
                Alert.alert(error)
            });

    }
    async  getUpcoming() {
        return await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=e9854cd26bab97bcdd2a7657868112fd&language=en-US&page=1").
            then(response => response.json()).then(d => d.results).catch((error) => {
                Alert.alert(error)
            });

    }
    async getNowPlaying() {
        return await fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=e9854cd26bab97bcdd2a7657868112fd&language=en-US&page=1").
            then(response => response.json()).then(d => d.results).catch((error) => {
                Alert.alert(error)
            });

    }

    async getPopularTv() {
        return await fetch("https://api.themoviedb.org/3/tv/popular?api_key=e9854cd26bab97bcdd2a7657868112fd&language=en-US&page=1").
            then(response => response.json()).then(d => d.results).catch((error) => {
                Alert.alert(error)
            });

    }
    async getTopRatedTv() {
        return await fetch("https://api.themoviedb.org/3/tv/top_rated?api_key=e9854cd26bab97bcdd2a7657868112fd&language=en-US&page=1").
            then(response => response.json()).then(d => d.results).catch((error) => {
                Alert.alert(error)
            });

    }

    async getOnAiringTv() {
        return await fetch("https://api.themoviedb.org/3/tv/on_the_air?api_key=e9854cd26bab97bcdd2a7657868112fd&language=en-US&page=1").
            then(response => response.json()).then(d => d.results).catch((error) => {
                Alert.alert(error)
            });

    }
    async getAiringToadyTv() {
        return await fetch("https://api.themoviedb.org/3/tv/airing_today?api_key=e9854cd26bab97bcdd2a7657868112fd&language=en-US&page=1").
            then(response => response.json()).then(d => d.results).catch((error) => {
                Alert.alert(error)
            });

    }
    async getGenerTv() {
        return await fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=e9854cd26bab97bcdd2a7657868112fd&language=en-US").
            then(response => response.json()).then(d => d.genres).catch((error) => {
                Alert.alert(error)
            });
    }

    async getGenerMovie() {
        return await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=e9854cd26bab97bcdd2a7657868112fd&language=en-US").
            then(response => response.json()).then(d => d.genres).catch((error) => {
                Alert.alert(error)
            });

    }

    async getMoviesForGener(page, gid) {
        return await fetch("https://api.themoviedb.org/3/discover/movie?api_key=e9854cd26bab97bcdd2a7657868112fd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + page + "&with_genres=" + gid).
            then(response => response.json()).catch((error) => {
                Alert.alert(error)
            });

    }
    async getTvForGener(page, gid) {
        return await fetch("https://api.themoviedb.org/3/discover/tv?api_key=e9854cd26bab97bcdd2a7657868112fd&language=en-US&sort_by=popularity.desc&page=" + page + "&timezone=America%2FNew_York&with_genres=" + gid + "&include_null_first_air_dates=false").
            then(response => response.json()).catch((error) => {
                Alert.alert(error)
            });

    }

    async getMovieDetails(id) {
        return await fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=e9854cd26bab97bcdd2a7657868112fd&append_to_response=videos,images,credits,recommendations,similar,reviews,alternative_titles,release_dates").
            then(response => response.json()).catch((error) => {
                Alert.alert(error)
            });

    }
    async getTvSeriesDetails(id) {
        return await fetch("https://api.themoviedb.org/3/tv/" + id + "?api_key=e9854cd26bab97bcdd2a7657868112fd&append_to_response=videos,images,credits,recommendations,similar,reviews,alternative_titles").
            then(response => response.json()).catch((error) => {
                Alert.alert(error)
            });

    }



}

const FETCH = new FetchApi();
export default FETCH;
