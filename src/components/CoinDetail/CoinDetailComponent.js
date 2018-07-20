import React, {Component} from 'react';
import {Text, View, WebView, ScrollView} from 'react-native';
import {Toolbar, Card, CardSection, Button} from '../common';
import {connect} from 'react-redux';
import {getCoinDetail, saveCoinToFavorites, deleteFavorite, getCoinChart, clearCoinDetails, deviceOrientation} from '../../actions'
import styles from '../../styles/stylesheet';
import Orientation from 'react-native-orientation';

class CoinDetailComponent extends Component {

    _orientationDidChange = (orientation) => {
        console.log(orientation);
        if (orientation === 'LANDSCAPE') {
            this.props.deviceOrientation({isLandscape: true});
        } else {
            this.props.deviceOrientation({isLandscape: false});
        }
    }

    componentWillMount() {
        const coin = this.props.navigation.getParam('coin', '');

        this.props.getCoinDetail({ coinId: coin.id });
        this.props.getCoinChart({coinSymbol: coin.symbol});

        const initial = Orientation.getInitialOrientation();
        if (initial === 'PORTRAIT') {
            this.props.deviceOrientation({isLandscape: false});
        } else {
            this.props.deviceOrientation({isLandscape: true});
        }
    }

    componentDidMount() {
        Orientation.addOrientationListener(this._orientationDidChange);
    }

    componentWillUnmount() {
        this.props.clearCoinDetails();
        
        Orientation.removeOrientationListener(this._orientationDidChange);
    }

    onButtonAddPress() {
        this.props.saveCoinToFavorites(this.props.coin);

        this.backToMain();
    }

    onButtonRemovePress() {
        this.props.deleteFavorite(this.props.coin);

        this.backToMain();
    }

    backToMain() {
        this.props.navigation.goBack();
    }

    renderButton() {
        const isFavorite = this.props.navigation.getParam('isFavorite', false);

        if (isFavorite === true){
            return <Button onPress={this.onButtonRemovePress.bind(this)}>Remove from favorites</Button>
        } else {
            return <Button onPress={this.onButtonAddPress.bind(this)}>Add to favorites</Button>
        }
    }

    renderPortraitLayout(coin, chart) {
        const {
            mainContainer,
            subContainer,
            primaryText,
            secondaryTextContainer,
            secondaryText
          } = styles;

        const {
            name, 
            symbol, 
            rank, 
            circulating_supply, 
            total_supply, 
            max_supply
        } = coin;

        const htmlCode = `
                <HTML>
                <HEAD>
                </HEAD>
                <BODY>
                <script>
                    ${chart}
                    </script>
                </BODY>
                </HTML>
                `;

        return(
            <View style={mainContainer}>
                <View style={subContainer}>
                    <Toolbar showBackButton navigation={this.props.navigation} toolbarText={name} />
                </View>
                <ScrollView>
                <Card>
                    <CardSection>
                        <View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={primaryText}>Name: </Text>
                                <View style={secondaryTextContainer}>
                                    <Text style={secondaryText}>{name}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={primaryText}>Symbol: </Text>
                                <View style={secondaryTextContainer}>
                                    <Text style={secondaryText}>{symbol}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={primaryText}>Rank: </Text>
                                <View style={secondaryTextContainer}>
                                    <Text style={secondaryText}>{rank}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={primaryText}>Circulatin Supply: </Text>
                                <View style={secondaryTextContainer}>
                                    <Text style={secondaryText}>{circulating_supply}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={primaryText}>Total Supply: </Text>
                                <View style={secondaryTextContainer}>
                                    <Text style={secondaryText}>{total_supply}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={primaryText}>Max Supply: </Text>
                                <View style={secondaryTextContainer}>
                                    <Text style={secondaryText}>{max_supply}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={primaryText}>Price: </Text>
                                <View style={secondaryTextContainer}>
                                    <Text style={secondaryText}>N/A</Text>
                                </View>
                            </View>
                        </View>
                    </CardSection>
                </Card>
                <Card>
                    <CardSection>
                        {this.renderButton()}
                    </CardSection>
                </Card>
                <Card style={{height: 250}}>
                    <CardSection style={{height: 250}}>
                        <WebView style={styles.webView} javaScriptEnabled={true} source={{html: htmlCode}} />
                    </CardSection>
                </Card>
                </ScrollView>
            </View>
        );  
    }

    renderLandscapeLayout(coin, chart) {
        const {
            mainContainer,
            subContainer,
            primaryText,
            secondaryTextContainer,
            secondaryText
          } = styles;

        const {
            name, 
            symbol, 
            rank, 
            circulating_supply, 
            total_supply, 
            max_supply
        } = coin;

        const htmlCode = `
                <HTML>
                <HEAD>
                </HEAD>
                <BODY>
                <script>
                    ${chart}
                    </script>
                </BODY>
                </HTML>
                `;
        
        return(
                <View style={mainContainer}>
                    <View style={subContainer}>
                        <Toolbar showBackButton navigation={this.props.navigation} toolbarText={name} />
                    </View>
                    <View>
                        {/* {this.renderButton()} */}
                    </View>
                    <WebView style={styles.webView} javaScriptEnabled={true} source={{html: htmlCode}} />
                </View>
        );  
    }

    render() {
        if (this.props.isLandscape === false) {
            return this.renderPortraitLayout(this.props.coin, this.props.chart);
        } else {
            return this.renderLandscapeLayout(this.props.coin, this.props.chart)
        }
    }
}

const mapStateToProps = (state) => {
    const {coin, chart} = state.coinDetail;
    const {isLandscape} = state.deviceActions;

    return {coin, chart, isLandscape};
}

export default connect(mapStateToProps, {
        getCoinDetail, 
        saveCoinToFavorites, 
        deleteFavorite, 
        getCoinChart, 
        deviceOrientation,
        clearCoinDetails
    })(CoinDetailComponent);