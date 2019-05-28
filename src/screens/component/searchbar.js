import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TextInput,
    FlatList,
    TouchableWithoutFeedback,
    
} from 'react-native';
import FETCH from '../../api/fetchdata';
let { w, h } = Dimensions.get('window');
export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isTrue: true,
            data: [],
            modalVisible: false
        }
    }
    _onpress = () => {
        this.setState(p => ({ isTrue: !p.isTrue, data: [], modalVisible: false }));
    }

    _search = (text) => {
        if (text === '')
            this.setState({ data: [], modalVisible: false })
        else
            FETCH.MultiSearch(text).then(d => this.setState({ data: d, modalVisible: true }))
    }
    _onpress1 = ({ item }) => {

        if (item.media_type === 'tv')
            this.props.navigation.push('tvseriesdetails', { id: item.id });
        else if (item.media_type === 'movie')
            this.props.navigation.push('movies', { id: item.id });
        alert('person');
    }
    render() {
        if (this.state.isTrue)
            return (
                <View style={sheet.bar1}>
                    <Image style={sheet.logo} source={require('../../raw/images/Movie-Guru1.png')} />
                    <TouchableWithoutFeedback onPress={this._onpress}>
                        <Image style={sheet.searchicon} source={require('../../raw/images/search.png')} />
                    </TouchableWithoutFeedback>
                </View>
            );
        else {

            return (
                <View zIndex={30} position={'absolute'}>
                    <View style={sheet.bar2}>
                        <TouchableWithoutFeedback onPress={this._onpress}>
                            <Image style={sheet.searchicon} source={require('../../raw/images/backArrow.png')} />
                        </TouchableWithoutFeedback>
                        <View width={270}>
                            <TextInput
                                placeholder='Search....'
                                placeholderTextColor="#6e6f72"
                                autoFocus={true}
                                underlineColorAndroid='#6e6f72'
                                inlineImageLeft='balck_search'
                                inlineImagePadding={5}
                                style={sheet.textinput}
                                onChangeText={(t) => this._search(t)

                                }
                            />

                        </View>
                    </View>

                    <View backgroundColor={'transparent'} width={Dimensions.get('window').width} alignItems={'center'} maxHeight={400} position={'relative'}>
                        <FlatList
                            style={sheet.flatlist}
                            data={this.state.data.results}
                            renderItem={({ item }) => {
                                let title = ''
                                if (item.media_type === 'tv')
                                    title = item.name;
                                else
                                    title = item.original_title

                                return (
                                    <TouchableWithoutFeedback onPress={() => this.props.onclick({ item })} >
                                        <View style={sheet.render}>
                                            <Image style={sheet.poster} source={{ uri: "https://image.tmdb.org/t/p/w300_and_h450_bestv2" + item.poster_path }} />
                                            <Text style={sheet.title}>{title}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            }}
                        />
                    </View>

                </View>
            );

        }
    }
}

const sheet = StyleSheet.create({
    bar1: {
        width: Dimensions.get('window').width - 16,
        flexDirection: 'row',
        backgroundColor: '#1c1c1c',
        padding: 10,
        elevation: 70,
        alignItems: 'center',
        height: 70,
        borderRadius: 10,
        marginRight: 8,
        marginLeft: 8,
        zIndex: 30,
        position: 'absolute',


    },
    textinput: {
        width: 250,
        height: 60,
        marginLeft: 20,
        marginRight: 60,
        color: '#6e6f72',
        fontSize: 20,
        textDecorationLine: 'none'
    },
    bar2: {
        width: w,
        height: 70,
        flexDirection: 'row',
        backgroundColor: '#1c1c1c',
        padding: 10,
        elevation: 70,
        position: 'relative',
        alignItems: 'center',
        zIndex: 20,
        borderRadius: 10,
        marginRight: 8,
        marginLeft: 8
    },
    searchicon: {
        width: 30,
        height: 30,
        marginRight: 20
    },
    logo: {
        width: 40,
        height: 40,
        marginLeft: 20,
        marginRight: Dimensions.get('window').width - 156,
        borderRadius: 30
    },
    flatList: {
        width: Dimensions.get('window').width - 100,
        padding: 10,
        maxHeight: 300,
        backgroundColor: '#1c1c1c'
    },
    render: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Dimensions.get('window').width - 50,
        height: 60,
        backgroundColor: '#1c1c1c'
    },
    poster: {
        width: 60,
        height: 60,

    },
    title: {
        fontSize: 20,
        textAlignVertical: 'center',

        width: Dimensions.get('window').width - 130,
        height: 60,
        marginLeft: 4,
        color: 'white'
    }
});