import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import MyCamera from '../../components/My-Camera.js/My-Camera';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList,ScrollView} from 'react-native';
import firebase from 'firebase';

class PostForm extends Component {
    constructor(props){
        super(props)
        console.log(this.props.route.params)
        this.state={
           comentario:'',
           idPost:this.props.route.params.infoPost,
           //usuario:auth.currentUser.email,
            listaComentarios2:[]
        }
        console.log(this.props.route.params)
        console.log(this.state.idPost)
        console.log(this.state.listaComentarios2)
    }
    componentDidMount(){
        db.collection('posts').where(firebase.firestore.FieldPath.documentId(), "==", this.state.idPost).onSnapshot(
            docs =>{
                let comentarios =[];
                docs.forEach(doc => {
                    comentarios.push({
                        id:doc.id,
                        data:doc.data()
                    })
                })
                this.setState({
                    listaComentarios2:comentarios[0].data.comentarios
                    
                })
            }
        )
    }
    //1)Completar la creación de comentario
    crearComentario(comentario){
        //Crear la colección Users
       let createdAt= Date.now()
       let  usuarioMail=auth.currentUser.email
       let comentarioYusuario = {comentario, usuarioMail,createdAt}
        db.collection('posts').doc(this.state.idPost).update({
            comentarios: firebase.firestore.FieldValue.arrayUnion(comentarioYusuario)
        })
        .then( res => {
            console.log("Creando nuevo comentario...");
            //Redirigir al usuario a la home del sitio.
            //this.props.navigation.navigate('Home') 
        })
        .catch( e => console.log(e))
    }
    
    render(){
        //console.log(this.state.listaComentarios2.sort((a, b) => a.createdAt - b.createdAt))
        //console.log(this.state.listaComentariosOrd)
        console.log(this.state.listaComentarios2)
        console.log(auth.currentUser)
        return(
            <ScrollView style={styles.scroll}>
            <View style={styles.containerGeneral}>
                <View style={styles.container}>
                    <Text style={styles.titulo}>Agregar comentarios</Text>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            editable
                            multiline
                            numberOfLines={4}
                            onChangeText={(text)=>this.setState({comentario: text})}
                            placeholder='Escribir...'
                            keyboardType='default'
                            value={this.state.comentario}
                        />
                        {
                            this.state.comentario.length > 0?
                                <TouchableOpacity style={styles.button} onPress={()=>this.crearComentario(this.state.comentario, Date.now())}>
                                 <Text style={styles.textButton}>Comentar</Text>    
                                </TouchableOpacity>
                            :
                                <Text style={styles.escribirParaPublicar}> Escriba para publicar</Text>   
                        }
                    </View>
                        {
                            this.state.listaComentarios2.length == 0?
                                <Text style={styles.noHay}>NO HAY COMENTARIOS</Text>
                                    :
                                <FlatList 
                                    data= {this.state.listaComentarios2.sort((a,b) => a.createdAt - b.createdAt)}
                                    inverted={true}
                                    keyExtractor={item =>item.usuarioMail.toString()}
                                    renderItem={({item}) => 
                                        <View style={styles.containerResultado}>
                                            {
                                                item.usuarioMail == auth.currentUser.email ?
                                                <TouchableOpacity onPress={ () => this.props.navigation.jumpTo('Mi perfil')}>
                                                    <Text style={styles.textResultadoEmail}>{item.usuarioMail}</Text>
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Perfil',{owner:item.usuarioMail})}>
                                                    <Text style={styles.textResultadoEmail}>{item.usuarioMail}</Text>
                                                </TouchableOpacity>
                                            }
                                            <View style={styles.textResultadoComentario}>
                                                <Text style={styles.textResultado}>Comentario:</Text>
                                                <Text style={styles.textResultado}>{item.comentario}</Text>
                                            </View> 
                                        </View>
                                    }
                                />
                        } 
                </View>
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
    form:{
        marginTop: 20
    },
    titulo:{
        flex:1,
        marginTop:20,
        fontSize: 35,
        textAlign: 'center',
        alignSelf:"center",
        color:"#ff8fab",
        fontWeight: 'bold',
        fontFamily: 'tahoma',
    },
    input:{
        backgroundColor:"#ff8fab",
        height:80,
        fontSize:15,
        color:"white",
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius:20, 
        /*borderBottomWidth:4,
        borderBottomColor:"white",*/
        marginVertical:20,
        
    },
    button:{
        backgroundColor:'#B9EEE1',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#79D3BE',
    },
    textButton:{
        color:'#FF5883',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'tahoma',
    },
    escribirParaPublicar:{
        color:'#FF5883',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'tahoma',
    },
    noHay:{
        color:"#39B89A",
        fontSize: 15,
        marginTop:30,
        textAlign:"center"
    },
    containerResultado:{
        height:"auto",
        paddingVertical:10,
        paddingHorizontal: 20,
        borderWidth:2,
        borderColor: '#EC698F',
        borderStyle: 'solid',
        borderRadius: 10,
        
        marginTop:30,
        flexWrap: 'wrap',
        flexDirection: "colum",
        justifyContent:"flex-start",
        alingItems:"center",
    },
    textResultadoEmail:{
        marginVertical:2,
        fontWeight: 'bold',
        fontFamily: 'tahoma',
    },
    textResultado:{
        marginVertical:2,
    },
    textResultadoComentario:{
        marginVertical:7,
    },
    imagen:{
        marginRight:10,
        height:50,
        width:50,
        borderRadius:"50%",
    }
})


export default PostForm;
