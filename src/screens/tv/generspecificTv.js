import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Dimensions,
    ToastAndroid,
    NetInfo
} from 'react-native';
import FETCH from '../../api/fetchdata';
import SearchBar from '../component/searchbar'
export default class GenerSpecificTv extends Component {

    constructor(props) {
        super(props)
        this.state = {
            movies: {},
            page: 0,
            total_pages: 0,
            isTrue: true,
            animating: true
        }
        NetInfo.getConnectionInfo().then(connectionInfo => {
            if (connectionInfo.type == 'none') {
                this.setState({ animating: false })
                ToastAndroid.show("network issues", ToastAndroid.SHORT);
            }
            else {
                this.myfetch();
            }
        })

        NetInfo.addEventListener(
            "connectionChange",
            this.handler
        )



    }
    handler = (connectionInfo) => {
        if (connectionInfo.type.toString() != 'none') {
            this.setState({ animating: true })
            ToastAndroid.show('Loading...', ToastAndroid.SHORT);
            this.myfetch()
        }
    }

    myfetch() {
        FETCH.getTvForGener(1, this.props.navigation.getParam('id', 0))
            .then(d => {
                this.setState({ movies: d.results, isTrue: false, page: d.page, total_pages: d.total_pages })
            });
    }
    _onendreached = () => {
        if (this.state.page <= this.state.total_pages) {

            FETCH.getTvForGener(this.state.page + 1, this.props.navigation.getParam('id', 0))
                .then(d => {
                    this.setState({ movies: [...this.state.movies, ...d.results], isTrue: false, page: d.page, total_pages: d.total_pages })
                });

        }
        else
            ToastAndroid.show('end of list', ToastAndroid.SHORT);
    }
    render() {
        var image;
        if (this.state.isTrue)
            image = <ActivityIndicator style={sheet.activityindicator} animating={this.state.animating} size={70} color="#e55f00" />
        else {
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
                            <TouchableOpacity onPress={() => { this.props.navigation.push('tvseriesdetails', { id: item.id }) }}>
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
                                    }]}>Popularity</Text>
                                </View>
                            </View>
                        </View>

                    );
                }
                }

            />
        }
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