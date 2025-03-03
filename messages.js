// Importar Firebase Firestore
import { db, auth } from "./firebase-config.js";
import { collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Verificar si el usuario está autenticado
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }
    loadContacts();
});

// Cargar los contactos en el selector
async function loadContacts() {
    const recipientGroup = document.getElementById("recipient-group");
    recipientGroup.innerHTML = '<option value="all">Todos los Contactos</option>';
    
    try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        querySnapshot.forEach((doc) => {
            const contact = doc.data();
            recipientGroup.innerHTML += `<option value="${doc.id}">${contact.name} - ${contact.phone}</option>`;
        });
    } catch (error) {
        console.error("Error al cargar contactos: ", error);
    }
}

// Manejar el envío del mensaje
document.getElementById("message-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const messageContent = document.getElementById("message-content").value;
    const recipientGroup = document.getElementById("recipient-group").value;
    
    if (!messageContent) {
        alert("Por favor, ingresa un mensaje antes de enviarlo.");
        return;
    }
    
    try {
        await addDoc(collection(db, "messages"), {
            content: messageContent,
            recipient: recipientGroup,
            timestamp: serverTimestamp()
        });
        alert("Mensaje registrado correctamente. Ahora debes enviarlo desde WhatsApp Web.");
        document.getElementById("message-form").reset();
    } catch (error) {
        console.error("Error al registrar mensaje: ", error);
    }
});

// Actualizar la vista previa del mensaje
document.getElementById("message-content").addEventListener("input", (e) => {
    document.getElementById("preview-message").innerText = e.target.value || "Aquí aparecerá la vista previa de tu mensaje.";
});