import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import MyCamera from '../../components/My-Camera.js/My-Camera';
import {TextInput, TouchableOpacity, View, Text, StyleSheet,ScrollView} from 'react-native';

class PostForm extends Component {
    constructor(){
        super()
        this.state={
           textoPost:'',
           fotoUrl:'',
        }
    }

    //1)Completar la creación de posts
    crearPost(owner, textoPost, fotoUrl, createdAt){
        //Crear la colección Users
        db.collection('posts').add({
            owner: owner, //auth.currentUser.email,
            textoPost: textoPost, //this.state.textoPost,
            fotoUrl:fotoUrl,
            likes:[],
            createdAt: createdAt ,
            comentarios: []
        })
        .then( res => {
            console.log("Creando nuevo post...");
            //Redirigir al usuario a la home del sitio.
            this.props.navigation.navigate('Home')
            this.setState({
                textoPost:'',
                fotoUrl:''
            })
        })
        .catch( e => console.log(e))
    }

    traerUrlDeFoto(url){
        this.setState({
            fotoUrl:url
        })
    }

    render(){
        return(
            <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <Text style={styles.titulo}>New Post</Text>
                {/* Corregir estilos para que se vea bien la cámara */}
                <MyCamera style={styles.camara} traerUrlDeFoto = {url=>this.traerUrlDeFoto(url)} />
                <View style={styles.form}>
                    <Text style={styles.tituloDescripcion}>Descripcion</Text>
                    <TextInput
                        style={styles.input}
                        editable
                        multiline
                        numberOfLines={4}
                        onChangeText={(text)=>this.setState({textoPost: text})}
                        placeholder='Escribir...'
                        keyboardType='default'
                        value={this.state.textoPost}
                        />
                    <TouchableOpacity style={styles.button} onPress={()=>this.crearPost(auth.currentUser.email, this.state.textoPost, this.state.fotoUrl, Date.now())}>
                        <Text style={styles.textButton}>Postear</Text>    
                    </TouchableOpacity>
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
    container:{
         // paddingHorizontal:10,
        //marginTop: 20,
        
        flexWrap: 'wrap',
        paddingHorizontal:30,
        paddingVertical:60,
        flexDirection: "colum",
        justifyContent:"flex-start",
        alingItems:"center",
        backgroundColor: 'white',
    },
    camara:{
        // flex:7
    },
    form:{
        marginTop: 60
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
    tituloDescripcion:{
        fontSize: 20,
        color:"#EC698F",
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

})


export default PostForm;
