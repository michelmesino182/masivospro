// Importar Firebase Auth desde la configuración
import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Iniciar sesión con correo y contraseña
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            try {
                await signInWithEmailAndPassword(auth, email, password);
                window.location.href = "dashboard.html";
            } catch (error) {
                alert("Error de inicio de sesión: " + error.message);
            }
        });
    }

    // Iniciar sesión con Google
    const googleLogin = document.getElementById("google-login");
    if (googleLogin) {
        googleLogin.addEventListener("click", async () => {
            const provider = new GoogleAuthProvider();
            try {
                await signInWithPopup(auth, provider);
                window.location.href = "dashboard.html";
            } catch (error) {
                alert("Error al iniciar sesión con Google: " + error.message);
            }
        });
    }

    // Verificar usuario autenticado
    onAuthStateChanged(auth, (user) => {
        if (user) {
            document.getElementById("user-email")?.innerText = user.email;
        }
    });

    // Cerrar sesión
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            try {
                await signOut(auth);
                window.location.href = "login.html";
            } catch (error) {
                alert("Error al cerrar sesión: " + error.message);
            }
        });
    }
});
