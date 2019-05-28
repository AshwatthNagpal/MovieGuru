import React, { Component } from 'react';
import {
    View,
    Image,
    FlatList,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    Modal,
    Text,
} from 'react-native'

export default class Images extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }
    }
    render() {
        return (
            <View>
                <Modal animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { }} >
                    <Text>hello world </Text>

                </Modal>
                <FlatList
                    style={sheet.container}
                    numColumns={3}
                    data={this.props.navigation.getParam('images', {})}
                    renderItem={({ item }) => (
                        <TouchableHighlight onPress={() => { this.setState({ modalVisible: true }) }}>
                            <Image style={sheet.img} source={{ uri: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + item.file_path }} />
                        </TouchableHighlight>
                    )}

                />
            </View >

        );
    }
}

const sheet = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: "#000000"
    },
    img: {
        width: Dimensions.get('window').width / 3,
        height: 150,
        marginTop: 3,
        marginLeft: 3,
        marginRight: 3,
        marginBottom: 3
    }

})