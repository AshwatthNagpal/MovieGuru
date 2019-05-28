import React, { Component } from 'react';
import {
    ScrollView,
    View,
    ActivityIndicator,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Text,
    Image,
    NetInfo
} from 'react-native';

import FETCH from '../../api/fetchdata'
import Carousel from 'react-native-banner-carousel';
const BannerWidth = Dimensions.get('window').width - 46;
const BannerHeight = 320;

export default class Tv extends Component {
    static navigationOptions = {
        tabBarLabel: 'Tv'
    }

    constructor(props) {
        super(props);
        this.state = {
            p: [],
            tr: [],
            ona: [],
            at: [],
            trending: [],
            f: true,
            a: true,
            b: true,
            c: true,
            e: true,
            animating: true,
            first: false
        }

        NetInfo.getConnectionInfo().then(connectionInfo => {
            if (connectionInfo.type == 'none') {

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
            this.setState({ animating: true });
            this.myfetch()

        }
    }
    myfetch() {
        if (!this.state.first) {
            this.setState({ first: true })
            FETCH.getPopularTv().then((d) => { this.setState({ p: d, a: false }) });
            FETCH.getTopRatedTv().then((d) => { this.setState({ tr: d, b: false }) });
            FETCH.getOnAiringTv().then((d) => { this.setState({ ona: d, c: false }) });
            FETCH.getAiringToadyTv().then((d) => { this.setState({ at: d, e: false }) });
            FETCH.getTrending('tv').then((d) => {

                this.setState({ trending: d.results.slice(0, 10), f: false })
            });
        }
    }
    _KeyExtractor = (item, index) => { item.id }

    _render_carousel(item, index) {
        return (
            <TouchableOpacity onPress={() => { this.props.navigation.push('tvseriesdetails', { id: item.id }) }}>
                <Image style={{ height: BannerHeight, width: BannerWidth }} resizeMode={'stretch'}
                    source={{ uri: "https://image.tmdb.org/t/p/w342/" + item.poster_path }} />
            </TouchableOpacity>
        )
    }

    _RenderItem = ({ item }) => (
        <View>
            <TouchableOpacity onPress={() => { this.props.navigation.push('tvseriesdetails', { id: item.id }) }}>
                <Image
                    defaultSource={require('../../raw/images/blank.jpeg')}
                    style={sheet.bimg} source={{ uri: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + item.poster_path }} />

                <View style={sheet.bar}>
                    <Image style={sheet.star} source={require('../../raw/images/star.png')} />
                    <Text style={sheet.rating}>{item.vote_average}</Text>
                </View>

            </TouchableOpacity>
        </View>
    )
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
                <ScrollView>
                    {image}

                    <View style={sheet.card}>
                        <View flexDirection={'row'}>
                            <Text style={sheet.tex}>Popular</Text>
                            <TouchableOpacity onPress={() => this._onpress1('tv', 'popular')}>
                                <Text style={sheet.bluetext}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            horizontal={true}
                            data={this.state.p}
                            keyExtractor={this._KeyExtractor}
                            renderItem={this._RenderItem}

                        />
                    </View>
                    <View style={sheet.card}>
                        <View flexDirection={'row'}>
                            <Text style={sheet.tex}>Top Rated</Text>
                            <TouchableOpacity onPress={() => this._onpress1('tv', 'top_rated')}>
                                <Text style={sheet.bluetext}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            horizontal={true}
                            data={this.state.tr}
                            keyExtractor={this._KeyExtractor}
                            renderItem={this._RenderItem}

                        />
                    </View>
                    <View style={sheet.card}>
                        <View flexDirection={'row'}>
                            <Text style={sheet.tex}>On The Air</Text>
                            <TouchableOpacity onPress={() => this._onpress1('tv', 'on_the_air')}>
                                <Text style={sheet.bluetext}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            horizontal={true}
                            data={this.state.ona}
                            keyExtractor={this._KeyExtractor}
                            renderItem={this._RenderItem}

                        />
                    </View>
                    <View style={sheet.card}>
                        <View flexDirection={'row'}>
                            <Text style={sheet.tex}>Airing Today</Text>
                            <TouchableOpacity onPress={() => this._onpress1('tv', 'airing_today')}>
                                <Text style={sheet.bluetext}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            horizontal={true}
                            data={this.state.at}
                            keyExtractor={this._KeyExtractor}
                            renderItem={this._RenderItem}

                        />
                    </View>
                </ScrollView>
            </View>
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
    bluetext: {
        color: '#0c68fc',
        fontSize: 18,
        width: 70,
        fontWeight: 'bold',
        marginBottom: 10,
        marginRight: 10
    },

})