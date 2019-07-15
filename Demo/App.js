
import React, { Component } from 'react';
import md5 from 'md5';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,

  Icon,
  ActivityIndicator,
  Alert,
  TouchableOpacity,Image
} from 'react-native';


 
export default class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = { isLoading: true, text: '' ,text1:''};
    this.arrayholder = [];
    body= { 
      "hash": '',
      "timestamp": '',
    };
  }
 
  componentDidMount() {
    return fetch('http://nasscomevents.venusens.com/getspeakers?hash=60a4d0996030bff575eef25c0737d335&conference_id=43131&timestamp=1562839820838')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.speakers_data
          },
          function() {
            this.arrayholder = responseJson.speakers_data;
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  async hash () 
{
    let time = Date.now();
    const key1 = "ux19tyiC5Fn0JTLa1l9CIIe03Cw2NsPD";
    const key2 = "vqPvO5H6bMbUhBiOqKT32priQnQrO43k";
    const hash = key1 + key2 + time;
    console.warn(hash);
    console.log(hash)
    let hashkey = await md5(hash);
    console.warn(hashkey);
    console.warn(body)
    body.timestamp=time;
    console.warn(body.timestamp)
    body.hash = hashkey;
    console.warn(body.hash)
}


  SearchFilterFunction(text,text1) {
   
    const newData = this.arrayholder.filter(function(item) {
     
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
   
    });
    this.setState({
     
      dataSource: newData,
      text: text,
      text1:text1,
    });
  }
  
  render() {

    return (
      <View style={{flex:1}}>
      <View style={{flex:0}}>
     <TextInput
      style={styles.textInputStyle}
      onChangeText={text => this.SearchFilterFunction(text)}
      value={this.state.text}
      underlineColorAndroid="transparent"
      placeholder="   Search speakers"
      
    />
     <Image source={require('./search.png')} style={{width:20,height:20,top:-30}}  />
    </View>
      <View style={styles.viewStyle}>


   
        <FlatList
          data={this.state.dataSource}
         
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() =>this.hash()}  style ={{  padding:10}}>
            <View style={styles.inner_box}>
              <View style={{flex:0.5}}>
                <Image style={styles.image} source={{uri:item.pic}}/>
              </View>
                <View style={{flex:2}}>
                 <Text style={{}}>{item.name}</Text>

                 <Text style={{marginTop:10}}>{item.post}</Text>
               </View>
            </View>
           </TouchableOpacity>
          )}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index}
        />
      </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inner_box:{

    flexDirection:'row',
    backgroundColor:'#E7E9EE',
    borderWidth: 0.5,
    padding:10,
     borderRadius:15,
  },
  image:{
  width:70,
  height:70,
  borderRadius:150,
  }, 
  TextInputStyleClass:{
        
    textAlign: 'center',
   
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 7 ,
    backgroundColor : "#FFFFFF"
         
    },
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 40,
   
  },
  textStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});
