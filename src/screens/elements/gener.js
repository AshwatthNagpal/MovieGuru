import React, { Component } from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Text,
    Dimensions,
    ActivityIndicator,
    NetInfo
} from 'react-native';
import FETCH from '../../api/fetchdata'

export default class Gener extends Component {
    static navigationOptions = {
        tabBarLabel: 'Gener'
    }

    constructor(props) {
        super(props)
        this.state = {
            tvg: [],
            isTrue1: false,
            isTrue2: false,
            movieg: [],
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
            this.myfetch()
        }
    }

    myfetch() {
        if (!this.state.first) {
            this.setState({ first: true })

            FETCH.getGenerMovie().then(d => this.setState({ movieg: d, isTrue1: true }));
            FETCH.getGenerTv().then(d => this.setState({ tvg: d, isTrue2: true }));
        }
    }
    _keyextractor = (item, index) => { index }

    _renderitemMovie = ({ item }) => (

        <TouchableOpacity
            onPress={() => { this.props.navigation.push('generspecific', { id: item.id }) }}
        >
            <Text style={sheet.tex}>{item.name}</Text>
        </TouchableOpacity>

    )

    _renderitemTv = ({ item }) => (

        <TouchableOpacity
            onPress={() => { this.props.navigation.push('generspecificTv', { id: item.id }) }}
        >
            <Text style={sheet.tex}>{item.name}</Text>
        </TouchableOpacity>

    )

    render() {
        var image;
        let { w, h } = Dimensions.get('window');
        if (!this.state.isTrue1 || !this.state.isTrue2)
            return (

                <ActivityIndicator style={sheet.activityindicator} animating={this.state.animating} size={70} color="#e55f00" />

            )
        else
            return (
                <View backgroundColor={'#000000'} alignItems={'center'}>
                    <ScrollView>
                        <Text style={sheet.text}>Movie Genres</Text>
                        <FlatList
                            numColumns={2}
                            data={this.state.movieg}
                            renderItem={this._renderitemMovie}
                            keyExtractor={this._keyextractor}
                        />
                        <Text style={sheet.text}>Tv Genres</Text>
                        <FlatList
                            numColumns={2}
                            data={this.state.tvg}
                            renderItem={this._renderitemTv}
                            keyExtractor={this._keyextractor}
                        />
                    </ScrollView>
                </View>
            );
    }



}

const sheet = StyleSheet.create({
    activityindicator: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        flex: 1,
        alignSelf: 'center',
        backgroundColor: '#000000'
    },
    text: {
        fontSize: 25,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5,
        color: '#ffffff',
        fontWeight: 'bold',

    },
    tex: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        elevation: 10,
        color: '#ffffff',
        fontStyle: 'italic',
        backgroundColor: '#1c1c1c',
        width: Dimensions.get('window').width / 2 - 40,
        height: 100,
        textAlign: 'center',
        textAlignVertical: 'center'

    }
})