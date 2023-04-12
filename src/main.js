import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import OneSignalVuePlugin from '@onesignal/onesignal-vue3'

document.addEventListener("deviceready", OneSignalInit, false);

// Call this function when your app start
function OneSignalInit() {
    // Uncomment to set OneSignal device logging to VERBOSE  
    // window.plugins.OneSignal.setLogLevel(6, 0);

    // NOTE: Update the setAppId value below with your OneSignal AppId.
    window["plugins"].OneSignal.setAppId("6df381ac-5756-463e-9673-29c6d4c63e54");
    window["plugins"].OneSignal.setNotificationOpenedHandler(function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });

    // iOS - Prompts the user for notification permissions.
    //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 6) to better communicate to your users what notifications they will get.
    window["plugins"].OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
        console.log("User accepted notifications: " + accepted);
    });
}


const app = createApp(App)

app.use(OneSignalVuePlugin, {
  appId: '6df381ac-5756-463e-9673-29c6d4c63e54',
})

app.use(createPinia())
app.use(router)

app.mount('#app')
