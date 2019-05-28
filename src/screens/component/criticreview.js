import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    Animated,
    Image,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback,

} from 'react-native';
import SearchBar from '../component/searchbar';
export default class CriticReview extends Component {
    constructor(props) {
        super(props)
        var d = this.props.navigation.getParam('reviews', {});
        this.state = {
            page: d.page,
            results: d.results,
            total_page: d.total_pages,
            img: require('../../raw/images/down.png')
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
                    style={{ position: 'relative', top: 70, marginBottom: 100 }}
                    data={this.state.results}
                    renderItem={({ item }) => {
                        var he = new Animated.Value(100), h;
                        var str = require('../../raw/images/down.png');
                        return (
                            <  TouchableWithoutFeedback onPress={() => {

                                var p
                                if (he._value == 100) {
                                    p = h + 100
                                    str = require('../../raw/images/up.png')
                                }
                                else {
                                    str = require('../../raw/images/down.png')
                                    p = 100
                                }

                                Animated.timing(
                                    he,
                                    {
                                        toValue: p

                                    }
                                ).start();

                            }

                            }>
                                <Animated.View style={[sheet.animate, { height: he }]}>
                                    <ScrollView>
                                        <View flexDirection={'row'}>
                                            <Text style={sheet.title}>{item.author}</Text>
                                            <Image style={sheet.img} source={str} />
                                        </View>
                                        <Text
                                            onLayout={(event) => {
                                                let { height } = event.nativeEvent.layout
                                                h = height;
                                            }}
                                            style={sheet.text}>{item.content}</Text>
                                    </ScrollView>
                                </Animated.View>
                            </ TouchableWithoutFeedback>

                        );
                    }

                    }
                />

            </View>


        );

    }

}

const sheet = StyleSheet.create({

    title: {
        fontSize: 20,
        textAlignVertical: 'center',
        color: '#ffffff',
        marginLeft: 15,
        marginBottom: 10,
        marginTop: 10,
        fontWeight: 'bold',
        height: 30,
        width: Dimensions.get('window').width - 100
    },
    text: {
        fontSize: 14,
        color: '#ffffff',
        marginLeft: 15,
        marginBottom: 10,
        marginRight: 15,
        width: Dimensions.get('window').width - 50
    },
    img: {
        width: 30,
        alignSelf: 'center',
        height: 30,

    },
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

        backgroundColor: '#000000',


    },
    animate: {
        width: Dimensions.get('window').width - 16,
        justifyContent: 'center',
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: '#1c1c1c',
        elevation: 15,
        padding: 10,
        marginLeft: 8,
        marginRight: 10,
        borderRadius: 5
    }

})