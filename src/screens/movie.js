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
    ToastAndroid,
    NetInfo
} from 'react-native';
import InfoBar from './component/infobar'
import FETCH from '../api/fetchdata';
import SearchBar from './component/searchbar';
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 320;

export default class Movie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            details: {},
            isTrue: true,
            animating: true,
            searchResult: []
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
        FETCH.getMovieDetails(this.props.navigation.getParam('id', 0)).then(d => {
            this.setState({ details: d, isTrue: false })
        })
    }
    _onpress(id1) {

        this.props.navigation.push('movies', { id: id1 });

    }
    search(text) {
        FETCH.MultiSearch(text).then(d => this.setState({ searchResult: d }))

    }


    render() {
        s = this.state;
        if (s.isTrue)
            return (
                <ActivityIndicator style={sheet.activityindicator} animating={this.state.animating} size={70} color="#e55f00" />

            );
        else {
            let alternativetitle;
            if (s.details.alternative_titles.titles.length > 0)
                alternativetitle = s.details.alternative_titles.titles[0].title + "(" + s.details.alternative_titles.titles[0].iso_3166_1
            else if (s.details.alternative_titles.titles.length > 1)
                alternativetitle += "),..."
            else
                alternativetitle = "No alternative Titles"
            let g = "";
            for (p in s.details.genres)
                g = s.details.genres[p].name + ", " + g;
            g = g.substring(0, g.length - 2);
            let director = '', writer = '';

            for (p in s.details.credits.crew) {
                if (s.details.credits.crew[p].job === 'Director')
                    director = s.details.credits.crew[p].name + ", " + director;
                if (s.details.credits.crew[p].department === 'Writing')
                    writer = s.details.credits.crew[p].name + ", " + writer;
            }
            director = director.substring(0, director.length - 2);
            writer = writer.substring(0, writer.length - 2)

            return (
                <View style={sheet.container}>
                    <SearchBar onclick={({ item }) => {

                        if (item.media_type === 'tv')
                            this.props.navigation.push('tvseriesdetails', { id: item.id });
                        else if (item.media_type === 'movie')
                            this.props.navigation.push('movies', { id: item.id });


                    }} />
                    <ScrollView top={70} marginBottom={100}>
                        <View style={sheet.card}>
                            <Image style={sheet.backdrop} resizeMode={'stretch'} source={{ uri: "https://image.tmdb.org/t/p/original" + s.details.backdrop_path }} />

                            <View position={'relative'} bottom={22} zIndex={10} elevation={10} >
                                <View flexDirection={'row'} alignItems={'center'}>
                                    <Image style={sheet.p} resizeMode={'stretch'} source={{ uri: "https://image.tmdb.org/t/p/original" + s.details.poster_path }} />

                                    <View marginLeft={5} marginRight={5}  >
                                        <Text style={sheet.heading}>{s.details.original_title}</Text>
                                        <Text style={sheet.greytext1}>{g}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <InfoBar poster_path={s.details.poster_path}
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
                            <View>
                                <Text style={sheet.title}>Director</Text>
                                <Text style={sheet.greytext}>{director}</Text>
                                <Text style={sheet.title}>Writer</Text>
                                <Text style={sheet.greytext}>{writer}</Text>
                                <Text style={sheet.bluetext}>ALL CAST & CREW</Text>
                            </View>
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
                            <Text style={sheet.title}>Storyline</Text>
                            <Text style={sheet.text}>Plot Summary</Text>
                            <Text style={sheet.greytext}>{s.details.overview}</Text>
                            <Text style={sheet.text}>Tagline</Text>
                            <Text style={sheet.greytext}>{s.details.tagline}</Text>
                            <Text style={sheet.text}>Genres</Text>
                            <FlatList
                                horizontal={true}
                                data={s.details.genres}
                                renderItem={({ item }) => (
                                    <View height={35} marginRight={10} padding={5}
                                        backgroundColor={'#6e6f72'}
                                        justifyContent={'center'}
                                    >
                                        <TouchableOpacity onPress={() => { this.props.navigation.push('generspecific', { id: item.id, type: 'movie' }) }}>
                                            <Text style={sheet.text}>{item.name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />

                        </View>
                        <View style={sheet.card}>
                            <Text style={sheet.title}>Details</Text>
                            <Text style={sheet.text}>Release Date</Text>
                            <Text style={sheet.greytext}>{s.details.release_date}</Text>
                            <Text style={sheet.text}>Country Of Origin</Text>
                            <Text style={sheet.greytext}>{s.details.production_countries[0].name},...</Text>
                            <Text style={sheet.text}>Language Spoken</Text>
                            <Text style={sheet.greytext}>{s.details.original_language}</Text>
                            <Text style={sheet.text}>Also Knowns As</Text>
                            <Text style={sheet.greytext}>{alternativetitle}</Text>
                        </View>
                        <View style={sheet.card}>
                            <View flexDirection={'row'} alignItems={'baseline'} paddingTop={5}>
                                <Text style={sheet.title}>More Like This</Text>
                                <TouchableOpacity onPress={() => { this.props.navigation.push('similarmovies', { data: s.details.similar, id: s.details.id }) }}>
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
                                                <Image style={sheet.star} source={require('../raw/images/star.png')} />
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

        flexDirection: 'column',
        backgroundColor: '#000000',

        height: Dimensions.get('window').height,

    },
    card: {
        width: Dimensions.get('window').width - 16,
        backgroundColor: '#1c1c1c',
        marginBottom: 5,
        marginTop: 5,
        justifyContent: 'center',
        padding: 10,
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
        width: Dimensions.get("window").width - 116,
        marginTop: 5,
        marginBottom: 5,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    heading: {
        width: Dimensions.get('window').width - 156,
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
        fontSize: 14,
        color: '#6e6f72',
        width: Dimensions.get('window').width - 130,

    },
    poster: {
        width: Dimensions.get('window').width / 2 - 30,
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