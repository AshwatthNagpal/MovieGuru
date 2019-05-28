import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native'



export default InfoBar = (props) => (
    <View style={sheet.card}>
        <Text style={sheet.title}>Plot</Text>
        <Text style={sheet.review}>{props.tagline}</Text>

        <View style={sheet.view2}>

            <View alignItems={'center'}>
                <Image style={sheet.star} source={require('../../raw/images/star.png')} />

                <Text style={sheet.text}>{props.vote_average}/10</Text>

                <Text style={sheet.smalltext}>{props.vote_count}</Text>
            </View>

            <View alignItems={'center'}>
                <Image style={sheet.star} source={require('../../raw/images/blankstar.png')} />
                <Text style={sheet.text}>RATE THIS</Text>
            </View>


            <TouchableOpacity onPress={props.on}>
                <Text style={sheet.text}>CRITIC{'\n'}REVIEWS</Text>
            </TouchableOpacity>


        </View>
    </View >
);

const sheet = StyleSheet.create({

    card: {
        width: Dimensions.get('window').width - 16,
        backgroundColor: '#1c1c1c',
        marginBottom: 5,
        marginTop: 5,
        padding: 10,
        borderRadius: 10,
        marginRight: 8,
        marginLeft: 8

    },
    view2: {
        width: Dimensions.get('window').width - 116,
        flexDirection: 'row',
        justifyContent: "space-between",
        marginLeft: 50,
        marginTop: 20,
        marginBottom: 5,
        marginRight: 50
    },
    text: {
        fontSize: 15,
        color: "#ffffff",
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5
    },
    smalltext: {
        fontSize: 12,
        color: '#6e6f72',

    },
    btext: {
        fontSize: 15,

        color: "#ffffff",
    },
    star: {
        height: 25,
        width: 25
    },
    poster: {
        width: Dimensions.get('window').width / 2 - 60,
        height: Dimensions.get('window').height / 3 - 50,
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5
    },
    title: {
        width: Dimensions.get("window").width - 146,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    review: {
        fontSize: 15,
        color: 'white',
        width: Dimensions.get('window').width - 46,

        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5
    }
});