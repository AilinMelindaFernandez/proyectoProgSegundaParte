import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {FontAwesome} from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../../screens/Home/Home';
import Busqueda from '../../screens/Busqueda/Busqueda';
import Posts from '../../screens/Post/Posts';
import MiPerfil from '../../screens/MiPerfil/MiPerfil';
import Perfil from '../../screens/Perfil/Perfil';
import Comentar from '../../screens/Comentar/Comentar';
import EditProfile from '../../screens/EditProfile/editProfile';

const Tab = createBottomTabNavigator();
//const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
    return (
    <HomeStack.Navigator>
        <HomeStack.Screen name='Home'
                    component={Home}
                    options={{tabBarIcon:() => <FontAwesome name="home" size={24} color="black"></FontAwesome>,headerShown: false}}  
                />
        <HomeStack.Screen name='Comentar' component={Comentar}/> 
        <HomeStack.Screen name='Perfil' component={Perfil} />
    </HomeStack.Navigator>
    )
}

const BusquedaStack = createNativeStackNavigator();
function BusquedaStackScreen() {
  return (
    <BusquedaStack.Navigator>
        <BusquedaStack.Screen name='Busqueda' 
                    component={Busqueda}
                    options={{tabBarIcon:() => <FontAwesome name="search" size={24} color="black"></FontAwesome>,headerShown: false}} 
        />
        <BusquedaStack.Screen name='Perfil' component={Perfil} />
    </BusquedaStack.Navigator>
  )}

const MiPerfilYEditarStack = createNativeStackNavigator();
function MiPerfilYEditarStackScreen(){
    return(
        <MiPerfilYEditarStack.Navigator>
            <MiPerfilYEditarStack.Screen 
                name='Mi perfil'
                component={MiPerfil}
                options={{tabBarIcon:() => <Ionicons name="person" size={24} color="black" />,  headerShown: false }}
            />
            <MiPerfilYEditarStack.Screen  name='editProfile' component={EditProfile} />
        </MiPerfilYEditarStack.Navigator>
    )
    
}
function Menu (){

    return(
        
            
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name='Home'
                    component={HomeStackScreen}
                    options={{tabBarIcon:() => <FontAwesome name="home" size={24} color="black"></FontAwesome>}}  
                />
                <Tab.Screen name='Busqueda' 
                    component={BusquedaStackScreen}
                    options={{tabBarIcon:() => <FontAwesome name="search" size={24} color="black"></FontAwesome>}} 
                /> 
            
                <Tab.Screen name='New Post'
                    component={Posts}
                    options={{tabBarIcon:() => <FontAwesome name="cloud-upload" size={24} color="black" />,  headerShown: false }}
                />
                <Tab.Screen name='Mi perfil'
                    component={MiPerfilYEditarStackScreen}
                    options={{tabBarIcon:() => <Ionicons name="person" size={24} color="black" />,  headerShown: false }}
                /> 
                                
            </Tab.Navigator>
        
    )
}

export default Menu;