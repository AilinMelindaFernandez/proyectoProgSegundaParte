import React, { Component} from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet,FlatList,Image,ScrollView} from 'react-native';
import { db,auth,firebase } from '../../firebase/config';
import Post from '../../components/Post/Post';

class MiPerfil extends Component {
    
    constructor(){
        super()
        console.log(auth.currentUser.email)
        this.state={
            usuario:auth.currentUser.email,
            resultado: [],
            listaPost: [],
        }
        console.log(this.state.usuario)
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
                    resultado:users,
                    usuario:auth.currentUser.email
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

    borrarPost(IdPostParaBorrar){
        db.collection('posts').doc(IdPostParaBorrar).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });

    }
    
   
    logout(){
        auth.signOut();
         //Redirigir al usuario a la home del sitio.
         this.props.navigation.navigate('Login')
         console.log("se deslogueo")
    }


    render(){
        console.log(this.state.resultado)
        console.log(this.state.usuario)
        console.log(this.state.resultado[0])
        return(
            <ScrollView style={styles.scroll}>
            <View style={styles.containerGeneral}>

                <View style={styles.LogOutEditar}>
                    <TouchableOpacity style={styles.editar} onPress={()=>this.props.navigation.navigate('editProfile',{idDocumento:this.state.resultado[0].id})}>
                        <Text style = { styles.textButton }>EDITAR PERFIL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logout} onPress={()=>this.logout()}>
                        <Text style = { styles.textButton }>Logout</Text>
                    </TouchableOpacity>
                </View>

                <FlatList 
                    data= {this.state.resultado}
                    keyExtractor={item =>item.id.toString()}
                    renderItem={({item}) =>
                        <View style={styles.info}>
                            <View style={styles.infoFotoUsuCant}>
                                <View style={styles.containerFoto}>
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

                                <Text style={ styles.usuario }>{item.data.userName} </Text>
                                <Text style={ styles.mail }>{item.data.owner}</Text>     
                                
                                <View style={styles.cantPostsContainer}>
                                    <Text style={styles.cantPosts}>{ this.state.listaPost.length}</Text>
                                    <Text style={styles.cantPosts}>CANTIDAD DE POSTS </Text>
                                </View>
                                

                            </View>
                            {
                                item.data.miniBio != "" ?
                                <Text style={styles.bio}>{item.data.miniBio}</Text>
                                :
                                <Text style={styles.bio}>El usuario no tieen Bio</Text>
                            } 
                            
                           
                        </View>
                             
                    }
                />   
                

                <Text style={styles.lista}>Lista de Posts</Text>
                {
                    this.state.listaPost.length === 0 
                    ?
                    <Text>Cargando...</Text>
                    :
                    <View>
                        <FlatList 
                            data= {this.state.listaPost}
                            keyExtractor={ unPost => unPost.id }
                            renderItem={ ({item}) => 
                          
                            <View style={styles.containerPost}>
                                 { console.log(item)}
                                <Post infoPost = { item } />

                                <TouchableOpacity  onPress={()=>this.props.navigation.navigate('Comentar',{infoPost:item.id})}>
                                    <Text style={styles.comentario}>Comentarios : {item.datos.comentarios.length}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity  style={styles.borrar} onPress={()=>this.borrarPost(item.id)}>
                                    <Text style = { styles.textButton }>borrar</Text>
                                </TouchableOpacity>
                            </View>
                            }
                        />
                   </View> 
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
         //flex:6,
         flexWrap: 'wrap',
         paddingHorizontal:30,
         paddingVertical:60,
         flexDirection: "colum",
         justifyContent:'flex-start',
         alingItems:"center",
         backgroundColor: 'white',
    },
    LogOutEditar:{
        flexWrap: 'wrap',
         flexDirection: "row",
         justifyContent:'flex-end',
         alingItems:"center",
         //backgroundColor:"red"
         marginBottom:10
    },
    logout:{
        backgroundColor:'#FEC9D7',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
    },
    editar:{
        backgroundColor:'#79D3BE',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
    },
    info:{
        //backgroundColor:"blue",
        marginBottom:30,
    },
    infoFotoUsuCant:{
        flexWrap: 'wrap',
        // paddingHorizontal:30,
         //paddingVertical:60,
         flexDirection: "colum",
         justifyContent:'center',
         alingItems:"center",
         backgroundColor: 'white',
    },
    containerFoto:{
        flexWrap: 'wrap',
       // backgroundColor:"green",
        flexDirection: "row",
        justifyContent:'center',
        alingItems:"center",

    },
    postImg:{
        marginTop: 20,
        marginBottom: 10,
        height:100,
        width:100,
        borderRadius:"50%",
       // backgroundColor:"pink",
    },
    usuario:{
       // backgroundColor:"pink",
        textAlign:'center',
        fontSize:20,
        fontWeight: 'bold',
        marginBottom:5,
    },
    mail:{
      //  backgroundColor:"red",
        textAlign:'center',
    },
    cantPostsContainer:{
        marginVertical:13,
    },
    cantPosts:{
       textAlign:'center',
       fontSize:13
    },
    lista:{
        fontSize: 20,
        color:"#EC698F",
        fontFamily: 'tahoma',
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
    borrar:{
        marginTop:15,
        backgroundColor:'#FEC9D7',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        width:"30%",
    },
    textButton:{
        color:'#FF5883',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'tahoma',
    },
    bio:{
        marginTop:10
    },
    comentario:{
        marginVertical:2,
        fontWeight: 'bold',
        fontFamily: 'tahoma',
    }
  
})


export default MiPerfil;

