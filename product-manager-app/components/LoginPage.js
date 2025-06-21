import React,{useState} from "react";
import {SafeAreaView,View,Image,Text,TextInput,StyleSheet,TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginPage=({navigation})=>{


  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');

  const handleLogin=async()=>{

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    try{
      const response=await fetch('https://reqres.in/api/login',{
        method:'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          email: 'eve.holt@reqres.in',
          password: 'pistol',
        }),
      });

      const data=await response.json();

      if(response.ok && data.token){
        navigation.replace('HomePage');
      }
      else{
        setError('Invalid Email or Password');
      }
    }

    catch(err){
      setError('Something went wrong')
    }
  };

  return(
    <SafeAreaView style={styles.container}>
    
    <View style={{alignItems:"center"}}>
    <Image source={require('../assets/logo.png') } style={styles.imageSection} />
    </View>

    <Text style={styles.heading}>Login</Text>

    <View style={styles.passwordField}>
    <Icon name="envelope" size={20} color="#666" style={styles.icon} />

    <TextInput placeholder="Email ID" style={styles.inputSection} 
    value={email}
      onChangeText={(text) => setEmail(text)}
       />
    </View>

    <View style={styles.passwordField}>
    <Icon name="lock" size={24} color="#666" style={styles.icon} />
    <TextInput placeholder="Password" style={styles.inputSection}  
       onChangeText={(text) => setPassword(text)}
       value={password}
        secureTextEntry  />
    </View >

    <TouchableOpacity>
    <Text style={styles.ForgetPassword}>Forgot Password?</Text>
    </TouchableOpacity>

    {
      error !== '' && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>
    }

    <View style={styles.ButtonSec}>
    <TouchableOpacity style={styles.Loginbtn} onPress={handleLogin}>
    <Text style={styles.Loginbutton}>Login</Text>
    </TouchableOpacity>
    </View>

    <Text style={styles.ORText}>OR</Text>

  <View style={styles.ButtonSec}>
    <TouchableOpacity style={styles.googlebtn}>
    <Image source={require('../assets/Google.png') }  style={{height:"80%",width:"20%"}} />
    <Text>Login with Google</Text>
    </TouchableOpacity>
  </View>

  
    <Text style={{textAlign:"center",marginTop:20,fontSize:20}}>New to Logistics?
    <TouchableOpacity style={{flexDirection:"row",marginTop:8}}>
    <Text style={{color:"blue",fontSize:17}}> Register</Text>
    </TouchableOpacity>
    </Text>
    

    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    paddingLeft:30,
    paddingRight:30,
    marginTop:30,
    borderColor:"black",
    
  },
  imageSection:{
    height:250,
    width:250,
  },
  heading:{
    marginTop:20,
    fontWeight:"bold",
    fontSize:35,
  },
  
  inputSection:{
    marginTop:10,
    height:40,
    fontSize:17,
    borderBottomColor:"black",
    borderBottomWidth:1,
    marginLeft:10,
    width:"90%",
    backgroundColor: 'lightwhite',
  },

  passwordField:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
  },

  icon:{
    paddingTop:10,
  },

  ForgetPassword:{
    textAlign:"right",
    fontSize:17,
    marginTop:10,
    color:"blue",
  },
  ButtonSec:{
    width:"100%",
    alignItems:"center",
    marginTop:14
  },

  Loginbtn:{
    backgroundColor:"blue",
    width:"80%",
    height:40,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:7,
    
  },
  Loginbutton:{
    color:"white",
    fontSize:19,
  },
  ORText:{
    textAlign:"center",
    marginTop:10
  },
  googlebtn:{
     width:"80%",
     backgroundColor:"lightblue",
      height:35,
      display:"flex",
      fontSize:19,
      justifyContent:"space-evenly",
      flexDirection:"row",
    alignItems:"center",
    borderRadius:7
  }
})

export default LoginPage;