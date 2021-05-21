import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Button} from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

export default class StyleTransferApp extends Component {

  constructor(props){
    super(props);
    this.state = {
      baseImageUser: null,
      styleImageUser: null,
      loading: null,
      output: null,
    }
  }

  selectBaseImage(){
    const options = {
      includeBase64: true,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel){
          console.log('User Cancelled');
      } else if(response.error){
          console.error('Error');
      }else if(response.customButton){
          console.log('Clicked a custom Button');
      } else{
          console.log(response.uri)
          this.setState({
              baseImageUser : response.base64,
          });
        }
    })
  }

  selectStyleImage(){
    const options = {
      includeBase64: true,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel){
          console.log('User Cancelled');
      } else if(response.error){
          console.error('Error');
      }else if(response.customButton){
          console.log('Clicked a custom Button');
      } else{
          console.log(response.uri)
          this.setState({
              styleImageUser : response.base64,
          });
        }
    })
  }

  goback(){
    this.setState({
      baseImageUser: null,
      styleImageUser: null,
      loading: null,
      output: null,
    });
  }

  styleTransfer(){
    console.log('Started sending request....');
    this.setState({loading: true});
    axios.post('http://c1315d35589d.ngrok.io/', {
      'content_image': this.state.baseImageUser,
      'style_image': this.state.styleImageUser,
    }).then(res =>{
      console.log('request completed!');
      console.log(res.data);
      this.setState({
        output: res.data,
        loading:null,
      });
    }).catch(err => {
      console.log(err);
    });
  }

  render(){
    const {baseImageUser, styleImageUser} = this.state;
    return(
      baseImageUser == null || styleImageUser  == null ? (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}> Neural Style Transfer </Text>
            <Text style={styles.subtitle}> Transfer style from one image to another </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('./assets/painting.png')} style={styles.artImage} /> 
          </View>
          <View style={styles.buttonContainer}>
            <Button 
              title="Select Base Image" 
              buttonStyle={styles.button}
              onPress={this.selectBaseImage.bind(this)}></Button>
            <Button 
              title="Select Style Image" 
              buttonStyle={styles.button}
              onPress={this.selectStyleImage.bind(this)}></Button>
          </View>
        </View>
      ) : (
        <View style={styles.outputButtonContainer}>
            <Button 
              title="Go Back" 
              buttonStyle={styles.button}
              onPress={this.goback.bind(this)}></Button>
            <Button 
              title="Transfer" 
              buttonStyle={styles.button}
              onPress={this.styleTransfer.bind(this)}
              >
              </Button> 

              {
                this.state.loading == null ?
                  undefined
                  :
                  <ProgressBar indeterminate={true}></ProgressBar>
              }

              {
                this.state.output ?  
                   <Image source={{uri: `data:image/png;base64,${this.state.output}` }} style={styles.artImage} />
                   :
                   undefined
              }
        </View>
      )
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'black',
  },
  titleContainer:{
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle:{
    fontSize: 17,
    color: 'white',
  },
  imageContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  button:{
    height: 57,
    width: 200,
    margin: 10,
    borderRadius: 10,
  },
  imageContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artImage:{
    height: 250,
    width: 250,
  },
  outputButtonContainer:{
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
})