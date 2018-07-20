import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    createStackNavigator,
    TabBarBottom,
    TabNavigator, 
} from 'react-navigation';
import CoinScreen from './components/Coins/CoinsComponent';
import CoinDetail from './components/CoinDetail/CoinDetailComponent';
import Favorites from './components/Favorites/FavoritesComponent';

const HomeStack = createStackNavigator({
      HomeCoins: {
          screen: CoinScreen,
      }
}, 
{
    headerMode: 'none'
});

const FavoriteStack = createStackNavigator({
    HomeFavorites: { 
        screen: Favorites,
    },
}, 
{
    headerMode: 'none'
});

const RootStack = TabNavigator(
    {
        Coins: HomeStack,
        Favorites: FavoriteStack,
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Coins') {
                iconName = `ios-list${focused ? '' : '-outline'}`;
                } else if (routeName === 'Favorites') {
                iconName = `ios-heart${focused ? '' : '-outline'}`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        tabBarOptions: {
        activeTintColor: '#f2a900',
        inactiveTintColor: 'gray',
        },
        animationEnabled: true,
        swipeEnabled: true,
    }
);

const MainStack = createStackNavigator({
    NestedNavigator: {
        screen: RootStack,
        title: 'Coins',
    },
    Details: {
        screen: CoinDetail
    },
},
{
    headerMode: 'none'
});

export default MainStack;