import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions

} from 'react-native';
import FETCH from '../../api/fetchdata';
export default class EpisodeList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            details: [],
            isTrue: true
        }
        FETCH.getSeason(this.props.navigation.getParam('id', 0), this.props.navigation.getParam('season', 0)).then(d => {
            this.setState({ details: d, isTrue: false })
        }
        )
    }
    render() {
        if (s.isTrue)
            return (
                <ActivityIndicator style={sheet.activityindicator} size={70} color="#e55f00" />

            );
        else {

            return (

                <View style={sheet.container}>
                    <Text style={sheet.heading}>Episodes</Text>
                    <FlatList
                        data={this.state.details.episodes}
                        style={{ marginBottom: 50 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.props.navigation.push('season', {
                                id: this.props.navigation.getParam('id', 0),
                                season: item.season_number,
                                episode_number: item.episode_number

                            })}>

                                <View style={sheet.card}>
                                    <Text style={sheet.title}>{item.episode_number}. {item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>




            );


        }
    }


}
const sheet = StyleSheet.create({

    container: {
        backgroundColor: '#000000',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

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

    activityindicator: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        flex: 1,
        alignSelf: 'center',
        backgroundColor: '#000000'
    },
    title: {
        width: Dimensions.get("window").width - 100,
        marginTop: 5,
        marginBottom: 5,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    heading: {
        height: 50,
        marginTop: 30,
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 26,
        color: '#ffffff',
    },


});