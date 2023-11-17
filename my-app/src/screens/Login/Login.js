import react, { Component } from 'react';
import { auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';


class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user !== null){
                this.props.navigation.navigate('TabNavigation')
            }
        })
    }

    login(email, password) {
        auth.signInWithEmailAndPassword(email, password)
            .then(resp => this.props.navigation.navigate('TabNavigation'))
            .catch(err => this.setState({ error: err.message }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Iniciar sesion</Text>
                <View style={styles.container2}>
                    <TextInput
                        style={styles.input}
                        keyboardType='email-address'
                        onChangeText={text => this.setState({ email: text })}
                        placeholder='Email'
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.setState({ password: text })}
                        placeholder='Password'
                        secureTextEntry={true}
                        value={this.state.password}
                    />

                    

                    
                    <View>
                        {
                            this.state.email.length > 0 && this.state.password.length>0?
                            <TouchableOpacity onPress={() => this.login(this.state.email, this.state.password)} style={styles.boton}>
                            <Text style={styles.ingresar}>Ingresar</Text>
                            </TouchableOpacity> 
                            : 'Complete todos los campos'
                            
                        }
                        

                    </View>
                    
                    <View>
                        <Text>¿No tienes una cuenta?</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                            <Text>Registrate</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        this.state.error !== '' ?
                            <Text>{this.state.error}</Text> :
                            ''
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'blue',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    }

})


export default Login;
