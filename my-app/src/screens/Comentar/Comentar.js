import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import MyCamera from '../../components/My-Camera.js/My-Camera';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import firebase from 'firebase';

class PostForm extends Component {
    constructor(props){
        super(props)
        this.state={
           comentario:'',
           idPost:this.props.route.params.infoPost,
           //usuario:auth.currentUser.email,
          
        }
        console.log(this.props.route.params)
        console.log(this.state.idPost)
    }

    //1)Completar la creación de comentario
    crearComentario(comentario){
        //Crear la colección Users
       let  usuarioMail=auth.currentUser.email
       let comentarioYusuario = {comentario, usuarioMail}
        db.collection('posts').doc(this.state.idPost).update({
            comentarios: firebase.firestore.FieldValue.arrayUnion(comentarioYusuario)
        })
        .then( res => {
            console.log("Creando nuevo comentario...");
            //Redirigir al usuario a la home del sitio.
            this.props.navigation.navigate('Home')
        })
        .catch( e => console.log(e))
    }


    render(){
        return(
            <View style={styles.container}>
                <Text>New Post</Text>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text)=>this.setState({comentario: text})}
                        placeholder='Escribir...'
                        keyboardType='default'
                        value={this.state.comentario}
                        />
                    <TouchableOpacity style={styles.button} onPress={()=>this.crearComentario(this.state.comentario, Date.now())}>
                        <Text style={styles.textButton}>Postear</Text>    
                    </TouchableOpacity>
                </View>
                
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
