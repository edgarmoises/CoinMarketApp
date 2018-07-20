import React, {Component} from 'react';
import {View, Image, TextInput, Text, TouchableWithoutFeedback} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from "../../styles/stylesheet";

class Toolbar extends Component {

    textChanged(text) {
        this.props.searchAction(text);
    }

    onBackPressed() {
        this.props.navigation.goBack();
    }

    renderBackButton(toolbarContainer) {
        if (this.props.showBackButton) {
            return <TouchableWithoutFeedback onPress={this.onBackPressed.bind(this)}>
                        <View style={toolbarContainer.arrowBack}>
                            <Ionicons name={'ios-arrow-round-back'} size={30} color={'#000000'} />
                        </View>
                   </TouchableWithoutFeedback>
        }
    }

    renderSearchBar(toolbarContainer) {
        if (this.props.showSearchBar) {
            return <View style={toolbarContainer.searchContainer}>
                        <TextInput
                            autoCorrect={false}
                            selectionColor="#ccc"
                            placeholder="search"
                            underlineColorAndroid="transparent"
                            style={toolbarContainer.textInput}
                            onChangeText={(text) => this.textChanged(text)}/>
                        <Image
                            style={toolbarContainer.iconImage}
                            source={{
                                uri: "https://png.icons8.com/ios-glyphs/96/cccccc/search.png"
                            }}
                        />
                    </View>
        }
    }
    
    render() {
        const { toolbarContainer, title } = styles;
        return (
            <View style={toolbarContainer.mainContainer}>
                {this.renderBackButton(toolbarContainer)}
                <View style={toolbarContainer.title}>
                    <Text style={title}>{this.props.toolbarText}</Text>
                </View>
                {this.renderSearchBar(toolbarContainer)}
            </View>
        );
    }
}

export {Toolbar};