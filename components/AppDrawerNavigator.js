import {createDrawerNavigator} from 'react-navigation-drawer'
import SettingScreen from '../screens/SettingScreen'
import {AppTabNavigator} from './AppTabNavigator' 
import CustomSideBarMenu from './CustomSideBarMenu'

export const AppDrawerNavigator = createDrawerNavigator({

Home : {
    screen:AppTabNavigator
},
Setting : {
    screen:SettingScreen
},

},
{
    contentComponent : CustomSideBarMenu
},
{
    initialRouteName : "Home"
})