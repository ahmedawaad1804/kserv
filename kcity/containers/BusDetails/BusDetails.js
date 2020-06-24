import React from 'react';
import { StyleSheet, Text, View ,Button,TouchableOpacity,Dimensions,Image,ActivityIndicator } from 'react-native';
import store from '../../store'
import {connect} from 'react-redux'
/* servicesc */ 
import BusService from '../../services/busesService'

import MapView from 'react-native-maps';
/* colors */
import colors from '../../colors'
 class BusDetails extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({

    headerStyle: {
      backgroundColor: colors.primary,
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS
    },
    headerLeft: (<TouchableOpacity style={{ marginBottom: 30, marginLeft: 30, padding: 15 }} onPress={() => { navigation.pop() }}>
      <Image
        source={require('../../assets/icons/back.png')}
        style={{
          width: Dimensions.get('window').width * 10 / 375,
          height: Dimensions.get('window').height * 18 / 812,
        }}
      />
    </TouchableOpacity>),
    headerTitle: (
      <View style={{
        width: Dimensions.get('window').width * 1 / 2,
        marginLeft: 40, alignItems: 'center', marginBottom: 30,
      }}>
        <Text style={{
          fontFamily: 'Cairo-Regular',
          fontSize: 20,
          color:colors.white
        }}>Nearest Station</Text>
      </View>
    ),


  });

  
  state = {
    location: null,
    distance: null,
    coords: null,
    _dataRecieved: null,
    latitude: null,
    longitude: null,
    stations: [null],
    flag:false,
  }
  componentDidMount = () => {
    // console.log('here');

    console.log(this.props);
    

    BusService.getRoute().then(async response => {
      await this.setState({ coords: response.data })
      this.setState({ longitude: response.data[0].longitude })
      this.setState({ latitude: response.data[0].latitude })
      this.setState({ _dataRecieved: true })
      // console.log(this.state.coords);

      this.getstations()
    }
    )

  }
  getstations() {
    const arr = []
    const numberOfPoints = this.state.coords;
    // console.log(numberOfPoints.length);
    for (let index = 0, i = 0; index < numberOfPoints.length; index += Math.floor(numberOfPoints.length / 5), i++) {

      arr[i] = this.state.coords[index]




    }
    this.setState({
      stations:arr
    })
    this.setState({
      flag:true
    })
    
    
  }

    render(){
      if (!this.state._dataRecieved) {
        return (<View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size={70} color={colors.primary} />
  
        </View>)
      }
      else {
  return (
    <View style={styles.container}>
        <View style={styles.innerContainer}>
        <MapView style={styles.mapStyle}
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}   >
            { 
            this.state.flag?
            this.state.stations.map(
              (coords) =>(<MapView.Marker coordinate={{latitude:coords.latitude,longitude:coords.longitude}} title="you are here !"
              pinColor="green" />)
            )  :null}
            <MapView.Polyline coordinates={this.state.coords} strokeWidth={7} strokeColor="#2ecc71" geodesic={true} />
            
            <MapView.Marker coordinate={{latitude:this.state.latitude,longitude:this.state.longitude}} title="you are here !"
              pinColor="red" />
          </MapView>


      </View>
    </View>
  );}
            }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    height:'100%',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  innerContainer:{
    
    width:'100%',
    height: '100%',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    paddingTop:30
  },
  tOpacity:{
    width:  Dimensions.get('window').width * 343/375,
    height:  Dimensions.get('window').height * 46/812,
    borderRadius:50,
    backgroundColor:colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontFamily:'Cairo-Bold',
    fontSize:14
  },
  mapStyle: {
    width: "100%",
    height:"100%",
    

  }
});
const mapStateToProps =state =>({
  www :state.www
})
export default connect(mapStateToProps)(BusDetails)