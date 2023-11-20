import React, { Component } from 'react';
import {Image, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';

class Post extends Component {
    constructor(props){
        super(props)
        console.log(props)
        this.state={
            like: false,
            cantidadDeLikes: this.props.infoPost.datos.likes.length,
            //comments: this.props.infoPost.datos.comments.slice(0,4) // solo que muestre 4 
        
        }
        console.log(this.props.infoPost.datos.comentarios )
    }

    componentDidMount(){
        //Indicar si el post ya está likeado o no.
        if(this.props.infoPost.datos.likes.includes(auth.currentUser.email)){
            this.setState({
                like: true
            })
        }
    }


   likear(){
    

    //update en base de datos
    db.collection('posts').doc(this.props.infoPost.id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then( res => {
        this.setState({
            like: true,
            cantidadDeLikes: this.props.infoPost.datos.likes.length
        })
    })
    .catch( e => console.log(e))
   }

   unLike(){
    //Quitar del array de likes al usario que está mirando el post.
    db.collection('posts').doc(this.props.infoPost.id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then( res => {
        this.setState({
            like: false,
            cantidadDeLikes: this.props.infoPost.datos.likes.length
        })
    })
    .catch( e => console.log(e))
   }
   
   Comentar(){
        this.props.navigation.navigate('Comentar')

   }

    render(){
        console.log(this.props);
        return(
            <View style={styles.container}>
                
                <Image 
                    source={{uri:this.props.infoPost.datos.fotoUrl}}
                    style={ styles.postImg }
                    resizeMode="center"
                />
                <Text style={styles.DescricipnYLikes}>Descripcion:</Text> 
                <Text>{this.props.infoPost.datos.textoPost}</Text>
                
                
                <View style={styles.likeSection}>
                <Text style={styles.DescricipnYLikes}>Cantidad de likes: {this.state.cantidadDeLikes}</Text>
                    {/* If ternario */}
                    {this.state.like ? 
                    <TouchableOpacity style={styles.likeButton} onPress={()=>this.unLike()}>
                        <Text style={styles.likeButtonText}>QuitarLike</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.likeButton } onPress={()=>this.likear()}>
                        <Text style={styles.likeButtonText}>Like</Text>
                    </TouchableOpacity>
                    }
      
                </View>    
            </View>
        )
    }
}
const styles = StyleSheet.create({
    DescricipnYLikes:{
        marginVertical:2,
        fontWeight: 'bold',
        fontFamily: 'tahoma',
    },
    likeSection:{
        marginTop: 10,
        marginVertical: 5,
        flexWrap: 'wrap',
        flexDirection: "row",
        justifyContent:'space-between',
        alingItems:"center",
    },
    likeButton:{
        backgroundColor:'#79D3BE',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius:70, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#39B89A',
        width:100
        
    },
    likeButtonText:{
        color:"#fff",
        textAlign:"center"
    },
    postImg:{
        marginBottom: 10,
        height:300,
        width:"100%",
    }
})

export default Post;
