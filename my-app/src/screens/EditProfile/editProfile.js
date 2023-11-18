import React, { Component } from 'react';
import { db, auth } from '../../firebase/config'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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
            mensajeBio:''
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



    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Edita tus datos</Text>
                <View style={styles.box}>
                    <Text style={styles.alert}>{this.state.error}</Text>

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

                    {
                    this.state.showCamera ?
                            <View style={styles.camara}>
                                <MyCamera traerUrlDeFoto={url => this.traerUrlDeFoto(url)} />
                            </View>
                            :
                            <View>
                            <TouchableOpacity style={styles.input} onPress={() => (this.setState({ showCamera: true }),this.editarFoto(this.state.fotoDePerfil))}>
                                <Text>Foto de perfil</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.input} onPress={() => (this.editarFoto(this.state.fotoDePerfil))}>
                            <Text>Enviar nueva foto</Text>
                            </TouchableOpacity>
                            </View>
                            //<MyCamera style={styles.camara} traerUrlDeFoto = {url=>this.traerUrlDeFoto(url)} />
                    }  


                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1f2124',
        height: '100%',
        backgroundColor: 'white',
        height: '100%',
        backgroundColor: '#1f2124'
    },
    box: {
        backgroundColor: '#c7f7f7',
        width: '80%',
        borderRadius: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '8%'
    },
    input: {
        borderRadius: 5,
        backgroundColor: 'white',
        width: '80%',
        height: '5%',
        padding: '5%',
        margin: '8%'
    },
    alert: {
        color: 'black'
    },
    button: {
        backgroundColor: 'white',
        borderRadius: '5%'
    },
    text: {
        fontFamily: 'Oswald, sans-serif',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',   
    }
})

export default EditProfile;