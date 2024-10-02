import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyB_MUYQF668dYkoRhwH_qVEVN8RTNcAEtM',
    authDomain: 'curso-79ba5.firebaseapp.com',
    projectId: 'curso-79ba5',
    storageBucket: 'curso-79ba5.appspot.com',
    messagingSenderId: '605732419192',
    appId: '1:605732419192:web:c7e951831cfbbeb8de5f8d',
    measurementId: 'G-12DXED8S8B',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
