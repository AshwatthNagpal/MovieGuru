import React, { Component } from 'react';
import {
    ScrollView,
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Text,
    Image,
    ActivityIndicator,
    NetInfo,
    ToastAndroid
} from 'react-native';
import FETCH from '../../api/fetchdata';
import Carousel from 'react-native-banner-carousel';
import OverlayImageBar from '../component/overlayImagebar';
const BannerWidth = Dimensions.get('window').width - 46;
const BannerHeight = 320;




export default class MovieList extends Component {

    static navigationOptions = {
        tabBarLabel: 'Movies'
    }

    constructor(props) {
        super(props);
        this.state = {
            trm: [],
            pm: [],
            ucm: [],
            np: [],
            trending: [],
            a: true,
            b: true,
            c: true,
            e: true,
            f: true,
            animating: true,
            first: false
        }
        NetInfo.getConnectionInfo().then(connectionInfo => {
            if (connectionInfo.type == 'none') {
                alert('Please Check your Internet Connection')
                this.setState({ animating: false })
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
            if (!this.state.first) {

                this.setState({ first: true, animating: true })
                this.myfetch()
            }
        }
    }
    myfetch() {
        FETCH.getTopRated().then((d) => {

            this.setState({ trm: d, a: false })
        });

        FETCH.getUpcoming().then((d) => {
            this.setState({ ucm: d, b: false })
        });


        FETCH.getNowPlaying().then(d => {

            this.setState({ np: d, c: false })
        });

        FETCH.getPopularMovie().then((d) => {

            this.setState({ pm: d, e: false })
        });
        FETCH.getTrending('movie').then((d) => {

            this.setState({ trending: d.results.slice(0, 10), f: false })
        });


    }



    _keyExtractor = (item, index) => { item.id };

    _onpress(id1) {

        this.props.navigation.navigate('movies', { id: id1 });

    }
    _render_carousel(item, index) {
        return (
            <TouchableOpacity onPress={() => this._onpress(item.id)}>
                <Image style={{ height: BannerHeight, width: BannerWidth }} resizeMode={'stretch'}
                    source={{ uri: "https://image.tmdb.org/t/p/w342/" + item.poster_path }} />

            </TouchableOpacity>
        )
    }
    _renderItem = ({ item }) => (
        <View >
            <TouchableOpacity onPress={() => this._onpress(item.id)}>
                <Image
                    resizeMode={'stretch'}
                    source={{ uri: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + item.poster_path }}
                    style={sheet.bimg} />
                <View style={sheet.bar}>
                    <Image style={sheet.star} source={require('../../raw/images/star.png')} />
                    <Text style={sheet.rating}>{item.vote_average}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    _onpress1(w, t) {
        this.props.navigation.push('entiremovielist', { what: w, type: t })

    }






    render() {
        var image;
        s = this.state;
        if (s.a || s.b || s.c || s.e || s.f) {
            image = (
                <ActivityIndicator style={sheet.activityindicator} animating={this.state.animating} size='large' color="#e55f00" />
            );

        }
        else {

            image = (
                <View style={sheet.card}>
                    <Carousel
                        autoplay
                        autoplayTimeout={5000}
                        loop
                        index={0}
                        showsPageIndicator={'false'}
                        pageSize={BannerWidth}
                    >
                        {this.state.trending.map((item, index) => this._render_carousel(item, index))}

                    </Carousel>
                </View>
            );

        }


        return (
            <View style={sheet.container}>

                <ScrollView >

                    {image}

                    <View style={sheet.card}>
                        <View flexDirection={'row'}>
                            <Text style={sheet.tex}>Top Rated Movies</Text>
                            <TouchableOpacity onPress={() => this._onpress1("movie", 'top_rated')}>
                                <Text style={sheet.bluetext}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList horizontal={true}
                            data={this.state.trm}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}

                        />
                    </View>

                    <View style={sheet.card}>
                        <View flexDirection={'row'}>
                            <Text style={sheet.tex}>Up Coming</Text>
                            <TouchableOpacity onPress={() => this._onpress1("movie", 'upcoming')}>
                                <Text style={sheet.bluetext}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList horizontal={true}
                            data={this.state.ucm}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}

                        />
                    </View>

                    <View style={sheet.card}>
                        <View flexDirection={'row'}>
                            <Text style={sheet.tex}> Now Playing</Text>
                            <TouchableOpacity onPress={() => this._onpress1("movie", 'now_playing')}>
                                <Text style={sheet.bluetext}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList horizontal={true}
                            data={this.state.np}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}

                        />
                    </View>
                    <View style={sheet.card}>
                        <View flexDirection={'row'}>
                            <Text style={sheet.tex}>Popular Movie</Text>
                            <TouchableOpacity onPress={() => this._onpress1("movie", 'popular')}>
                                <Text style={sheet.bluetext}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList horizontal={true}
                            data={this.state.pm}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}

                        />
                    </View>
                </ScrollView>
            </View >
        );
    }
}
const sheet = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Dimensions.get('window').width / 2 - 50,
        marginBottom: 3,
        marginLeft: 3,
        marginRight: 3,
        backgroundColor: '#292b2d',
        elevation: 4
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000000',

        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    activityindicator: {
        height: 300,
        width: 540,
        flex: 1,
        alignSelf: 'center',

    },
    card: {
        width: Dimensions.get('window').width - 16,
        backgroundColor: '#1c1c1c',
        marginBottom: 5,
        marginTop: 5,
        padding: 15,
        borderRadius: 10,
        marginRight: 8,
        marginLeft: 8
    },
    bimg: {
        width: Dimensions.get('window').width / 2 - 50,
        height: Dimensions.get('window').height / 3 - 40,
        marginTop: 3,

        alignSelf: 'center',
        marginLeft: 3,
        marginRight: 3,

    },
    bluetext: {
        color: '#0c68fc',
        fontSize: 18,
        width: 70,
        fontWeight: 'bold',
        marginBottom: 10,
        marginRight: 10
    },
    tex: {
        fontSize: 22,
        color: '#ffffff',
        marginBottom: 10,
        width: Dimensions.get('window').width - 116,
        fontStyle: 'normal',
        fontWeight: 'bold',
    },
    star: {
        width: 15,
        height: 15,
        marginLeft: 10
    },
    rating: {
        fontSize: 15,
        color: '#ffffff',
        marginLeft: 10
    },

})