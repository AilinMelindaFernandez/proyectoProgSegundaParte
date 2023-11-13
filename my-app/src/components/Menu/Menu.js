import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {FontAwesome} from '@expo/vector-icons';

import Home from '../../screens/Home/Home';
import Busqueda from '../../screens/Busqueda/Busqueda';
import Posts from '../../screens/Post/Posts';

const Tab = createBottomTabNavigator();

function Menu (){

    return(
        <Tab.Navigator>
            <Tab.Screen name='Home'
                component={Home}
                options={{tabBarIcon:() => <FontAwesome name="home" size={24} color="black"></FontAwesome>}}  
             />
            <Tab.Screen name='Busqueda' 
                component={Busqueda}
                options={{tabBarIcon:() => <FontAwesome name="search" size={24} color="black"></FontAwesome>}} 
             /> 
            <Tab.Screen name='New Post' component={Posts}  options={ { headerShown: false }}/>            
        </Tab.Navigator>
    )
}


export default Menu;