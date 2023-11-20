import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList,Image,ScrollView} from 'react-native';
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
        console.log(auth.currentUser.email)
    }
    busqueda(input){
        console.log(input);
        this.setState({inputBusqueda: input})
        
     
        db.collection('users').where('owner','==',input).onSnapshot(
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
            <ScrollView style={styles.scroll}>
            <View style={styles.formContainer}>
                <View >
                    <Text style={styles.titulo}>BUSQUEDA</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text)=>this.busqueda(text)}
                        placeholder='Buscar usuario por Email'
                        keyboardType='default'
                        value={this.state.inputBusqueda}
                    />
                    
                    
                </View>
                <View style={styles.containerResultadoYtitulo}>
                    <Text style={styles.TituloResultado}>Resultados de la busqueda</Text>
                    { 
                    
                        this.state.resultado.length == 0 && this.state.hayOno == false?
                        <Text style={styles.noHay}>No hay resultados que coincidan con la busqueda</Text>

                        :
                        <View>
                        <FlatList 
                           data= {this.state.resultado}
                           keyExtractor={item =>item.id.toString()}
                           renderItem={({item}) =>
                           
                           <View>
                                {
                                    
                                    item.data.owner == auth.currentUser.email ?
                                        <TouchableOpacity  style={styles.containerResultado} onPress={ () => this.props.navigation.navigate('Mi perfil')}>
                                            <Image style={styles.imagen} source={{uri:item.data.fotoDePerfil}} resizeMode='cover'/>
                                            <View tyle={styles.containerText}>
                                                <Text style={styles.textResultado}>{item.data.userName}</Text>
                                                <Text style={styles.textResultado}>{item.data.owner}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    :
                                        <TouchableOpacity style={styles.containerResultado} onPress={ () => this.props.navigation.navigate('Perfil',{owner:item.data.owner})}>
                                            <Image style={styles.imagen} source={{uri:item.data.fotoDePerfil}} resizeMode='cover'/>
                                            <View tyle={styles.containerText}>
                                                <Text style={styles.textResultado}>{item.data.userName}</Text>
                                                <Text style={styles.textResultado}>{item.data.owner}</Text>
                                            </View>                                        
                                        </TouchableOpacity>
                                 }
                           </View>}
                             

                           
                             
                         />
                           
                        </View>
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
    
    formContainer:{
       // paddingHorizontal:10,
        //marginTop: 20,
        flex:6,
        flexWrap: 'wrap',
        paddingHorizontal:30,
        paddingVertical:60,
        flexDirection: "colum",
        justifyContent:"flex-start",
        alingItems:"center",
        backgroundColor: 'white',
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
    input:{
        backgroundColor:"#ff8fab",
        height:20,
        fontSize:20,
        color:"white",
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius:70, 
        /*borderBottomWidth:4,
        borderBottomColor:"white",*/
        marginVertical:20,
        
    },
    containerResultadoYtitulo:{
        marginTop:40,
        marginBottom:30,
    },
    TituloResultado:{
        fontSize: 20,
        color:"#EC698F",
        fontFamily: 'tahoma',
    },
    noHay:{
        color:"#39B89A",
        fontSize: 15,
        marginTop:30,
        textAlign:"center"
    },
    containerResultado:{
        height:73,
        paddingVertical:10,
        paddingHorizontal: 20,
        borderWidth:2,
        borderColor: '#EC698F',
        borderStyle: 'solid',
        borderRadius: 10,
        marginVertical:10,

        flexWrap: 'wrap',
        flexDirection: "row",
        justifyContent:"flex-start",
        alingItems:"center",
    },
    containerText:{
        marginTop:50,
        backgroundColor:'white',
        flexWrap: 'wrap',
        flexDirection: "colum",
        justifyContent:"flex-start",
        alingItems:"center",
    },
    textResultado:{
        marginVertical:1
    },
    imagen:{
        marginRight:10,
        height:50,
        width:50,
        borderRadius:"50%",
    }
})



export default Busqueda;