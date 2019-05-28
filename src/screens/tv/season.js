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
    TouchableWithoutFeedback
} from 'react-native';
import InfoBar from '../component/infobar'
import Carousel from 'react-native-banner-carousel';
import SearchBar from '../component/searchbar'

const BannerWidth = Dimensions.get('window').width - 56;
const BannerHeight = 320;
export default class Season extends Component {
    constructor(props) {
        super(props)
        this.state = {
            details: {},
            isTrue: true
        }
        fetch('https://api.themoviedb.org/3/tv/' + this.props.navigation.getParam('id', 0) + '/season/' + this.props.navigation.getParam('season', 0) + '/episode/' + this.props.navigation.getParam('episode_number', 0) + '?api_key=e9854cd26bab97bcdd2a7657868112fd&language=en-US&append_to_response=credits%2Cimages').then(
            d => d.json()).then(d => this.setState({ details: d, isTrue: false }))

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


        if (s.isTrue)
            return (
                <ActivityIndicator style={sheet.activityindicator} size={70} color="#e55f00" />

            );
        else {

            let director = '', writer = ''
            for (p in s.details.crew) {
                if (s.details.crew[p].department === 'Directing')
                    director = s.details.crew[p].name + ", " + director
                if (s.details.crew[p].department === 'Writing')
                    writer = s.details.crew[p].name + ", " + writer

            }
            director = director.substring(0, director.length - 2)
            writer = writer.substring(0, writer.length - 2)
            return (
                <View style={sheet.container}>
                    <SearchBar onclick={({ item }) => {

                        if (item.media_type === 'tv')
                            this.props.navigation.push('tvseriesdetails', { id: item.id });
                        else if (item.media_type === 'movie')
                            this.props.navigation.push('movies', { id: item.id });


                    }} />
                    <ScrollView position={'relative'} top={70}>
                        <View style={sheet.card}>
                            <Carousel
                                autoplay
                                autoplayTimeout={5000}
                                loop
                                index={0}
                                showsPageIndicator={'false'}
                                pageSize={BannerWidth}
                            >
                                {s.details.images.stills.slice(0, 5).map((item, index) => this.renderPage(item, index))}
                            </Carousel>

                            <View position={'relative'} bottom={22} zIndex={10} elevation={4}>
                                <View flexDirection={'row'} alignItems={'center'}>
                                    <Image style={sheet.p} resizeMode={'stretch'} source={{ uri: "https://image.tmdb.org/t/p/original" + s.details.still_path }} />

                                    <View marginLeft={5} marginRight={5}>
                                        <Text style={sheet.heading}>Episode {s.details.episode_number}: {s.details.name}</Text>

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
                                    reviews: []
                                });
                            }}
                        />

                        <View style={sheet.card}>
                            <View flexDirection={'row'} alignItems={'baseline'}>
                                <Text style={sheet.title} >Cast</Text>
                                <TouchableOpacity onPress={() => { this.props.navigation.push('cast', { id: s.details.credits.cast }) }}>
                                    <Text style={sheet.bluetext}>SEE ALL</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                horizontal={true}
                                data={s.details.credits.cast}
                                renderItem={({ item }) => (
                                    <View>
                                        <Image resizeMode={'stretch'} style={sheet.poster} source={{ uri: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + item.profile_path }} />
                                        <Text style={sheet.text}>{item.name}</Text>
                                        <Text style={[sheet.greytext, { width: Dimensions.get('window').width / 2 - 30 }]}>{item.character}</Text>
                                    </View>

                                )}
                            />
                            <View>
                                <Text style={sheet.title}>Director</Text>
                                <Text style={sheet.greytext}>{director}</Text>
                                <Text style={sheet.title}>Writer</Text>
                                <Text style={sheet.greytext}>{writer}</Text>
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
                                data={s.details.images.stills}
                                renderItem={({ item }) => (
                                    <View>
                                        <Image resizeMode={'stretch'} style={sheet.poster} source={{ uri: "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + item.file_path }} />
                                    </View>

                                )}
                            />
                        </View>


                        <View style={sheet.card}>
                            <Text style={sheet.title}>Details</Text>
                            <Text style={sheet.text}>Plot Summary</Text>
                            <Text style={sheet.greytext}>{s.details.overview}</Text>
                            <Text style={sheet.text}> Air date</Text>
                            <Text style={sheet.greytext}>{s.details.air_date}</Text>
                        </View>
                        <View style={sheet.card}>
                            <View flexDirection={'row'} alignItems={'baseline'} paddingTop={5}>
                                <Text style={sheet.title}>Guest Stars</Text>
                                <TouchableOpacity onPress={() => { this.props.navigation.push('cast', { id: s.details.guest_stars }) }}>
                                    <Text style={sheet.bluetext}>SEE ALL</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                horizontal={true}
                                style={{ marginBottom: 40 }}
                                data={s.details.guest_stars}
                                renderItem={({ item }) => (
                                    <View >
                                        <Image resizeMode={'stretch'} style={sheet.poster} source={{ uri: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + item.profile_path }} />
                                        <Text style={sheet.text}>{item.name}</Text>
                                        <Text style={[sheet.greytext, { width: Dimensions.get('window').width / 2 - 30 }]}>{item.character}</Text>
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
        width: Dimensions.get("window").width - 146,
        marginTop: 5,
        marginBottom: 5,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    heading: {
        width: Dimensions.get('window').width - 176,
        fontWeight: 'bold',
        fontSize: 22,
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