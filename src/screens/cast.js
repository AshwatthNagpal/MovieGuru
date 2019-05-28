import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Text,
    Image,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from 'react-native';
import SearchBar from './component/searchbar'
export default class Cast extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <View backgroundColor={"#000000"} width={Dimensions.get('window').width} height={Dimensions.get('window').height}>
                <SearchBar onclick={({ item }) => {

                    if (item.media_type === 'tv')
                        this.props.navigation.push('tvseriesdetails', { id: item.id });
                    else if (item.media_type === 'movie')
                        this.props.navigation.push('movies', { id: item.id });


                }} />
                <FlatList
                    style={{ position: 'relative', top: 70, marginBottom: 70 }}
                    data={this.props.navigation.getParam('id', 0)}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => (
                        <View style={sheet.container}>
                            <Image style={sheet.poster} source={{ uri: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + item.profile_path }} />
                            <View justifyContent={'center'}>
                                <Text style={sheet.name}>{item.name}</Text>
                                <Text style={sheet.movie_name}>{item.character}</Text>
                            </View>
                        </View>

                    )}
                />
            </View>



        );
    }
}

const sheet = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#6e6f72'

    },
    name: {
        fontSize: 16,
        color: "#ffffff",
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5,
        fontWeight: 'bold',
        width: Dimensions.get('window').width - 120,
    },
    movie_name: {
        fontSize: 15,
        color: "#ffffff",
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5,
        width: Dimensions.get('window').width - 120,
    },

    poster: {
        width: 100,
        height: 150,
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5
    },
    activityindicator: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        flex: 1,
        alignSelf: 'center',
        backgroundColor: '#000000'
    },

});