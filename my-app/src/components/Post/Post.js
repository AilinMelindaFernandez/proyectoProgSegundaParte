import react, { Component } from 'react';
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
            comments: this.props.infoPost.datos.comments.slice(0,4) // solo que muestre 4 
        }
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
   

    render(){
        console.log(this.props);
        return(
            <View style={styles.container}>
                 <Image 
                    source={{uri:this.props.infoPost.datos.fotoUrl}}
                    style={ styles.postImg }
                    resizeMode="center"
                />
                <Text>Texto: {this.props.infoPost.datos.textoPost}</Text>
                <Text>Autor: {this.props.infoPost.datos.owner}</Text>
                <Text style={styles.likeSection}>cantidad de likes: {this.state.cantidadDeLikes}</Text>
                <TouchableOpacity onPress={() => this.props.navigate('Comments', {infoPost: this.props.infoPost, navigation: this.props.navigation})}>
                    <Text style={styles.linkToComments}>{(this.props.infoPost.datos.comments ? this.props.infoPost.datos.comments.length : <Text>No</Text>)} comments</Text>
                </TouchableOpacity>

                <View>
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
    container:{
        marginVertical: 10,
        marginHorizontal:5,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
    },
    likeSection:{
        marginTop: 10,
        marginVertical: 5
    },
    likeButton:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        width:100
        
    },
    likeButtonText:{
        color:"#fff",
        textAlign:"center"
    },
    postImg:{
        marginTop: 20,
        marginBottom: 10,
        height:300,
        width:"100%"
    }
})

export default Post;
