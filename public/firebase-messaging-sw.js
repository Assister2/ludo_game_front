// importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');
// var firebaseConfig = {
//   apiKey: "AIzaSyDCEr29Ji7Y_f5W9gzeOEViad1rNLl1mlw",
//   authDomain: "ludo-b0877.firebaseapp.com",
//   projectId: "ludo-b0877",
//   storageBucket: "ludo-b0877.appspot.com",
//   messagingSenderId: "327439659478",
//   appId: "1:327439659478:web:4d116c366c60bd9004b477",
//   measurementId: "G-F1NBS76HRH"
// };

// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function(payload) {
//   console.log('Received background message', payload);
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.icon
//   };
//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });