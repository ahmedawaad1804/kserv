import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, CheckBox, Button, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
/* services */
import buseService from '../../services/busesService'

/* icons */
import { MaterialCommunityIcons, FontAwesome } from 'react-native-vector-icons'

class Home extends React.Component {

  static navigationOptions = { header: null }


  state = {
    _dataRecieved: false,
    buses: null
  }
  componentWillMount = () => {
    console.log("yes");

    buseService.getBuses().then(response => {
      console.log(response.data.buses);

      this.setState({ buses: response.data.buses })
      this.setState({ _dataRecieved: true })
    }
    )
  }

  render() {
    return (

      <View style={styles.container}>
        <View style={styles.mainImageView}>

          <View style={{ backgroundColor: '#ccc', width: Dimensions.get('window').width * 1 / 2 - (Dimensions.get('window').width * 62 / 375) / 2 }}></View>
          <Image source={require("../../assets/logo-bg.png")}
            style={styles.mainImageStyle} />
          <View style={{ backgroundColor: '#ccc', width: Dimensions.get('window').width * 90 / 400 }}></View>
          {/* <Image source={require("../../assets/icons/cart.png")}
            style={styles.cartImageStyle} /> */}
        </View>
        <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 35 / 812 }}></View>
        <View style={styles.mainContainer}>
          <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 30 / 812 }}></View>


          <View style={styles.textView}>
            <Text style={styles.titleText}>Lines</Text>
          </View>
          {this.state._dataRecieved && (
            <ScrollView style={{ width: Dimensions.get('window').width, padding: 10, paddingTop: 0 }}>
              {
                this.state.buses.map((bus) => (
                  <TouchableOpacity style={styles.advStyle}
                  onPress={() => {
                     this.props.navigation.navigate('BusDetails', { name: bus.line })
                }}>
                    <View style={styles.busView}>
                      <Image source={require("../../assets/bus.png")}
                        style={styles.mainImageStyle} />
                      <Text style={styles.smallText}>{bus.id}</Text>
                    </View>




                    <View style={styles.detailsView}>
                      <View >
                        <Text style={styles.smallText}>{bus.line}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                          <FontAwesome
                            name={'money'}
                            size={25}
                            color={colors.primary}
                            style={{ marginBottom: 5, marginRight: 5 }}
                          />
                          <Text style={styles.smallText}>{bus.fare} EGP</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                          <MaterialCommunityIcons
                            name={'clock-fast'}
                            size={25}
                            color={colors.primary}
                            style={{ marginBottom: 5, marginRight: 5 }}
                          />
                          <Text style={styles.smallText} >{bus.duration} min.</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              }
            </ScrollView>)}
          {!this.state._dataRecieved && (
            <ActivityIndicator size={70} color={colors.primary} />)}
        </View>
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  smallText: {
    fontFamily: 'Cairo-Bold',
    fontSize: 13,

  },
  mainContainer: {
    width: '100%',
    height: Dimensions.get('window').height * (812 - 180) / 812,
    backgroundColor: colors.white,
    alignItems: 'center',
    // justifyContent: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  }, yellowUpperOnly: {
    marginTop: 150
  }
  ,
  yellowContainer: {
    flexDirection: 'row',
    backgroundColor: '#FDFDDD',
    borderRadius: 35,
    width: Dimensions.get('window').width * 343 / 375,
    height: Dimensions.get('window').height * 46 / 812,
  },
  iconView: {
    borderTopLeftRadius: 35,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#FFF064',
    width: Dimensions.get('window').width * 54 / 375,
    height: Dimensions.get('window').height * 46 / 812,

  },
  tOpacity: {
    width: Dimensions.get('window').width * 343 / 375,
    height: Dimensions.get('window').height * 46 / 812,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 10,
    height: 10,
    padding: 10
  },
  textInputView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: Dimensions.get('window').width * (343 - 54) / 375,
    height: Dimensions.get('window').height * 46 / 812,
  },
  textInputStyle: {
    paddingHorizontal: 10
  },
  text: {
    fontFamily: 'Cairo-Bold',
    fontSize: 14
  },
  textBelow: {
    fontFamily: 'Cairo-Bold',
    fontSize: 14,
    padding: 15
  },
  titleText: {
    marginLeft: Dimensions.get('window').width * 15 / 375,
    fontFamily: 'Cairo-Bold',
    fontSize: 20
  },
  textView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: Dimensions.get('window').width - 100,
    marginRight: 100,

  },

  smallTextUnderLine: {
    fontFamily: 'Cairo-Bold',
    fontSize: 12,
    textDecorationLine: 'underline'
  },
  mainImageView: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    alignItems: 'center',

  },
  mainImageStyle: {
    width: Dimensions.get('window').width * 62 / 375,
    height: Dimensions.get('window').width * 62 / 375
  },

  advStyle: {
    width: Dimensions.get('window').width * 343 / 375,
    height: Dimensions.get('window').height * 94 / 812,
    marginVertical: 10,
    borderRadius: 15,
    flexDirection: 'row',
    shadowColor: "#ccc",
    backgroundColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,

    elevation: 2,
  },
  busView: {

    height: '100%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth:2
  },

  detailsView: {

    height: '100%',
    width: '70%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 30
  },
  gridRow: {
    flexDirection: 'row',
    marginVertical: 5
  },
  grid: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
const mapStateToProps = state => ({
  www: state.www
})
export default connect(mapStateToProps)(Home)