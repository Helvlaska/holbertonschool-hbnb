// Ecoute si la page à finie de charger
document.addEventListener('DOMContentLoaded', function () {

    // Récupération des éléments du document pour le form add_place
    const addPlaceForm = document.getElementById('add-place-form');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const priceInput = document.getElementById('price');
    const latitudeInput = document.getElementById('latitude');
    const longitudeInput = document.getElementById('longitude');
    const AddPlaceButton = document.getElementById('place-button');

    const token = localStorage.getItem("access_token");

    // Fonction pour bloquer le bouton si les champs obligatoire ne sont pas tous remplis
    function toggleButtonState() {
        // Nettoie et vérifie si les champs ne sont pas vide
        if (
            titleInput.value.trim() !== '' &&
            priceInput.value.trim() !== '' &&
            latitudeInput.value.trim() !== '' &&
            longitudeInput.value.trim() !== ''
        ) {
            AddPlaceButton.disabled = false;
        } else {
            AddPlaceButton.disabled = true;
        }
    }

    // Ecoute et vérifie avec la fonction toggle si les champs sont remplis pour bloquer le bouton ou non
    titleInput.addEventListener('input', toggleButtonState);
    priceInput.addEventListener('input', toggleButtonState);
    latitudeInput.addEventListener('input', toggleButtonState);
    longitudeInput.addEventListener('input', toggleButtonState);

    // Appel de la fonction toggle quand tout les champs seront remplis ou en cas de correction
    toggleButtonState();

    // Ecoute si le client corrige un input erroné après un message d'erreur -> remet à zéro le message d'erreur
    titleInput.addEventListener('input', function () {
        document.getElementById('error-message').textContent = "";
    });
    priceInput.addEventListener('input', function () {
        document.getElementById('error-message').textContent = "";
    });
    latitudeInput.addEventListener('input', function () {
        document.getElementById('error-message').textContent = "";
    });
    longitudeInput.addEventListener('input', function () {
        document.getElementById('error-message').textContent = "";
    });

    // Récupération et traitement des données par un fetch
    // Ecoute de l'action d'envoie du formulaire
    addPlaceForm.addEventListener('submit', function (event) {

        event.preventDefault();     // Bloque le rafraichissement de la page lors du submit
        console.log("submit intercepté")

        const title = titleInput.value;                               // Valeur du titre
        const description = descriptionInput.value;                   // Valeur de la description
        const price = parseFloat(priceInput.value);                   // Valeur du prix
        const latitude = parseFloat(latitudeInput.value);             // Valeur de la latitude
        const longitude = parseFloat(longitudeInput.value);           // Valeur de la longitude
        const owner = JSON.parse(localStorage.getItem('user')).id;    // Récupère l'id du user dans le localStorage
        const log = {                                                 // Model de l'objet envoyé
            title: title,
            description: description,
            price: price,
            owner: owner,
            latitude: latitude,
            longitude: longitude
        };

        // Envoie de la requête à l'api pour créer une nouvelle place
        fetch("http://localhost:5000/api/v1/places/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(log)
        })

        // Réception et je gestion de la réponse en cas d'erreur
        .then(response => {
            console.log("la requête à été envoyée !")
            if (!response.ok) {
                if (response.status === 400) {
                    const error_message = document.getElementById('error-message');
                    error_message.textContent = "Invalid input or user_id not found";
                } else {
                    throw new Error(`Server error: ${response.status}`);
                }
                return null;
            }
            return response.json();
        })

        // Gestions des données récupérées
        .then(data => {
            // Vérifie que les data sont correctes sinon sort du fetch
            if (!data) return;
            window.location.href = "index.html";    // Si ok redirection vers la page d'accueil
        })

        // Gestions des erreurs si echec de la requête
        .catch(error => {
            console.error("Request failed:", error);
        })

    })
})

