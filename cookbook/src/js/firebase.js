import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD68rFHgwDTytU9LY7hKKlGvq-J45IkN3M",
  authDomain: "cookbook-83d27.firebaseapp.com",
  projectId: "cookbook-83d27",
  storageBucket: "cookbook-83d27.appspot.com",
  messagingSenderId: "332102725666",
  appId: "1:332102725666:web:870aaad85da2d272dc5a7b",
  measurementId: "G-J71C6648R2",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
