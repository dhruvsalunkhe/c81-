import React , {Component} from 'react'
import {Text,View,TextInput,StyleSheet,TouchableOpacity,Alert,KeyboardAvoidingView} from 'react-native'
import db from '../config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'

export default class RecieverDetailsScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            userId : firebase.auth().currentUser.email,
            recieverId : this.props.navigation.getParam("details")["user_id"],
            requestId : this.props.navigation.getParam("details")["request_id"],
            bookName : this.props.navigation.getParam("details")["book_name"],
            reason_for_requesting : this.props.navigation.getParam("details")["reason_to_request"],
            recieverName : '',
            recieverAddress : '',
            recieverContact: '',
            recieverRequestDocId : '',

        }
    }

   getRecieverDetails = ()=>{
       var email = firebase.auth().currentUser.email
       db.collection("users").where("email_id","==",email).get()
       .then(snapshot=>{
           snapshot.forEach(doc=>{
               var data = doc.data()
               this.setState({
                recieverName : doc.data().first_name,
            recieverAddress : doc.data().address,
            recieverContact: doc.data().contact,
               })
           })
       })
       db.collection("requested_books").where("request_id","==",this.state.requestId).get()
       .then(snapshot=>{
           snapshot.forEach
       })
   }

   updateUserDetails = ()=>{
    var email = firebase.auth().currentUser.email
    db.collection("users").doc(this.state.docId).update({
            "first_name" : this.state.firstName,
            "last_name" : this.state.lastName,
            "address" : this.state.address,
           "contact": this.state.contact,
    })

    return Alert.alert("Profile Updated Successfuly")
}

componentDidMount(){
this.getUserDetails()
}

    render(){
        return(
            <View style = {{flex : 1}}>
                <MyHeader title = "Settings" navigation = {this.props.navigation}/>

                <View style = {styles.formContainer}>
                    <TextInput style = {styles.formTextInput}
                    placeholder = {'First Name'}
                    maxLength = {8}
                    onChangeText = {(text)=>{
                        this.setState({firstName : text})
                    }}
                    value = {this.state.firstName}
                    />
                    <TextInput style = {styles.formTextInput}
                    placeholder = {'Last Name'}
                    maxLength = {8}
                    onChangeText = {(text)=>{
                        this.setState({lastName: text})
                    }}
                    value = {this.state.lastName}
                    />
                     <TextInput style = {styles.formTextInput}
                    placeholder = {'Contact'}
                    maxLength = {10}
                    keyboardType = {"numeric"}
                    onChangeText = {(text)=>{
                        this.setState({contact: text})
                    }}
                    value = {this.state.contact}
                    />
                     <TextInput style = {styles.formTextInput}
                    placeholder = {'Address'}
                    multiline =  {true}
                    numberOfLines = {4}
                    onChangeText = {(text)=>{
                        this.setState({address: text})
                    }}
                    value = {this.state.address}
                    />
                    <TouchableOpacity style = {styles.button}
                        onPress = {()=>{this.updateUserDetails()}}
                    >
                        <Text>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}