// Importar Firebase Firestore
import { db, auth } from "./firebase-config.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Verificar si el usuario está autenticado
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }
    loadContacts();
});

// Función para cargar contactos desde Firebase
async function loadContacts() {
    const contactsList = document.getElementById("contacts-list");
    contactsList.innerHTML = "";
    
    try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        querySnapshot.forEach((doc) => {
            const contact = doc.data();
            const row = `<tr class='border-b'>
                            <td class='p-2'>${contact.name}</td>
                            <td class='p-2'>${contact.phone}</td>
                            <td class='p-2 text-center'>
                                <button class='text-red-600' onclick='deleteContact("${doc.id}")'>Eliminar</button>
                            </td>
                        </tr>`;
            contactsList.innerHTML += row;
        });
    } catch (error) {
        console.error("Error al cargar contactos: ", error);
    }
}

// Agregar nuevo contacto
document.getElementById("add-contact-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("contact-name").value;
    const phone = document.getElementById("contact-phone").value;
    
    if (!name || !phone) {
        alert("Por favor, ingresa un nombre y número de WhatsApp válido.");
        return;
    }
    
    try {
        await addDoc(collection(db, "contacts"), { name, phone });
        alert("Contacto agregado correctamente.");
        document.getElementById("add-contact-form").reset();
        loadContacts();
    } catch (error) {
        console.error("Error al agregar contacto: ", error);
    }
});

// Eliminar contacto
async function deleteContact(id) {
    if (confirm("¿Seguro que deseas eliminar este contacto?")) {
        try {
            await deleteDoc(doc(db, "contacts", id));
            alert("Contacto eliminado correctamente.");
            loadContacts();
        } catch (error) {
            console.error("Error al eliminar contacto: ", error);
        }
    }
}