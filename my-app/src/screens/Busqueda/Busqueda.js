import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { db,auth } from '../../firebase/config';
import Search from '../../components/Search/Search';

class Busqueda extends Component {
    constructor(){
        super()
        this.state={
            inputBusqueda:'',
            resultado:[]
        }
        
    }
    busqueda(inputBusqueda){
        db.collection('users').where('userName','==',inputBusqueda).onSnapshot(
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
    }

   
    render(){
        console.log(this.state.resultado)
        return(
            <View>
                <View style={styles.formContainer}>
                    <Text>BUSQUEDA</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text)=>this.setState({inputBusqueda: text})}
                        placeholder='Buscar'
                        keyboardType='default'
                        value={this.state.inputBusqueda}
                    />
                    <TouchableOpacity style={styles.button} onPress={()=>this.busqueda(this.state.inputBusqueda)}>
                        <Text style={styles.textButton}>buscar</Text>    
                    </TouchableOpacity>
                    
                </View>
                <View>
                    <Text>Lista</Text>
                    {
                        this.state.resultado.length === 0 ?
                           <Text>cargando</Text>
                        :
                        <FlatList 
                            data= {this.state.resultado}
                            keyExtractor={item =>item.id.toString()}
                            renderItem={({item}) =><Text>{item.data.userName},{item.data.owner}</Text>}
                        />
                    
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