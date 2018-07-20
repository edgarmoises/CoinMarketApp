import React, {Component} from 'react';
import {ListView, View, Text, ActivityIndicator} from 'react-native';
import CoinItem from '../CoinListItem/CoinItem';
import {connect} from 'react-redux';
import {getCoinsList, isFavorite, searchCoins, getMainCoins, getAllCoins} from '../../actions';
import styles from '../../styles/stylesheet';
import {Toolbar} from '../common';
import GridView from 'react-native-super-grid';

class CoinsComponent extends Component {

    componentWillMount() {
        this.props.getCoinsList(this.props.coins);
        this.props.getAllCoins();

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({coins, filteredCoins}) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        if (filteredCoins.length > 0) {
            this.dataSource = ds.cloneWithRows(filteredCoins);
        } else {
            this.dataSource = ds.cloneWithRows(coins);
        }
    }

    renderRow(coin) {
        return <CoinItem coin={coin} isFavorite={false}/>
    }

    searchItems(searchText) {
        if (searchText.length === 0) {
            this.props.getCoinsList(this.props.coins);
        } else {
            this.props.searchCoins(searchText);
        }
    }

    renderLoader() {
        if (this.props.isFetching) {
            return <ActivityIndicator size='large' color='tomato' />
        }
    }

    renderMainContent() {
        if (this.props.error) {
            return <Text>{this.props.error}</Text>
        } else {
            if (this.props.filteredCoins.length > 0) {
                return <GridView items={this.props.filteredCoins} renderItem={this.renderRow} />
            } else {
                return <GridView items={this.props.coins} renderItem={this.renderRow} />
            }
            //return <ListView enableEmptySections dataSource={this.dataSource} renderRow={this.renderRow}/>
        }
    }

    render() {
        const {
            mainContainer,
            subContainer,
          } = styles;

        return(
            <View style={mainContainer}>
                <View style={subContainer}>
                    <Toolbar showSearchBar toolbarText='Market' searchAction={this.searchItems.bind(this)} />
                </View>
                {this.renderLoader()}
                {this.renderMainContent()}
            </View>
        );
    }
}

const mapStateToProps = ({marketCoins}) => {
    const {coins, filteredCoins, isFetching, error, allCoins} = marketCoins;
    
    return {coins, filteredCoins, isFetching, error, allCoins};
}

export default connect(mapStateToProps, {
    getMainCoins,
    getAllCoins,
    getCoinsList,
    isFavorite, 
    searchCoins
})(CoinsComponent);