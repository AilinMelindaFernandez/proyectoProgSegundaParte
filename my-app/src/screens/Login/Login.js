import React, { Component } from 'react';
import { auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet,ImageBackground} from 'react-native';


class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errorEmail:'',
            errorPass:''
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user !== null){
                this.props.navigation.navigate('Menu')
            }
        })
    }

    login(email, pass) {
        auth.signInWithEmailAndPassword(email, pass)
            .then(resp => {
                console.log('Login ok', resp);

                this.props.navigation.navigate('Home')
            })
            .catch((e) => { 
                console.log(e)
                if (e.code == "auth/invalid-email"){
                    this.setState({ errorEmail: "El formato del Email no es correcto"})
                }
                else{ this.setState({ errorEmail:""})}
                
                if(e.message == "{\"error\":{\"code\":400,\"message\":\"INVALID_LOGIN_CREDENTIALS\",\"errors\":[{\"message\":\"INVALID_LOGIN_CREDENTIALS\",\"domain\":\"global\",\"reason\":\"invalid\"}]}}")
                {
                    this.setState({ errorPass: "La contraseña no es correcta"})
                }
                else{ this.setState({ errorPass:""})}

            });
            //.catch(err => this.setState({ error: err.message }))
    }
    

    render() {
        return (
            <ImageBackground  style={styles.fondo} source={{uri:"https://i.postimg.cc/NMNTPb1T/circle-scatter-haikei-3.png"}}resizeMode='cover'>
            <View style={styles.Container}>
                <View style={styles.titulo}>
                    <Text style={styles.login}>Iniciar sesion</Text>
                </View>
                
                <View style={styles.formulario}>
                    <TextInput
                        style={styles.input}
                        keyboardType='email-address'
                        onChangeText={text => this.setState({ email: text })}
                        placeholder='Email'
                        value={this.state.email}
                    />
                    <Text>{this.state.errorEmail}</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.setState({ password: text })}
                        placeholder='Password'
                        secureTextEntry={true}
                        value={this.state.password}
                    />
                    <Text>{this.state.errorPass}</Text>


                    <View>
                        {
                            this.state.email.length > 0 && this.state.password.length>0?
                            <TouchableOpacity style={styles.button} onPress={() => this.login(this.state.email, this.state.password)}>
                                <Text style={styles.textButton}>Ingresar</Text>
                            </TouchableOpacity> 
                            : 
                            <Text  style={styles.completar}>Complete todos los campos</Text>
                        }
                    </View>
                    
                    <View>
                        <TouchableOpacity style={styles.registrarse} onPress={ () => this.props.navigation.navigate('Registro')}>
                            <Text style={styles.registrarseText}>
                                ¿No tienes una cuenta?
                                <Text style={styles.registrarseTextNegrita}>Registrate</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {
                        this.state.error !== '' ?
                            <Text>{this.state.error}</Text> :
                            ''
                    }
                </View>
            </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    fondo:{
        flex:6,
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
    },
    login:{
        marginVertical:20,
        fontSize: 60,
        textAlign: 'center',
        alignSelf:"center",
        color:"#ff8fab",
        fontWeight: 'bold',
        fontFamily: 'tahoma',
    },
    formulario:{
        flex:5,
        marginTop:80
    },
    input:{
        backgroundColor:"#ff8fab",
        height:20,
        fontSize:20,
        color:"white",
        paddingVertical: 35,
        paddingHorizontal: 40,
        borderRadius:70, 
        /*borderBottomWidth:4,
        borderBottomColor:"white",*/
        marginVertical:20,
    },
    button:{
        backgroundColor:"#fb6f92",
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius:70,
        borderStyle:"solid",
        borderWidth:4,
        borderColor:"#F3CFCE",
        marginTop:40,
    },
    textButton:{
        textAlign:"center",
        fontSize:20,
        color:"white",
        fontWeight: 'bold',
        fontFamily: 'tahoma',
    },
    registrarse:{
        marginVertical:25,
    },
    registrarseText:{
        fontSize:18,
        textAlign:"center",
        color:"#ff8fab",
    },
    registrarseTextNegrita:{
        fontWeight: 'bold',
    },
    completar:{
        backgroundColor:'#79D3BE',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        color:'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'tahoma',
    },
})


export default Login;
