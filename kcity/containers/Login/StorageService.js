import { AsyncStorage } from 'react-native';
class StorageService {
    async _handleRememberMeSet(phonenumber, password) {

        try {
            await AsyncStorage.setItem(
                'phonenumber',phonenumber
            );
            await AsyncStorage.setItem(
                'password',password
            );
        } catch (error) {
            // Error saving data
        }

    }
    async _handleRememberMeGet() {

        try {
            const phonenumber = await AsyncStorage.getItem('phonenumber');
            const password = await AsyncStorage.getItem('password');
            if (value !== null) {
              // We have data!!
              console.log(password);
              
              return password
            }
          } catch (error) {
            // Error retrieving data
          }
      

    }

}
const b = new StorageService();
export default b;