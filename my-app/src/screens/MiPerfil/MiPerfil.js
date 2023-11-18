import React, { Component} from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet,FlatList,Image} from 'react-native';
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
            nuevaPass: '',
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

    cambiarPass(nuevaPass){
        let usuario= auth.currentUser

        usuario.updatePassword(nuevaPass).then(() => {
            console.log("se cambio la contraseña")
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
    simpleAlertHandler = () => {
        Alert.alert(
            //title
            'Hello',
            //body
            'I am two option alert. Do you want to cancel me ?',
            [
              { text: 'Yes', onPress: () => console.log('Yes Pressed') },
              {
                text: 'No',
                onPress: () => console.log('No Pressed'),
                style: 'cancel',
              },
            ],
            { cancelable: false }
            //clicking out side of alert will not cancel
          );
      };

    render(){
        console.log(this.state.usuario)
        console.log(this.state.resultado)
        return(
            <View>
                <Text>perfil</Text>
                <TouchableOpacity onPress={()=>this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>


                <TextInput
                        style={styles.input}
                        keyboardType='visible-password'
                        onChangeText={text => this.setState({ nuevaPass: text })}
                        placeholder='Constraseña'
                        value={this.state.nuevaPass}
                    />
                <TouchableOpacity onPress={()=>this.cambiarPass(this.state.nuevaPass)}>
                    <Text>Cambiar contraseña</Text>
                </TouchableOpacity>

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
                            renderItem={ ({item}) => 
                            <View>
                            <Post infoPost = { item } 
                            />
                            <TouchableOpacity  onPress={()=>this.confirmarBorrarPost(item.id)}>
                                <Text>borrar</Text>
                            </TouchableOpacity>
                            </View>
                            }
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


export default MiPerfil;

