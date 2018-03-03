import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyDpBgmB35BveFbjxH-06NtDtuRw1XQoGAA",
    authDomain: "nba-app-94558.firebaseapp.com",
    databaseURL: "https://nba-app-94558.firebaseio.com",
    projectId: "nba-app-94558",
    storageBucket: "nba-app-94558.appspot.com",
    messagingSenderId: "127980344209"
};

firebase.initializeApp(config);

const firebaseDB       = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams    = firebaseDB.ref('teams');
const firebaseVideos   = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
    const data = [];

    snapshot.forEach((childSnapshot) => {
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    });

    return data;
}


export {
    firebase,
    firebaseDB,
    firebaseArticles,
    firebaseTeams,
    firebaseVideos,
    firebaseLooper
}
