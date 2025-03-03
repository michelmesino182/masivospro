// Importar Firebase Auth
import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Verificar si el usuario está autenticado
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }
    document.getElementById("user-email").innerText = user.email;
});

// Cerrar sesión
document.getElementById("logout-btn").addEventListener("click", async () => {
    try {
        await signOut(auth);
        window.location.href = "login.html";
    } catch (error) {
        alert("Error al cerrar sesión: " + error.message);
    }
});

// Conectar con WhatsApp Web
document.getElementById("connect-whatsapp").addEventListener("click", () => {
    window.open("https://web.whatsapp.com/", "_blank");
    alert("Abre WhatsApp Web y escanea el código QR para conectarte.");
});