import React from 'react';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View, Platform, CheckBox, ActivityIndicator, Button, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* storage service */
import StorageService from './StorageService'
/* colors */
import colors from '../../colors'
/* padding */
import Padv from '../../components/ViewPad/PadV'
/* services */
import authService from '../../services/authService'
class Login extends React.Component {

  static navigationOptions = { header: null }

  state = {
    checked: false,
    _ckeckSignIn: false,
    phonenumber: null,
    password: null,
    phoneError: true,
    passwordError: true,
    errorMessage: " ",
    _error: false,
  }
  componentDidMount() {

    this._handleRememberMeGet()

  }
  _handlePassword(password) {
    this.setState({ password })
    this.setState({ _error: false })

    this.setState({ errorMessage: " " })
  }
  _handlePhoneNumber(phonenumber) {
    this.setState({ phonenumber })
    this.setState({ _error: false })

    this.setState({ errorMessage: " " })
  }
  _handleSubmit() {
    if (this.state.phonenumber) {
      if (this.state.phonenumber.length <= 10) {
        this.setState({ _error: true })
        this.setState({ errorMessage: "Enter a valid Phone number" })

      }
    }
    else {
      this.setState({ _error: true })
      this.setState({ errorMessage: "Enter a valid Phone number" })
    }
    if (this.state.password) {
      if (this.state.password.length <= 8) {
        this.setState({ _error: true })
        this.setState({ errorMessage: "Password minimum lenght 8 characters" })

      }
    }

    else {
      this.setState({ _error: true })
      this.setState({ errorMessage: "Enter a valid password" })
    }

    setTimeout(() => {

      if (!this.state._error) {

        if (this.state.checked) {
          this._handleRememberMeSet(this.state.phonenumber, this.state.password)
        } else {
          AsyncStorage.removeItem('phonenumber')
          AsyncStorage.removeItem('password')
        }

        this.setState({ _ckeckSignIn: true })
        authService.login(this.state.phonenumber, this.state.password).then(response => {
          //save token and navigatexf
          
      }
      ).catch(err=>{console.log(err.response.data.status)
        this.setState({ _error: true })
        this.setState({ errorMessage: err.response.data.status })
      }
      ).finally(()=>{
        this.setState({_ckeckSignIn: false})
      })

      }
    }, 500);


  }
  async _handleRememberMeSet(phonenumber, password) {
    console.log(password);

    try {
      await AsyncStorage.setItem(
        'phonenumber', phonenumber
      );
      await AsyncStorage.setItem(
        'password', password
      );
    } catch (error) {
      // Error saving data
      console.log(error);

    }

  }
  async _handleRememberMeGet() {

    try {
      const phonenumber = await AsyncStorage.getItem('phonenumber');
      const password = await AsyncStorage.getItem('password');

      console.log(phonenumber + "  " + password);

      this.setState({ phonenumber: phonenumber })
      this.setState({ password: password })



    } catch (error) {
      // Error retrieving data
      console.log(error);

    }


  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainImageView}>

          <Image source={require("../../assets/logo.png")}
            style={styles.mainImageStyle} />
        </View>
        <Padv height={20} />

        <View style={styles.mainContainer}>
          <Padv height={60} />


          <View style={styles.textView}>
            <Text style={styles.titleText}>Login</Text>
          </View>
          <Padv height={8} />
          {this.state._error && (<Text style={styles.errorText}>{this.state.errorMessage}</Text>)}
          {!this.state._error && (<Padv height={22} />)}

          <View style={[styles.yellowContainer,]}>

            <View style={styles.iconView}>
              <Image source={require("../../assets/icons/user.png")}
                style={styles.imageStyle} />
            </View>
            <View style={styles.textInputView}>
              <TextInput
                style={styles.textInputStyle}
                placeholder="Phone Number"
                value={this.state.phonenumber}
                placeholderTextColor={'#ccc'}
                width={Dimensions.get('window').width * 3 / 5}
                keyboardType={Platform.OS ? "numeric" : "number-pad"}

                autoCapitalize='none'
                onChangeText={(text) => this._handlePhoneNumber(text)}
              />
            </View>
          </View>


          <Padv height={20} />


          <View style={styles.yellowContainer}>
            <View style={styles.iconView}>
              <Image source={require("../../assets/icons/password.png")}
                style={styles.imageStyle} />
            </View>
            <View style={styles.textInputView}>
              <TextInput
                style={styles.textInputStyle}
                value={this.state.password}
                placeholder="Password"
                placeholderTextColor={'#ccc'}
                width={Dimensions.get('window').width * 3 / 5}

                secureTextEntry
                autoCapitalize='none'
                onChangeText={(text) => this._handlePassword(text)}
              />
            </View>
          </View>
          <Padv height={30} />


          <TouchableOpacity style={styles.tOpacity}
            // disabled={this.state._ckeckSignIn}
            onPress={() => this._handleSubmit()}>
            {
              this.state._ckeckSignIn && (<ActivityIndicator size={20} color={colors.black} />)

            }
            {
              !this.state._ckeckSignIn && (<Text style={[styles.text,{color:colors.white}]}>Login</Text>)
            }

          </TouchableOpacity>


          <Padv height={15} />


          <View style={{ flux: 1, flexDirection: 'row', alignItems: 'flex-start', width: Dimensions.get('window').width }}>
            <View style={{
              flexDirection: 'row', alignItems: 'center',
              justifyContent: 'center', paddingHorizontal: 15
            }}>
              <CheckBox
                center
                value={this.state.checked}
                onValueChange={() => { this.setState({ checked: !this.state.checked }) }}

              />
              <Text style={styles.smallText}>Keep me in</Text>
              <View style={{ backgroundColor: '#ccc', width: Dimensions.get('window').width * 14 / 30 }}></View>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate("Forgot") }}>
                <Text style={styles.smallTextUnderLine}>Forgot Password</Text>
              </TouchableOpacity>


            </View>

          </View>

          <Padv height={110} />

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate("Register") }}>
              <Text style={[styles.textBelow]}>Register</Text>
            </TouchableOpacity>
            <View style={{ backgroundColor: '#ccc', width: Dimensions.get('window').width * 20 / 30 }}></View>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate("MainTabNavigator") }}>
              <Text style={styles.textBelow}>Skip</Text>
            </TouchableOpacity>
          </View>

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
    height: '65%',
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
    backgroundColor: colors.fade,
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
    marginLeft: Dimensions.get('window').width * 32 / 375,
    fontFamily: 'Cairo-Bold',
    fontSize: 20
  },
  textView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: Dimensions.get('window').width - 85,
    marginRight: 85

  },
  smallText: {
    fontFamily: 'Cairo-Bold',
    fontSize: 12
  },
  smallTextUnderLine: {
    fontFamily: 'Cairo-Bold',
    fontSize: 12,
    textDecorationLine: 'underline'
  },
  mainImageView: {

  },
  mainImageStyle: {

  },
  errorText: {
    color: 'red',
    fontFamily: 'Cairo-Bold',
    fontSize: 12,
    paddingHorizontal: 10,
    width: Dimensions.get('window').width * (343) / 375,

  }
});
const mapStateToProps = state => ({
  phonenumber: state.phonenumber,
  password: state.password,

})
export default connect(mapStateToProps)(Login)