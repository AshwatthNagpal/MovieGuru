import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ToastAndroid,

} from 'react-native';
import SearchBar from '../component/searchbar'
export default class SimilarTvShows extends Component {
    constructor(props) {
        super(props)
        var d = this.props.navigation.getParam('data', {});
        this.state = {
            movies: d.results,
            page: d.page,
            total_pages: d.total_pages,

        }
    }
    _onendreached = () => {
        if (this.state.page <= this.state.total_pages)

            fetch("https://api.themoviedb.org/3/tv/" + this.props.navigation.getParam('id', 0) + "/similar?api_key=e9854cd26bab97bcdd2a7657868112fd&language=en-US&page=" + (this.state.page + 1)).
                then(d => d.json()).then(d => {
                    this.setState({ movies: [...this.state.movies, ...d.results], page: d.page, total_pages: d.total_pages })
                });
        else
            ToastAndroid.show('end of list', ToastAndroid.SHORT);
    }
    render() {
        var image;
        d = this.state.movies
        image = <FlatList
            data={d}
            style={{ position: 'relative', top: 70, marginBottom: 90 }}
            onEndReachedThreshold={0.9}
            onEndReached={this._onendreached}
            renderItem={({ item }) => {
                let c;
                if (item.popularity > 100)
                    c = 'green';
                else if (item.popularity < 40)
                    c = 'red';
                else
                    c = '#DAA520'

                return (
                    <View style={sheet.view}>
                        <TouchableOpacity onPress={() => { this.props.navigation.push('movies', { id: item.id }) }}>
                            <Image resizeMode={'stretch'} style={sheet.img} source={{ uri: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + item.poster_path }} />
                        </TouchableOpacity >
                        <View justifyContent={'center'}>
                            <Text style={sheet.text}>{item.original_name} ({item.first_air_date.substring(0, 4)})</Text>
                            <View flexDirection={'row'} alignItems={'center'}>
                                <Image style={sheet.star} source={require('../../raw/images/star.png')} />
                                <Text style={sheet.vote}>{item.vote_average}</Text>
                                <Text style={[sheet.shorttext, { backgroundColor: c }]}>{item.popularity.toFixed(1)}</Text>
                                <Text style={[sheet.shorttext, {
                                    width: Dimensions.get('window').width / 5
                                }]

                                }>Popularity</Text>
                            </View>
                        </View>
                    </View>

                );
            }
            }

        />

        return (
            <View style={sheet.container}>
                <SearchBar onclick={({ item }) => {

                    if (item.media_type === 'tv')
                        this.props.navigation.push('tvseriesdetails', { id: item.id });
                    else if (item.media_type === 'movie')
                        this.props.navigation.push('movies', { id: item.id });


                }} />

                {image}
            </View>


        );
    }

}

const sheet = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#000000',
        padding: 10
    },
    view: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: 'grey'
    },
    shorttext: {
        fontSize: 13,
        color: '#ffffff',
        marginTop: 5,
        width: 50,
        marginBottom: 5,
        marginRight: 5,
        textAlign: 'center'
    },

    vote: {
        fontSize: 15,
        color: '#ffffff',
        marginRight: Dimensions.get('window').width / 25,
        width: 40,
        marginTop: 5,
        marginLeft: 3,
        marginBottom: 5,

    },
    img: {
        width: 100,
        height: 120,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5
    },
    text: {
        fontSize: 15,
        color: "#ffffff",
        fontWeight: 'bold',
        width: Dimensions.get('window').width - 150,
        textAlignVertical: 'center',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10
    },
    activityindicator: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        flex: 1,
        alignSelf: 'center',
        backgroundColor: '#000000'
    },
    star: {
        width: 20,
        height: 22,
        marginLeft: 10
    },

})