import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { db, auth } from '../../firebase/config';
import Post from '../../components/Post/Post';

class Home extends Component {
    constructor(){
        super()
        this.state={
            listaPost: []
        }
    }

    componentDidMount(){ //apenas cargue la home, se renderiza y trae la info 
        //Traer datos
        db.collection('posts').onSnapshot(
            posteos => {
                let postsAMostrar = [];

                posteos.forEach( unPost => { // recorremos esa funcion , por cada elemento pusheamos, 
                    postsAMostrar.push(
                        {
                            id: unPost.id, // pongo el id ya que en caso que lo quiera borrar sepa cual es
                            datos: unPost.data() // aca tb va lo de camara
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
        // this.props.navigation.navigate('Login')
    }



    render(){
        console.log(this.state);
        return(
            <View>
                <Text>HOME</Text>
                <TouchableOpacity onPress={()=>this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>

                <Text>Lista de Posts</Text>
                {
                    this.state.listaPost.length === 0 
                    ?
                    <Text>Cargando...</Text>
                    :
                    <FlatList 
                        data= {this.state.listaPost}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => <Post infoPost = { item } /> }
                    />
                }
                
            </View>
        )
    }
}



export default Home;
