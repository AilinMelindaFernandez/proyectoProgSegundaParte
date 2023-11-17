import react, { Component } from 'react';
import { db,auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet,ImageBackground} from 'react-native';
import MyCamera from '../../components/My-Camera.js/My-Camera';
//const imagen="../imgen.png";
class Register extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            userName: '',
            miniBio: '',
            error: '',
            photo: '',
            showCamera: false,
        }
    }

    registerUser(email, password) {
        
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                db.collection('users').add ({
                    owner: auth.currentUser.email,
                    userName: this.state.userName,
                    miniBio: this.state.miniBio,
                    photo: this.state.photo
                    
                }).then(() => this.props.navigation.navigate('Login'))
            })     

            .catch (err => this.setState({error: err.message}))
          

    }
    onImageUpload(url) {
        this.setState({
            photo: url,
            showCamera: false,
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Registrate</Text>
                <View style={styles.container2}>

                    <TextInput
                        style={styles.input}
                        placeholder='email'
                        keyboardType='email-address'
                        onChangeText={text => this.setState({ email: text, error: '' })}
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='contraseña'
                        keyboardType='default'
                        onChangeText={text => this.setState({ password: text, error: '' })}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='usuario'
                        keyboardType='default'
                        onChangeText={text => this.setState({ userName: text, error: '' })}
                        value={this.state.userName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Mini biografía'
                        keyboardType='default'
                        onChangeText={text => this.setState({ miniBio: text, error: '' })}
                        value={this.state.miniBio}
                    />


                    {
                        this.state.showCamera ?
                            <View style={styles.foto}>
                                <MyCamera onImageUpload={url => this.onImageUpload(url)} />
                            </View>
                            :
                            <TouchableOpacity onPress={() => this.setState({ showCamera: true })}>
                                <Text>Foto de perfil</Text>
                            </TouchableOpacity>
                    }


                    <View>
                        {
                            this.state.email.length > 0 && this.state.password.length > 0 && this.state.miniBio.length > 0 ?
                                <TouchableOpacity onPress={() => this.registerUser(this.state.email, this.state.password, this.state.userName, this.state.photo, this.state.miniBio)} style={styles.boton}>
                                    <Text style={styles.texto}>Registra tu usuario</Text>
                                </TouchableOpacity>
                                : 'Complete todos los campos'
                        }
                    </View>

                    <View>
                        <Text>¿Ya estas registrado?</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text>Inicia sesión</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.error !== '' ?
                            <Text>{this.state.error}</Text> : ''
                    }
                </View>
            </View>
        )
    }
}



export default Register



const styles = StyleSheet.create({
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
    },
    Registrarse:{
       marginVertical:20,
        fontSize: 60,
        textAlign: 'center',
        alignSelf:"center",
        color:"white",
        fontWeight: 'bold',
        fontFamily: 'tahoma',
    },
    formulario:{
        flex:5,
        marginTop:50
    },
    input:{
        backgroundColor:"#ff8fab",
        height:20,
        fontSize:20,
        color:"white",
        paddingVertical: 40,
        paddingHorizontal: 40,
        borderRadius:70, 
        /*borderBottomWidth:4,
        borderBottomColor:"white",*/
        marginVertical:20,
    },
    button:{
        backgroundColor:"white",
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius:70, 
        marginTop:40,

    },
    textButton:{
        textAlign:"center",
        fontSize:20,
        color:"#fb6f92",
        fontWeight: 'bold',
        fontFamily: 'tahoma',
    },
    login:{
        marginVertical:25,
    },
    loginText:{
        fontSize:18,
        textAlign:"center",
        color:"#ffc2d1",
    },
    loginTextNegrita:{
        fontWeight: 'bold',
    }

})


// export default Register;
