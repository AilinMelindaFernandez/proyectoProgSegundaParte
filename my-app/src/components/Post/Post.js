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
                <Text>Descripcion: {this.props.infoPost.datos.textoPost}</Text>
                
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Perfil')}>
                    <Text>Autor: {this.props.infoPost.datos.owner}</Text>
                </TouchableOpacity>
                
                
                {
               // <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Comentar')}>
                    //<Text style={styles.linkToComments}>
                       // {
                        //(this.props.infoPost.datos.comentarios ? 
                           //this.props.infoPost.datos.comentarios.length 
                            // : 
                            //<Text>No</Text>
                        
                       // )
                       //comments </Text>
                       // } 
                       
                //</TouchableOpacity>
                    }
                <View style={styles.likeSection}>
                <Text>cantidad de likes: {this.state.cantidadDeLikes}</Text>
                    {/* If ternario */}
                    {this.state.like ? 
                    <TouchableOpacity style={styles.likeButton} onPress={()=>this.unLike()}>
                        <Text style={styles.likeButtonText}>QuitarLike</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.likeButton } onPress={()=>this.likear()}>
                        <Text style={styles.likeButtonText}>Like</Text>
                    </TouchableOpacity>
                    // esta parte me da error proqu tenemos que cambiar la parte de this props. creoooo!!
                    


                    // {this.props.infoPost.datos.comments && this.props.infoPost.datos.comments.length > 0 ?
                    // <FlatList
                    //     data={this.state.comments}
                    //     keyExtractor={key => key.text + key.user}
                    //     renderItem={(comment) => <View  style={styles.unPostContainer}><TouchableOpacity onPress={() => this.props.navigation.navigate('OtherProfile', { userData: comment.item.userEmail, navigation: this.props.navigation})}
                    //     initialNumToRender={4}>
                    //     <Text style={styles.commenterEmail}>{comment.item.userEmail}:</Text>
                    // </TouchableOpacity>
                    // <Text>{comment.item.text}</Text></View>}
                    // /> : null}
                    
                    
                    }
      
                </View>    
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        paddingTop: 100,
        paddingBottom: 40,
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
        backgroundColor:'#EC698F',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius:70, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#F1ADB9',
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
