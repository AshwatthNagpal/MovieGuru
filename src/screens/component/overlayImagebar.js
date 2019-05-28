import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 300;

export default OverlayImageBar = (props) => (
    <View style={sheet.v}>
        <Image style={sheet.backdrop} resizeMode={'stretch'} source={{ uri: "https://image.tmdb.org/t/p/original" + props.backdrop_path }} />

        <View position={'relative'} bottom={80} zIndex={10} elevation={4}>
            <View flexDirection={'row'} alignItems={'flex-end'}>
                <Image style={sheet.p} resizeMode={'stretch'} source={{ uri: "https://image.tmdb.org/t/p/original" + props.poster_path }} />

                <View marginLeft={5} marginRight={5} justifyContent={'flex-end'}>
                    <Text style={sheet.heading}>{props.original_title}</Text>
                </View>
            </View>
        </View>
    </View >

)

const sheet = StyleSheet.create({

    p: {
        width: 100,
        height: 130,
        alignSelf: 'center',
        marginLeft: 10
    },
    backdrop: {
        width: BannerWidth,
        height: BannerHeight,

    },
    v: {
        width: Dimensions.get('window').width,
        height: BannerHeight + 20,
        marginBottom: 5,
        marginTop: 5,
        justifyContent: 'center',
        padding: 10

    },
    card: {
        width: Dimensions.get('window').width,
        backgroundColor: '#1c1c1c',
        marginBottom: 5,
        marginTop: 5,
        justifyContent: 'center',
        padding: 10
    },
    heading: {
        width: Dimensions.get('window').width - 140,
        fontWeight: 'bold',
        fontSize: 23,
        textAlignVertical: 'bottom',
        color: '#ffffff',
    },
});