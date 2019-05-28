import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    FlatList,
    StyleSheet
} from 'react-native';
import SearchBar from '../component/searchbar'
export default class SeasonsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.navigation.getParam('data', []),
        }

    }
    render() {
        return (
            <View style={sheet.container}>
                <SearchBar onclick={({ item }) => {

                    if (item.media_type === 'tv')
                        this.props.navigation.push('tvseriesdetails', { id: item.id });
                    else if (item.media_type === 'movie')
                        this.props.navigation.push('movies', { id: item.id });


                }} />
                <FlatList
                    data={this.state.data}
                    style={{ position: 'relative', top: 70, marginBottom: 100 }}
                    renderItem={({ item }) => {
                        var overview
                        if (item.overview === "")
                            overview = "Nothing to show"
                        else
                            overview = item.overview

                        return (

                            <View style={sheet.card}>
                                <View flexDirection={'row'}>
                                    <Image style={sheet.poster} resizeMode={'stretch'} source={{ uri: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + item.poster_path }} />
                                    <View marginLeft={10}>
                                        <Text style={sheet.heading}>{item.name}</Text>

                                        <Text style={sheet.title}>Episode Count</Text>
                                        <Text style={sheet.greytext}>{item.episode_count}</Text>

                                        <Text style={sheet.title}>Air Date</Text>
                                        <Text style={sheet.greytext}>{item.air_date}</Text>

                                    </View>
                                </View>
                                <Text style={sheet.title}>Overview</Text>
                                <Text style={sheet.greytext}>{overview}</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.push('episodelist', {
                                    id: this.props.navigation.getParam('id', 0),
                                    season: item.season_number

                                })}>
                                    <Text style={sheet.heading}>All Episodes</Text>
                                </TouchableOpacity>
                            </View>

                        )
                    }
                    } />
            </View>



        );
    }


}

const sheet = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    card: {
        width: Dimensions.get('window').width - 16,
        backgroundColor: '#1c1c1c',
        marginBottom: 5,
        marginTop: 5,
        justifyContent: 'center',
        padding: 20,
        borderRadius: 10,
        marginRight: 8,
        marginLeft: 8
    },
    text: {
        fontSize: 15,
        color: "#ffffff",
        textAlignVertical: 'center',
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5
    },
    title: {
        width: Dimensions.get("window").width / 4,
        marginTop: 5,
        marginBottom: 5,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    heading: {
        width: Dimensions.get('window').width - 140,
        fontWeight: 'bold',
        fontSize: 23,
        color: '#ffffff',
    },
    greytext: {
        fontSize: 14,
        color: '#6e6f72',

    },
    poster: {
        width: Dimensions.get('window').width / 2 - 30,
        height: Dimensions.get('window').height / 3 - 50,
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5
    },
});