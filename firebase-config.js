// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA33oJ90vFjVaxJTHZr77dP8YdoeitgqKM",
    authDomain: "masivos-compartamos-pro.firebaseapp.com",
    projectId: "masivos-compartamos-pro",
    storageBucket: "masivos-compartamos-pro.firebasestorage.app",
    messagingSenderId: "118597555272",
    appId: "1:118597555272:web:c50501eec8f0d5e14d747d"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Exportar módulos
export { auth, db };
