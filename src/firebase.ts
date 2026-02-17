import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC7b3jrca-J-zIpfqaFw8Vm5FzDQ4FKPXA",
    authDomain: "vue-firebase-demo-84e2f.firebaseapp.com",
    projectId: "vue-firebase-demo-84e2f",
    storageBucket: "vue-firebase-demo-84e2f.firebasestorage.app",
    messagingSenderId: "275674824621",
    appId: "1:275674824621:web:cf442136e9465cbe192b24"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);