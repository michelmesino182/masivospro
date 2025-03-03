// Importar Firebase Firestore
import { db, auth } from "./firebase-config.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Verificar si el usuario está autenticado
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }
    loadMessageHistory();
});

// Función para cargar el historial de mensajes desde Firebase
async function loadMessageHistory() {
    const historyList = document.getElementById("history-list");
    historyList.innerHTML = "";
    
    try {
        const querySnapshot = await getDocs(query(collection(db, "messages"), orderBy("timestamp", "desc")));
        querySnapshot.forEach((doc) => {
            const message = doc.data();
            const date = message.timestamp ? new Date(message.timestamp.toDate()).toLocaleString() : "-";
            const row = `<tr class='border-b'>
                            <td class='p-2'>${date}</td>
                            <td class='p-2'>${message.content}</td>
                            <td class='p-2'>${message.recipient === "all" ? "Todos los contactos" : message.recipient}</td>
                            <td class='p-2 text-center text-green-600'>Enviado</td>
                        </tr>`;
            historyList.innerHTML += row;
        });
    } catch (error) {
        console.error("Error al cargar historial: ", error);
    }
}
