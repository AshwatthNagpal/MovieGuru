import React, { Component } from 'react';
import {
    ScrollView,
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions,
    Text,
    Image,
    Animated,
    TouchableWithoutFeedback,
    NetInfo,
    ToastAndroid
} from 'react-native';
import InfoBar from '../component/infobar'
import FETCH from '../../api/fetchdata';
import SearchBar from '../component/searchbar';
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 320;

export default class TvSeriesDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            details: {},
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
        FETCH.getTvSeriesDetails(this.props.navigation.getParam('id', 0)).then(d => {
            this.setState({ details: d, isTrue: false })
        }
        )
    }
    _onpress(id1) {

        this.props.navigation.push('tvseriesdetails', { id: id1 });

    }
    renderPage(item, index) {

        return (
            <View key={index}>
                <Image zIndex={-1} style={{ width: BannerWidth, height: BannerHeight }} aspectRatio={item.aspect_ratio} source={{ uri: "https://image.tmdb.org/t/p/w780/" + item.file_path }} />
            </View>
        );
    }
    render() {
        s = this.state;
        var h1 = new Animated.Value(80), h;

        if (s.isTrue)
            return (
                <ActivityIndicator style={sheet.activityindicator} animating={this.state.animating} size={70} color="#e55f00" />

            );
        else {
            var a_t;
            if (s.details.alternative_titles.results.length > 0)
                a_t = s.details.alternative_titles.results[0].title;
            else
                a_t = 'No alternative title'
            let g = "";
            for (p in s.details.created_by)
                g = s.details.created_by[p].name + ", " + g;
            g = g.substring(0, g.length - 2)

            return (
                <View style={sheet.container}>
                    <SearchBar onclick={({ item }) => {

                        if (item.media_type === 'tv')
                            this.props.navigation.push('tvseriesdetails', { id: item.id });
                        else if (item.media_type === 'movie')
                            this.props.navigation.push('movies', { id: item.id });


                    }} />
                    <ScrollView marginBottom={70} top={70}>

                        <View style={sheet.card}>
                            <Image style={sheet.backdrop} resizeMode={'stretch'} source={{ uri: "https://image.tmdb.org/t/p/original" + s.details.backdrop_path }} />

                            <View position={'relative'} bottom={22} zIndex={10} elevation={4}>
                                <View flexDirection={'row'} alignItems={'center'}>
                                    <Image style={sheet.p} resizeMode={'stretch'} source={{ uri: "https://image.tmdb.org/t/p/original" + s.details.poster_path }} />

                                    <View marginLeft={5} marginRight={5}>
                                        <Text style={sheet.heading}>{s.details.original_name}</Text>
                                        <Text style={sheet.greytext1}>{g}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <InfoBar
                            tagline={s.details.overview}
                            vote_average={s.details.vote_average}
                            vote_count={s.details.vote_count}
                            on={() => {
                                this.props.navigation.navigate('criticreview', {
                                    reviews: s.details.reviews
                                });
                            }}
                        />

                        <View style={sheet.card}>
                            <View flexDirection={'row'} alignItems={'baseline'}>
                                <Text style={sheet.title} >Top Billed Cast</Text>
                                <TouchableOpacity onPress={() => { this.props.navigation.push('cast', { id: s.details.credits.cast }) }}>
                                    <Text style={sheet.bluetext}>SEE ALL</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                horizontal={true}
                                data={s.details.credits.cast.slice(0, 18)}
                                renderItem={({ item }) => (
                                    <View>
                                        <Image resizeMode={'stretch'} style={sheet.poster} source={{ uri: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + item.profile_path }} />
                                        <View marginLeft={8}>
                                            <Text style={sheet.text}>{item.name}</Text>
                                            <Text style={[sheet.greytext, { width: Dimensions.get('window').width / 2 - 30 }]}>{item.character}</Text>
                                        </View>
                                    </View>

                                )}
                            />
                        </View>

                        <View style={sheet.card}>
                            <Text style={sheet.title}>Storyline</Text>
                            <Text style={sheet.text}>Plot Summary</Text>
                            <Text style={sheet.greytext}>{s.details.overview}</Text>
                            <Text style={sheet.text}>Popularity</Text>
                            <Text style={sheet.greytext}>{s.details.popularity}</Text>
                            <Text style={sheet.text}>Genres</Text>
                            <FlatList
                                horizontal={true}
                                data={s.details.genres}
                                renderItem={({ item }) => (
                                    <View height={35} marginRight={10} padding={5}
                                        backgroundColor={'#6e6f72'}
                                        justifyContent={'center'}
                                    >
                                        <TouchableOpacity onPress={() => { this.props.navigation.push('generspecificTv', { id: item.id }) }}>
                                            <Text style={sheet.text}>{item.name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />

                        </View>
                        <View style={sheet.card}>
                            <View flexDirection={'row'} alignItems={'baseline'} paddingTop={5}>
                                <Text style={sheet.title} >Images</Text>
                                <TouchableOpacity onPress={() => { this.props.navigation.push('images', { images: s.details.images.backdrops }) }}>
                                    <Text style={sheet.bluetext}>SEE ALL</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                horizontal={true}
                                data={s.details.images.backdrops.slice(0, 15)}
                                renderItem={({ item }) => (
                                    <View>
                                        <Image resizeMode={'stretch'} style={sheet.poster} source={{ uri: "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + item.file_path }} />
                                        <Text style={sheet.text}>{item.name}</Text>
                                        <Text style={sheet.greytext}>{item.character}</Text>
                                    </View>

                                )}
                            />
                        </View>

                        <View style={sheet.card}>
                            <Text style={sheet.title}>Details</Text>
                            <Text style={sheet.text}>First Air date</Text>
                            <Text style={sheet.greytext}>{s.details.first_air_date}</Text>
                            <Text style={sheet.text}>Country Of Origin</Text>
                            <Text style={sheet.greytext}>{s.details.origin_country[0]}</Text>
                            <Text style={sheet.text}>Language Spoken</Text>
                            <Text style={sheet.greytext}>{s.details.original_language}</Text>
                            <Text style={sheet.text}>Also Knowns As</Text>
                            <Text style={sheet.greytext}>{a_t}</Text>
                            <Text style={sheet.text}>Last Air Date</Text>
                            <Text style={sheet.greytext}>{s.details.last_air_date}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    var a;
                                    if (h1._value == 80)
                                        a = h
                                    else
                                        a = 80
                                    Animated.timing(
                                        h1,
                                        { toValue: a }
                                    ).start();
                                }}

                            >

                                <Animated.View height={h1}>
                                    <View paddingBottom={10} paddingTop={10}
                                        onLayout={(event) => { h = event.nativeEvent.layout.height }}>
                                        <Text style={sheet.text}>Last Episode To Air</Text>
                                        <Text style={sheet.greytext}>{s.details.last_episode_to_air.name}</Text>
                                        <Image resizeMode={'stretch'} style={sheet.poster1} source={{ uri: "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + s.details.last_episode_to_air.still_path }} />
                                        <Text style={sheet.greytext}>Season {s.details.last_episode_to_air.season_number}
                                            episode {s.details.last_episode_to_air.episode_number}</Text>
                                        <Text style={sheet.text}>OverView</Text>
                                        <Text style={sheet.greytext}>{s.details.last_episode_to_air.overview}</Text>
                                    </View>
                                </Animated.View>

                            </TouchableOpacity>

                            <Text style={sheet.text}>Number Of Episodes</Text>
                            <Text style={sheet.greytext}>{s.details.number_of_episodes}</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.push('seasonslist', {
                                data: s.details.seasons,
                                id: s.details.id
                            })}>
                                <View>
                                    <Text style={sheet.text}>Number of Seasons</Text>
                                    <Text style={sheet.greytext}>{s.details.number_of_seasons}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>



                        <View style={sheet.card}>
                            <View flexDirection={'row'} alignItems={'baseline'} paddingTop={5}>
                                <Text style={sheet.title}>More Like This</Text>
                                <TouchableOpacity onPress={() => { this.props.navigation.push('similartvshows', { data: s.details.similar, id: s.details.id }) }}>
                                    <Text style={sheet.bluetext}>SEE ALL</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                horizontal={true}
                                data={s.details.similar.results}
                                renderItem={({ item }) => (
                                    <View >
                                        <TouchableOpacity onPress={() => this._onpress(item.id)}>
                                            <Image resizeMode={'stretch'}
                                                source={{ uri: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + item.poster_path }}
                                                style={sheet.poster} />
                                            <View flexDirection={'row'}>
                                                <Image style={sheet.star} source={require('../../raw/images/star.png')} />
                                                <Text style={sheet.rating}>{item.vote_average}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                                }
                            />
                        </View>
                    </ScrollView>
                </View >
            );
        }
    }
}




const sheet = StyleSheet.create({
    bluetext: {
        color: '#0c68fc',
        fontSize: 18,
        fontWeight: 'bold',

        marginTop: 5,
        marginBottom: 5,
        textAlignVertical: 'center'
    },
    p: {
        width: 100,
        height: 130,
        alignSelf: 'center',
        marginLeft: 10
    },
    backdrop: {
        width: Dimensions.get("window").width - 30,
        height: Dimensions.get('window').height / 3 + 50,
        alignSelf: 'center'
    },
    container: {
        backgroundColor: '#000000',

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
    activityindicator: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        flex: 1,
        alignSelf: 'center',
        backgroundColor: '#000000'
    },
    title: {
        width: Dimensions.get("window").width - 130,
        marginTop: 5,
        marginBottom: 5,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    heading: {
        width: Dimensions.get('window').width - 160,
        fontWeight: 'bold',
        fontSize: 23,
        color: '#ffffff',

    },

    star: {
        width: 20,
        height: 22,
        marginLeft: 10
    },
    rating: {
        fontSize: 15,
        color: '#ffffff',
        marginLeft: 10
    },
    greytext: {
        fontSize: 14,
        color: '#6e6f72',

    },
    greytext1: {
        width: Dimensions.get('window').width - 156,
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
    poster1: {
        alignSelf: 'center',
        width: Dimensions.get('window').width - 50,
        height: Dimensions.get('window').height / 3 - 50,
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5
    },
    review: {
        fontSize: 15,
        color: 'white',
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').height / 3 - 50,
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5
    }
});