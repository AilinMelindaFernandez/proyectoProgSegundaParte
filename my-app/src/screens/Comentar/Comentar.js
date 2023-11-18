import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import MyCamera from '../../components/My-Camera.js/My-Camera';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
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
        console.log(this.state.listaComentariosOrd)
        return(
            <View style={styles.container}>
                <Text>Agregar comentarios</Text>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
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
                            <Text> Escriba para publicar</Text>   
                    }
                </View>
                    {
                        this.state.listaComentarios2.comentarios == 0?
                            <Text>NO HAY COMENTARIOS</Text>
                                :
                            <FlatList 
                                data= {this.state.listaComentarios2.sort((a,b) => a.createdAt - b.createdAt)}
                                inverted={true}
                                keyExtractor={item =>item.usuarioMail.toString()}
                                renderItem={({item}) => 
                                    <View>
                                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Perfil')}>{item.usuarioMail}</TouchableOpacity> 
                                        <Text>{item.comentario}</Text>
                                    </View>
                                }
                            />
                    } 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 10
    },
    camara:{
        // flex:7
    },
    form:{
        marginTop: 20
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    },

})


export default PostForm;
