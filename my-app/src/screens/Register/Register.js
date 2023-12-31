import react, { Component } from 'react';
import { db,auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet,ImageBackground,ScrollView} from 'react-native';
import MyCamera from '../../components/My-Camera.js/My-Camera';
//const imagen="../imgen.png";
class Register extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            userName:'',
            miniBio:'',
            fotoDePerfil:'',
            password:'',
            error: '',
            showCamera: false,
        }
    }
    componentDidMount(){
        console.log("Chequear si el usuario está loguado en firebase.");
        auth.onAuthStateChanged( user => {
            console.log(user)
            if( user ){
                //Redirigir al usuario a la home del sitio.
                this.props.navigation.navigate('Menu')

            }

        } )
        
    }
    
    register (email, userName, miniBio, fotoDePerfil, pass){
        auth.createUserWithEmailAndPassword(email, pass)
            .then( response => {
                //Cuando firebase responde sin error
                console.log('Registrado ok', response);
                 //Cambiar los estados a vacío como están al inicio.
                 //Crear la colección Users
                db.collection('users').add({
                    owner: auth.currentUser.email,
                    userName: userName,
                    miniBio: miniBio,
                    fotoDePerfil:fotoDePerfil,
                    createdAt: Date.now(), 
                })
                .then( res => console.log(res))
            })
            .catch( error => {
                //Cuando Firebase responde con un error
                console.log(error);
            })
    }
    traerUrlDeFoto(url){
        this.setState({
            fotoDePerfil:url,
            showCamera: false,
        })
    }
    render(){
        console.log(this.state.fotoDePerfil)
        return(
            <ScrollView style={styles.scroll}>
            <ImageBackground  style={styles.fondo} source={{uri:"https://i.postimg.cc/NMNTPb1T/circle-scatter-haikei-3.png"}}resizeMode='cover'>
                <View style={styles.Container}>
                    
                    <View style={styles.titulo}>
                        <Text style={styles.Registrarse}>Sing Up</Text>
                    </View>
                    <View style={styles.formulario}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text)=>this.setState({email: text,error: '' })}
                            placeholder='Email *'
                            keyboardType='email-address'
                            value={this.state.email}
                            />
                        <TextInput
                            style={styles.input}
                            onChangeText={(text)=>this.setState({userName: text,error: '' })}
                            placeholder='User Name *'
                            keyboardType='default'
                            value={this.state.userName}
                            />
                        <TextInput
                            style={styles.input}
                            onChangeText={(text)=>this.setState({miniBio: text})}
                            placeholder='Mini Bio'
                            keyboardType='default'
                            value={this.state.miniBio}
                            />

                        {
                        this.state.showCamera ?
                            <View style={styles.camara}>
                                <MyCamera traerUrlDeFoto={url => this.traerUrlDeFoto(url)} />
                            </View>
                            :
                            <TouchableOpacity style={styles.input} onPress={() => this.setState({ showCamera: true })}>
                                <Text style={styles.fotoDePerfilText}>Foto de perfil</Text>
                            </TouchableOpacity>
                            //<MyCamera style={styles.camara} traerUrlDeFoto = {url=>this.traerUrlDeFoto(url)} />
                         }  
                        <TextInput
                            style={styles.input}
                            onChangeText={(text)=>this.setState({password: text})}
                            placeholder='Password *'
                            keyboardType='default'
                            secureTextEntry={true}
                            value={this.state.password}
                        />
                        <Text>{this.state.error}</Text>
                        {
                            this.state.email.length > 0 && this.state.password.length>0?
                                <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.userName, this.state.miniBio, this.state.fotoDePerfil, this.state.password)}>
                                    <Text style={styles.textButton}>Registrarse</Text>    
                                </TouchableOpacity>
                                :
                                <Text style={styles.completar}>Complete todos los campos</Text>
                        }
                        <TouchableOpacity style={styles.login} onPress={ () => this.props.navigation.navigate('Login')}>
                            <Text style={styles.loginText}>
                                Ya tengo un cuenta. 
                                <Text style={styles.loginTextNegrita}>Ir al login</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    scroll:{
        backgroundColor:"#e8e8e8"
    },
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
    Registrarse:{
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
        marginTop:50
    },
    input:{
        backgroundColor:"#ff8fab",
        height:20,
        fontSize:20,
        color:"white",
        paddingVertical: 30,
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
    fotoDePerfilText:{
        color:"white",
        fontWeight: 'bold',
        fontFamily: 'tahoma',
    }
})
export default Register;