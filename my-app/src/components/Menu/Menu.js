import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {FontAwesome} from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

import Home from '../../screens/Home/Home';
import Busqueda from '../../screens/Busqueda/Busqueda';
import Posts from '../../screens/Post/Posts';
import MiPerfil from '../../screens/MiPerfil/MiPerfil';


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
           
            <Tab.Screen name='New Post'
                component={Posts}
                options={{tabBarIcon:() => <FontAwesome name="cloud-upload" size={24} color="black" />,  headerShown: false }}
             />
             <Tab.Screen name='Mi perfil'
                component={MiPerfil}
                options={{tabBarIcon:() => <Ionicons name="person" size={24} color="black" />,  headerShown: false }}
             /> 
                              
        </Tab.Navigator>
    )
}


export default Menu;