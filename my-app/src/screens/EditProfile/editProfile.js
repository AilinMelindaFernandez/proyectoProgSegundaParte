import React, { Component } from 'react';
import { db, auth } from '../../firebase/config'
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import firebase from 'firebase';
import MyCamera from '../../components/My-Camera.js/My-Camera';


class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            newPassword: '',
            userName: '',
            miniBio: '',
            fotoDePerfil:'',
            showCamera: false,
            error: '',
            mensajePass:'',
            mensajeUsuario:'',
            mensajeBio:'',
            passwordBorrar:''
            
        }
    console.log(this.props)
    }

    reauthenticate = (password) => {
        const user = auth.currentUser;
        const cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
        return user.reauthenticateWithCredential(cred);
    }

    changePassword = () => {
        this.reauthenticate(this.state.password)
            .then(() => {
                auth.currentUser.updatePassword(this.state.newPassword)
                    .then(() => {
                        this.setState({ mensajePass: "Password changed" })
                    })
                    .catch((e) => { console.log(e); });
            })
            .catch((e) => { console.log(e) });
    }


    editarNombre() {

        db.collection('users')
            .doc(this.props.route.params.idDocumento)
            .update({
                userName: this.state.userName,
            })
            .then(() => {
                this.setState({ mensajeUsuario: "Se cambio el nombre" });//poner para que se vea con mss
            })
    }
    editarBio() {
        db.collection('users')
            .doc(this.props.route.params.idDocumento)
            .update({
                miniBio: this.state.miniBio,
            })
            .then(() => {
                this.setState({ mensajeBio: "Se cambio la bio" });
            })
    }


    traerUrlDeFoto(url){
        this.setState({
            fotoDePerfil:url,
            showCamera: false,
        })
    }
    editarFoto(){
        db.collection('users')
            .doc(this.props.route.params.idDocumento)
            .update({
                fotoDePerfil: this.state.fotoDePerfil,
            })
            .then(() => {
                this.setState({ mensajeBio: "Se cambio la foto" });
            })
    }

    eliminarPerfil(){
        const user = auth.currentUser;
        const credential =   firebase.auth.EmailAuthProvider.credential(user.email, this.state.passwordBorrar)
        user.reauthenticateWithCredential(credential).then(() => {
            // User re-authenticated.
            db.collection('users').doc(this.props.route.params.idDocumento).delete().then(() => { 
            user.delete().then(() => {
                // User deleted.
                console.log("se borro")
                this.props.navigation.navigate('Registro')
                })
            })
            
          }).catch((error) => {
                console.log(error)
            });
    }



    render() {
        return (
            <ScrollView style={styles.scroll}>
            <View style={styles.Container}>

                <Text style={styles.titulo}>Edita tus datos</Text>

                <View style={styles.formulario}>
                    <Text style={styles.alert}>{this.state.error}</Text>
                    

                    <View style={styles.cajas}>
                        <TextInput
                            placeholder="Password Actual para borrar el perfil"
                            secureTextEntry={true}
                            onChangeText={text => { this.setState({ passwordBorrar: text }) }}
                            value={this.state.passwordBorrar}
                            style={styles.input}
                        />
                        <TouchableOpacity style={styles.text} onPress={()=> this.eliminarPerfil()} >
                            <Text style={styles.button} >Borrar perfil</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cajas}>
                        <TextInput
                            placeholder="Password Actual"
                            secureTextEntry={true}
                            onChangeText={text => { this.setState({ password: text }) }}
                            value={this.state.password}
                            style={styles.input}
                        />

                        <TextInput
                            placeholder="New password"
                            secureTextEntry={true}
                            onChangeText={text => { this.setState({ newPassword: text }) }}
                            value={this.state.newPassword}
                            style={styles.input}
                        />
                        <TouchableOpacity onPress={() => this.changePassword()}>
                            <Text style={styles.button}>Change password</Text>
                            <Text>{this.state.mensajePass}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cajas}>
                        <TextInput
                            placeholder='username'
                            keyboardType='default'
                            onChangeText={text => this.setState({ userName: text })}
                            value={this.state.userName}
                            style={styles.input}
                        />
                        <TouchableOpacity onPress={() => this.editarNombre()}>
                            <Text style={styles.button}>Editar</Text>
                            <Text>{this.state.mensajeUsuario}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cajas}>
                        <TextInput
                            placeholder='miniBio'
                            keyboardType='default'
                            onChangeText={text => this.setState({ miniBio: text })}
                            value={this.state.miniBio}
                            style={styles.input}
                        />
                        <TouchableOpacity onPress={() => this.editarBio()}>
                            <Text style={styles.button}>Editar</Text>
                            <Text>{this.state.mensajeBio}</Text>
                        </TouchableOpacity>
                    </View>

                   

                    {
                    this.state.showCamera ?
                            <View style={styles.camara}>
                                <MyCamera traerUrlDeFoto={url => this.traerUrlDeFoto(url)} />
                            </View>
                            :
                            <View style={styles.cajas}>
                                <TouchableOpacity  onPress={() => (this.setState({ showCamera: true }))}>
                                    <Text style={styles.input}>Foto de perfil</Text>
                                </TouchableOpacity>

                                <TouchableOpacity  onPress={() => (this.editarFoto(this.state.fotoDePerfil))}>
                                <Text style={styles.button}>Enviar nueva foto</Text>
                                </TouchableOpacity>
                            </View>
                            //<MyCamera style={styles.camara} traerUrlDeFoto = {url=>this.traerUrlDeFoto(url)} />
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
    Container:{
        flex:6,
        flexWrap: 'wrap',
        paddingHorizontal:30,
        paddingVertical:60,
        flexDirection: "colum",
        justifyContent:"flex-start",
        alingItems:"center",
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
    input: {
        backgroundColor:"#ff8fab",
        height:20,
        fontSize:15,
        color:"white",
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius:70, 
        /*borderBottomWidth:4,
        borderBottomColor:"white",*/
        //marginVertical:20,
        marginTop:20,
        marginBottom:10,
    },
   
    alert: {
        color: 'black'
    },
    button: {
        backgroundColor:'#B9EEE1',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#79D3BE',

        textAlign:"center",
        fontFamily: 'tahoma',

    },
    cajas:{
        marginVertical:20,
        borderColor: '#EC698F',
        borderStyle: 'solid',
        borderRadius: 10,
    },
   
})

export default EditProfile;