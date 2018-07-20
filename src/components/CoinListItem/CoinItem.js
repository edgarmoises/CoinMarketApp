import React, {Component} from 'react';
import {View, Image, Text, TouchableWithoutFeedback} from 'react-native';
import {Card, CardSection,} from '../common'
import {withNavigation} from 'react-navigation';
import styles from '../../styles/stylesheet';

class CoinItem extends Component {

    onRowPress() {
        console.log(this.props.isFavorite);
        this.props.navigation.navigate('Details', { coin: this.props.coin, isFavorite: this.props.isFavorite});
    }

    render() {
        const {name, urlImage, symbol, chartImage} = this.props.coin;

        return(
            <Card>
                <CardSection>
                    <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                        <View style={[styles.gridItem, {flexDirection: 'column', flex: 1}]}>
                            <View style={[{flexDirection: 'row'}, styles.gridItem]}>
                                <Image style={styles.listImage} source={{uri: urlImage}}/>
                                <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
                                    <Text style={styles.listPrimarytText}>{name}</Text>
                                    <Text style={styles.listSecondayText}>{symbol}</Text>
                                </View>
                            </View>
                            <Image style={styles.chartThumbnail} source={{uri: chartImage}} />
                        </View>
                    </TouchableWithoutFeedback>
                </CardSection>
            </Card>
        );
    }
}

export default withNavigation(CoinItem);