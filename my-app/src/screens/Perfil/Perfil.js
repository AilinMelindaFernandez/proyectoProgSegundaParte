import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet,FlatList,Image} from 'react-native';
import { db,auth } from '../../firebase/config';
import Post from '../../components/Post/Post';
import Busqueda from '../Busqueda/Busqueda';
class Perfil extends Component {
    constructor(props){
        super(props)
        console.log(this.props.route.params)
        this.state={
            usuario:this.props.route.params.owner,
            resultado: [],
            listaPost: []
        }
        console.log(this.props)
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
                                {item.data.owner}     
                            </Text>
                            {
                                item.data.miniBio != "" ?
                                <Text>{item.data.miniBio}</Text>
                                :
                                <Text>no tiene bio</Text>
                            } 
                            {
                                item.data.fotoDePerfil != "" ?
                                    <Image 
                                    source={{uri:item.data.fotoDePerfil}}
                                    style={ styles.postImg }
                                    />
                                :
                                <Text>no tiene foto</Text>
                            }
                        </View>  
                    }
                />   
                 
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

const styles = StyleSheet.create({
    postImg:{
        marginTop: 20,
        marginBottom: 10,
        height:300,
        width:"100%"
    }
})


export default Perfil;