import React from 'react';
import { StyleSheet, Text, View, CheckBox, TouchableHighlight, Button, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
import { Header } from 'react-navigation';

class Verification extends React.Component {

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
        }}>Register</Text>
      </View>
    ),


  });

  state = {
    checked: false
  }
  componentDidMount() {

    console.log('Register');

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * (Header.HEIGHT) / 812 }}></View>
          <View style={{ flexDirection: "row", justifyContent: 'center' }}>
            <View style={styles.textView}>
              <View style={{}}>
                <Text style={styles.headerText}>Verify Phone Number</Text>
                <Text style={styles.instructionText}>Enter 4 digits pin code</Text>
              </View>
            </View>
            <Image source={require("../../assets/icons/1of2.png")}
              style={styles.progressImage} />
          </View>

          <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 19 / 812 }}></View>

          <View style={styles.yellowContainer}>
            <View style={styles.iconView}>
              <Image source={require("../../assets/icons/shield.png")}
                style={styles.imageStyleShield} />
            </View>
            <View style={styles.textInputView}>
              <TextInput
                style={styles.textInputStyle}
                placeholder="Phone Number"
                placeholderTextColor={'#ccc'}
                width={Dimensions.get('window').width * 3 / 5}
                errorStyle={{ color: 'red' }}
                errorMessage={true ? 'Email is invalid' : ''}

                autoCapitalize='none'
              />
            </View>
          </View>



          <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 28 / 812 }}></View>


          <TouchableOpacity style={styles.tOpacity}
            onPress={() => { this.props.navigation.navigate('MainScreenLoading') }}>
            <Text style={[styles.text,{color:colors.white}]}>Verify</Text>
          </TouchableOpacity>







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
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    alignItems: 'center',
    // justifyContent: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  }
  ,
  yellowContainer: {
    flexDirection: 'row',
    backgroundColor:colors.fade,
    borderRadius: 35,
    width: Dimensions.get('window').width * 224 / 375,
    height: Dimensions.get('window').height * 46 / 812,
  },
  iconView: {
    borderTopLeftRadius: 35,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colors.secondary,
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
  imageStyleShield: {
    width: 50 / 2.2,
    height: 54 / 2.2,
    padding: 10
  },
  imageStyleEnv: {
    width: 30 / 1.2,
    height: 25 / 1.2,
    padding: 0
  },
  imageStylePad: {
    width: 39 / 2.3,
    height: 54 / 2.3,
    padding: 0
  },
  textInputView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: Dimensions.get('window').width * (224 - 54) / 375,
    height: Dimensions.get('window').height * 46 / 812,
  },
  textInputStyle: {
    paddingHorizontal: 10,
    backgroundColor: 'red',


  },
  text: {
    fontFamily: 'Cairo-Bold',
    fontSize: 14
  },
  textView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: Dimensions.get('window').width - 130,
    marginRight: 70,

  },
  instructionText: {
    marginLeft: Dimensions.get('window').width * 32 / 375,
    fontFamily: 'Cairo-Regular',
    fontSize: 13
    ,
  },
  headerText: {
    marginLeft: Dimensions.get('window').width * 32 / 375,
    fontFamily: 'Cairo-Regular',
    fontSize: 20
    ,
  },
  smallText: {
    fontFamily: 'Cairo-Bold',
    fontSize: 12
  },
  smallTextUnderLine: {
    fontFamily: 'Cairo-Bold',
    fontSize: 12,
  },
  progressImage: {
    marginRight: 25,
    height: 167 / 3.5,
    width: 197 / 3.5
  }
});
const mapStateToProps = state => ({
  www: state.www
})
export default connect(mapStateToProps)(Verification)