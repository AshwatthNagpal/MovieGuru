import React, { Component } from 'react';
import {
    ScroolView,
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Text,
    Image
} from 'react-native';
import SearchBar from './component/searchbar';
import MovieList from './elements/movielist1';
import Tv from './elements/tv';
import Gener from './elements/gener';
import { createMaterialTopTabNavigator, } from 'react-navigation';
export default CBTN = createMaterialTopTabNavigator({
    firsts: MovieList,
    second: Tv,
    third: Gener,

},
    {
        initialRouteName: 'firsts',
        swipeEnabled: true,
        backBehavior: 'none',
        order: ['firsts', 'second', 'third'],
        tabBarOptions: {
            style: {
                backgroundColor: '#232426',

            },
            labelStyle: {
                color: '#ffffff',
                fontSize: 15,
                fontWeight: 'bold',
                width: 96,
                height: 30
            },
            indicatorStyle: {
                backgroundColor: 'white',

            },
        },

    }
);


