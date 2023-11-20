import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView,ImageBackground} from 'react-native';
import { db, auth } from '../../firebase/config';
import Post from '../../components/Post/Post';
import { SafeAreaView } from 'react-native-safe-area-context';

class Home extends Component {
    constructor(){
        super()
        this.state={
            listaPost: []
        }
        console.log(auth.currentUser.email)
    }

    componentDidMount(){ //apenas cargue la home, se renderiza y trae la info 
        //Traer datos
        db.collection('posts').orderBy('createdAt','desc').onSnapshot(
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




    render(){
        console.log(this.state);
        console.log(auth.currentUser.email)
        return(
            <ScrollView style={styles.scroll}>
                
            <View style={styles.containerGeneral}>
                <Text style={styles.titulo}>Entre Paginas</Text>
                

                <Text style={styles.TituloPosts}>Lista de Posts</Text>
                {
                    this.state.listaPost.length === 0 
                    ?
                    <Text>Cargando...</Text>
                    :
                    
                        <FlatList 
                            data= {this.state.listaPost}
                            keyExtractor={ unPost => unPost.id }
                            renderItem={ ({item}) => 

                            
                            <View style={styles.containerPost}>
                                <Post infoPost = { item } />
                                
                                <TouchableOpacity  onPress={()=>this.props.navigation.navigate('Comentar',{infoPost:item.id})}>
                                    <Text style={styles.comentario}>Comentarios : {item.datos.comentarios.length}</Text>
                                </TouchableOpacity>

                                {
                                    item.datos.owner == auth.currentUser.email ?
                                    <TouchableOpacity  onPress={()=>this.props.navigation.navigate('Mi perfil')}>
                                        <Text style={styles.autor}>Autor : {item.datos.owner}</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity  onPress={()=>this.props.navigation.navigate('Perfil',{owner:item.datos.owner})}>
                                        <Text style={styles.autor}>Autor : {item.datos.owner}</Text>
                                    </TouchableOpacity>
                                }
                                

                            </View>
                        
                        
                            }
                        />
                        
                }
                
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scroll:{
        backgroundColor:"white"
    },
    containerGeneral:{
        // paddingHorizontal:10,
         //marginTop: 20,
         flex:6,
         flexWrap: 'wrap',
         paddingHorizontal:30,
         paddingVertical:60,
         flexDirection: "colum",
         justifyContent:"flex-start",
         alingItems:"center",
         backgroundColor: 'white',
     },
    titulo:{
        flex:1,
        marginVertical:20,
        fontSize: 35,
        textAlign: 'center',
        alignSelf:"center",
        color:"#ff8fab",
        fontWeight: 'bold',
        fontFamily: 'tahoma',
    },
    TituloPosts:{
        fontSize: 20,
        color:"#EC698F",
        fontFamily: 'tahoma',
        marginTop:40,
    },
    containerPost:{
        marginVertical: 10,
        marginHorizontal:5,
        padding: 10,
        borderWidth: 2,
        borderColor: "#EC698F",
        borderRadius: 6,
        backgroundColor:'#FFF9F9',
    },
    comentario:{
        marginVertical:2,
        fontWeight: 'bold',
        fontFamily: 'tahoma',
    },
    autor:{
        marginVertical:2,
        fontWeight: 'bold',
        fontFamily: 'tahoma',
    }
})

export default Home;
