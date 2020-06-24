import React from 'react';
import { StyleSheet, Image, View, ActivityIndicator, Dimensions } from 'react-native';
/* colors */
import colors from '../../colors'

import store from '../../store'
import { connect } from 'react-redux'

class MainScreenLoading extends React.Component {

  componentDidMount() {

    setTimeout(() => {
      this.props.navigation.navigate("MainTabNavigator")
    }, 2000);

  }


  render() {
    return (
      <View style={styles.activityIndicatorContainer}>
        <View style={styles.mainImageView}>
          <Image source={require("../../assets/logo.png")}
            style={styles.mainImageStyle} />
        </View>
        <View style={{ backgroundColor: '#ccc', height: Dimensions.get('window').height * 60 / 812 }}></View>

        <ActivityIndicator size={70} color={colors.white} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: StatusBar.currentHeight
  },
});
const mapStateToProps = state => ({
  www: state.www
})
export default connect(mapStateToProps)(MainScreenLoading)