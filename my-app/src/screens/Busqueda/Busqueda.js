import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { db,auth } from '../../firebase/config';
import { TabActions } from '@react-navigation/native';
import MiPerfil from '../../screens/MiPerfil/MiPerfil';
import Menu from '../../components/Menu/Menu';
class Busqueda extends Component {
    constructor(){
        super()
        this.state={
            inputBusqueda:'',
            resultado:[],
            hayOno: true
        }
        
    }
    busqueda(input){
        console.log(input);
        this.setState({inputBusqueda: input})
        
     
        db.collection('users').where('userName','==',input).onSnapshot(
            docs =>{
                let users =[];
                docs.forEach(doc => {
                    users.push({
                        id:doc.id,
                        data:doc.data()
                    })
                })
                this.setState({
                    resultado:users
                    
                })
                
            }
           
        )
        
        if(this.state.resultado.length == 0){
            this.setState({hayOno:false})
        }
        if(input == ""){
            this.setState({hayOno:true})
            console.log("probando input"+input)
        }
        
    }
    
   
    render(){
        console.log(this.state.resultado)
        return(
            <View>
                <View style={styles.formContainer}>
                    <Text>BUSQUEDA</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text)=>this.busqueda(text)}
                        placeholder='Buscar'
                        keyboardType='default'
                        value={this.state.inputBusqueda}
                    />
                    
                    
                </View>
                <View>
                    <Text>Resultados de la busqueda</Text>
                    { 
                    
                        this.state.resultado.length == 0 && this.state.hayOno == false?
                        <Text>no hay nada bue</Text>

                        :
                        <View>
                        <FlatList 
                           data= {this.state.resultado}
                           keyExtractor={item =>item.id.toString()}
                           renderItem={({item}) =>
                           
                           <View>
                                <Text>{item.data.userName},{item.data.owner}</Text>
                                {
                                    
                                    item.data.owner == auth.currentUser.email ?
                                    <View>
                                        <TouchableOpacity   onPress={ () => this.props.navigation.jumpTo('Mi perfil')}>
                                        <Text>iriiiii</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Perfil',{owner:item.data.owner})}>
                                        <Text>ir</Text>
                                    </TouchableOpacity>
                                 }
                           </View>}
                             

                           
                             
                         />
                           
                        </View>
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



export default Busqueda;