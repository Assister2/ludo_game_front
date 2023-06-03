import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getToken } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";

// Replace this firebaseConfig object with the congurations for the project you created on your firebase console.
const firebaseConfig = {
  apiKey: "AIzaSyDCEr29Ji7Y_f5W9gzeOEViad1rNLl1mlw",
  authDomain: "ludo-b0877.firebaseapp.com",
  projectId: "ludo-b0877",
  storageBucket: "ludo-b0877.appspot.com",
  messagingSenderId: "327439659478",
  appId: "1:327439659478:web:07f15ed6ecb9c6ec04b477",
  measurementId: "G-BHMVNXRVME",
};

initializeApp(firebaseConfig);
const messaging = getMessaging();
export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BKiRq8p0zaX0cJt1qTM7SLQxejR4BtLKoAj6gR3t0YkLBxIPBOjvvXq6EbG3SDsp1oP5gRUpk5BK4lWmDwqLfMc",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const requestForToken2 = () => {
  //API_URL
  //const API_URL = "http://localhost:8000/api";
  const API_URL = "https://push.gotiking.com/api";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // Initialize Firebase

  const firebaseConfig = {
    apiKey: "AIzaSyDCEr29Ji7Y_f5W9gzeOEViad1rNLl1mlw",
    authDomain: "ludo-b0877.firebaseapp.com",
    projectId: "ludo-b0877",
    storageBucket: "ludo-b0877.appspot.com",
    messagingSenderId: "327439659478",
    appId: "1:327439659478:web:07f15ed6ecb9c6ec04b477",
    measurementId: "G-BHMVNXRVME",
  };
  initializeApp(firebaseConfig);
  getAnalytics();

  // Retrieve Firebase Messaging object.
  const messaging = getMessaging();

  const publicVapidKey =
    "BKiRq8p0zaX0cJt1qTM7SLQxejR4BtLKoAj6gR3t0YkLBxIPBOjvvXq6EbG3SDsp1oP5gRUpk5BK4lWmDwqLfMc";
  // Add the public key generated from the console here.

  let theHeader = new Headers();
  theHeader.append("Content-Type", "application/json");
  getToken(messaging, { vapidKey: publicVapidKey })
    .then((token) => {
      console.log("tokennntooo",token);
      if (!localStorage.getItem("tokenSent")) {
        const url = require("url");

        const siteUrl = "https://wwww.gotiking.com/";
        const parsedUrl = new URL(siteUrl);
        const siteName = parsedUrl.hostname;

        const body = {
          sitename: siteName,
          country: "India",
          token: token,
        };

        fetch(`${API_URL}/user/subscribe`, {
          method: "POST",
          headers: theHeader,
          body: JSON.stringify(body),
        }).then((r) => {
          localStorage.setItem("tokenSent", true);
          r.json(() => {});
        });
      }
    })
    .catch((err) => {
      console.log("errorincat", err);
    });
};
