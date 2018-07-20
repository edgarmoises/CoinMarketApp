import _ from 'lodash';
import React, {Component} from 'react';
import {ListView, View, Text, ActivityIndicator}from 'react-native';
import {connect} from 'react-redux';
import {getFavorites, isFavorite, searchFavoriteCoins} from '../../actions';
import styles from '../../styles/stylesheet';
import {Toolbar} from '../common';
import CoinItem from '../CoinListItem/CoinItem';
import GridView from 'react-native-super-grid';

class FavoriteComponent extends Component {

    componentWillMount() {
        this.props.getFavorites();

        this.createDataSource(this.props);

        this.props.isFavorite(true);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    renderRow(favorite) {
        return <CoinItem coin={favorite} isFavorite={true}/>;
    }

    createDataSource({favoriteCoins, filteredCoins}) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        if (filteredCoins.length > 0) {
            this.dataSource = ds.cloneWithRows(filteredCoins);
        } else {
            this.dataSource = ds.cloneWithRows(favoriteCoins);
        }
    }

    searchItems(searchText) {
        if (searchText.length === 0) {
            this.props.getFavorites();
        } else {
            this.props.searchFavoriteCoins(searchText);
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
                return <GridView items={this.props.favoriteCoins} renderItem={this.renderRow} />
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
                    <Toolbar showSearchBar toolbarText='Favorites' searchAction={this.searchItems.bind(this)} />
                </View>
                {this.renderLoader()}
                {this.renderMainContent()}
            </View>
        );
    }
}

const mapStateToProps = ({favorites}) => {
    const {favoriteCoins, filteredCoins, isFetching, error} = favorites;

    return {favoriteCoins, filteredCoins, isFetching, error};
}

export default connect(mapStateToProps, {getFavorites, isFavorite, searchFavoriteCoins})(FavoriteComponent);