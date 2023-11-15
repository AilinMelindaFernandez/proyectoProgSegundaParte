import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet,FlatList,Image} from 'react-native';
import { db,auth } from '../../firebase/config';
import Post from '../../components/Post/Post';

class MiPerfil extends Component {
    constructor(){
        super()
        this.state={
            usuario:auth.currentUser.email,
            resultado: [],
            listaPost: []
        }
    }

    componentDidMount(){
        db.collection('users').where('owner','==',this.state.usuario).onSnapshot(
            docs =>{
                let users =[];
                docs.forEach(doc => {
                    users.push({
                        id:doc.id,
                        data:doc.data()
                    })
                })
                this.setState({
                    resultado:users
                })
                
            }
        
        )
        console.log(this.state.resultado)
        db.collection('posts').where('owner','==',this.state.usuario).onSnapshot(
            posteos => {
                let postsAMostrar = [];

                posteos.forEach( unPost => {
                    postsAMostrar.push(
                        {
                            id: unPost.id,
                            datos: unPost.data()
                        }
                    )
                })

                this.setState({
                    listaPost: postsAMostrar
                })
            }
        )   
    }
    logout(){
        auth.signOut();
         //Redirigir al usuario a la home del sitio.
         this.props.navigation.navigate('Login')
    }
    render(){
        console.log(this.state.usuario)
        console.log(this.state.resultado)
        return(
            <View>
                <Text>perfil</Text>
                <FlatList 
                    data= {this.state.resultado}
                    keyExtractor={item =>item.id.toString()}
                    renderItem={({item}) =>
                        <View>
                             <Text>
                                {item.data.userName}, 
                                {item.data.owner},
                                {item.data.miniBio},
                                    
                            </Text>
                        </View>
                            //falta poner la foto   
                    }
                />   
                 <TouchableOpacity onPress={()=>this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>


                <Text>Lista de Posts</Text>
                {
                    this.state.listaPost.length === 0 
                    ?
                    <Text>Cargando...</Text>
                    :
                    <View>
                    <Text>cantidad de post { this.state.listaPost.length}</Text>
                    <FlatList 
                        data= {this.state.listaPost}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => <Post infoPost = { item } /> }
                    />
                   </View> 
                }



            </View>
        )
    }
}



export default MiPerfil;
