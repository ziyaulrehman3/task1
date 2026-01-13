import { Tabs } from 'expo-router';
import { Provider } from 'react-redux';
import store from '../store/store';

export default function Layout(){

    return (
        <Provider store={store}>
          <Tabs>
            <Tabs.Screen name="index" options={{title:"Home",headerShown:false}}/>
            <Tabs.Screen name="manage" options={{title:"Manage", headerShown:false}}/>
            <Tabs.Screen name="cart" options={{title:"Cart",headerShown:false}}/>
          </Tabs>
        </Provider>
       
    )
}