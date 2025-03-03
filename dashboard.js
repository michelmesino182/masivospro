// Importar Firebase Firestore
import { db, auth } from "./firebase-config.js";
import { collection, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Esperar a que el usuario esté autenticado
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    try {
        // Obtener el total de mensajes enviados
        const messagesSnapshot = await getDocs(collection(db, "messages"));
        document.getElementById("total-messages").innerText = messagesSnapshot.size;
        
        // Obtener el total de contactos
        const contactsSnapshot = await getDocs(collection(db, "contacts"));
        document.getElementById("total-contacts").innerText = contactsSnapshot.size;
        
        // Obtener la fecha del último envío
        const lastMessageQuery = query(collection(db, "messages"), orderBy("timestamp", "desc"), limit(1));
        const lastMessageSnapshot = await getDocs(lastMessageQuery);
        if (!lastMessageSnapshot.empty) {
            const lastMessageData = lastMessageSnapshot.docs[0].data();
            document.getElementById("last-message-date").innerText = new Date(lastMessageData.timestamp.toDate()).toLocaleString();
        } else {
            document.getElementById("last-message-date").innerText = "-";
        }

        // Cargar estadísticas en el gráfico
        loadMessagesChart(messagesSnapshot);
    } catch (error) {
        console.error("Error obteniendo datos: ", error);
    }
});

// Función para cargar el gráfico de mensajes enviados
function loadMessagesChart(messagesSnapshot) {
    const ctx = document.getElementById("messagesChart").getContext("2d");
    
    const dailyCounts = {};
    messagesSnapshot.forEach(doc => {
        const date = new Date(doc.data().timestamp.toDate()).toLocaleDateString();
        dailyCounts[date] = (dailyCounts[date] || 0) + 1;
    });
    
    const labels = Object.keys(dailyCounts);
    const data = Object.values(dailyCounts);
    
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Mensajes enviados",
                data: data,
                backgroundColor: "#4F46E5"
            }]
        }
    });
}
