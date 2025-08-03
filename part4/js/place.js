// Récupération de données dans l'URL
const urlParams = new URLSearchParams(window.location.search);

const placeId = urlParams.get('id');                    // Récupération du place ID
const imageUrl = urlParams.get('image');                // Récupération de l'image de la place
const user = JSON.parse(localStorage.getItem('user'));  // Récupération de l'objet user dans le localStorage
const userId = user?.id;                                // Récupération de l'ID du user connecté

// Récupération des images des étoiles
const fullStarImagePath = "./assets/full_star.png";
const emptyStarImagePath = "./assets/empty_star.png";

// Récupération des éléments dans le document
let place_section = document.getElementById('place-details');
let reviews_section = document.getElementById('reviews-list');
const reviewForm = document.getElementById('review-form');
const stars = document.querySelectorAll('.rating-stars .star');
let selectedRating = 0;                                             // Initialisation du nb d'étoile(s)

// -------------------------------------------------------- Gestion pour attribuer des images aux users

function getAvatarPath(firstName) {
    const cleanName = firstName.toLowerCase().replace(/\s+/g, '');
    return `assets/avatars/${cleanName}.jpg`;
}

// -------------------------------------------------------- Gestion des étoiles

// Gestion des étoiles du formulaire d'ajout de commentaire
// Boucle pour parcourir les composants étoiles
for (let index = 0; index < stars.length; index++) {
    const star = stars[index];                                      // Stock le composant étoile pointé
    const starIndex = index + 1;                                    // transforme index = 0 à 4 en index = 1 à 5

    // Gestion du Hover -> surligne de la première étoile jusqu’à celle survolée
    star.addEventListener('mouseover', function () {
        updateStars(starIndex);
    });

    // Quand la souris quitte le champ  -> revenir à zéro et en attente d'event
    star.addEventListener('mouseleave', function () {
        updateStars(selectedRating);
    });

    // Click : on enregistre la note
    star.addEventListener('click', function () {
        selectedRating = starIndex;
        document.getElementById('rating').value = selectedRating;   // Envoie de la note (int) dans le formulaire
        console.log("Note sélectionnée :", selectedRating);
        console.log("Champ hidden rating :", document.getElementById('rating').value);
    });
};

// Fonction pour gérer les étoiles pleines et les étoiles vides
function updateStars(rating) {
    // Boucle pour parcourir les composants étoiles
    for (let index = 0; index < stars.length; index++) {
        const star = stars[index];

        // Vérifie si l'index est inférieur à la note passée en argument
        if (index < rating) {
            star.src = 'assets/full_star.png';  // OK ⭐️ pleine
        } else {
            star.src = 'assets/empty_star.png'; // NOK ☆ vide
        }
    };
}

// Fonction pour afficher les étoiles
function getStars(rating) {

    // Stock les composants étoile pleine et vide dans des constantes
    const fullStar = `<img src="${fullStarImagePath}" alt="full star" class="full-star-icone">`;
    const emptyStar = `<img src="${emptyStarImagePath}" alt="empty star" class="empty-star-icone">`

    const max = 5;      // Stock le nb max de composants possible

    // Retourne n fois le nb d'étoiles pleines + 5 - n fois le nb d'étoiles vides
    return fullStar.repeat(rating) + emptyStar.repeat(max - rating);
}

// -------------------------------------------------------- Affichage des places

// Fonction pour afficher les places de la BDD
function displayPlace(place) {

    // Création du model de composant injecté dynamiquement dans le html
    place_section.innerHTML = `
        <h1>${place.title}</h1>
        <img src="assets/${imageUrl}" alt="Image of place" class="place-details-img">
        <div class="place-map-info">
            <div class="map-container">
                <img src="assets/carte.jpg" alt="Carte de l’île" class="map-image">
                <img src="assets/icone_maison_rouge.png" alt="Maison" class="map-marker" id="map-marker">
            </div>
            <div class="place-details-info">
                <div class="place-owner">
                    <img src="${getAvatarPath(place.owner.first_name)}" alt="owner avatar" class="avatar-img">
                    <h4>${place.owner.first_name} ${place.owner.last_name}</h4>
                </div>
                <div class="place-price">
                    <p>Price per night : ${place.price}</p>
                    <img src="assets/clochette.png" class="place-card-price">
                </div>
                <p>Description : ${place.description}</p>
                <p>Amenities : ${place.amenities.map(amenity => amenity.name).join(', ')}</p>
            </div>
        </div>`

        // Récupération des coordonnées
        let latitude = place.latitude;
        let longitude = place.longitude;

        // Récupération des éléments HTML tout just crées
        const mapImage = document.querySelector('.map-image');
        const mapContainer = document.querySelector('.map-container');
        const marker = document.getElementById('map-marker');

        // Gestion de la carte interactive avec la longitude et latitude de la place
        // Attend que l'image de la carte soit bien chargée
        mapImage.onload = function () {
            const mapWidth = mapContainer.offsetWidth;      // Récupère ma width en % -> en px
            const mapHeight = mapContainer.offsetHeight;    // Récupère la height en % -> en px

            // Création de mes axes X et Y
            const x = ((longitude + 180) / 360) * mapWidth;
            const y = ((-latitude + 90) / 180) * mapHeight;

            // Gestion du déplacement de mon curseur sur la carte selon la latitude et longitude passées à la place
            marker.style.left = `${x}px`;
            marker.style.top = `${y}px`;
        };
}

// -------------------------------------------------------- Affichage les reviews

// Fonction pour afficher les reviews
function displayReviews(place) {

    // Boucle sur les infos des places
    for (const  item of place) {
        const avatar = getAvatarPath(item.user.first_name);

        // Création du model de composant injecté dynamiquement dans le html
        reviews_section.innerHTML += `
            <div class="review-details-card">
                <img src="${avatar}" alt="${item.user.first_name}" class="avatar-img">
                <div class="review-info">
                    <h4>${item.user.first_name} ${item.user.last_name} </h4>
                    <p>${item.text}</p>
                    <p>${getStars(item.rating)}</p>
                </div>
            </div>`
    }
}

// -------------------------------------------------------- Gestion des appels aux API

// Envoie de la requête à l'api pour récupérer une place par son ID
fetch(`http://localhost:5000/api/v1/places/${placeId}`, {
    method: "GET",
    headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('access_token')
    }
})

// Réception et je gestion de la réponse en cas d'erreur
.then(response => {
    if (!response.ok) {
        throw new Error(`Erreur serveur : ${response.status}`);
    }
    return response.json();
})

// Gestions des données récupérées
.then(data => {
    console.log(data);
    displayPlace(data)
    displayReviews(data.reviews)

    // Vérification si le user est connecté
    const accessToken = localStorage.getItem('access_token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (accessToken && user) {
        document.getElementById('add-review').style.display = "block";  // Affiche le formulaire
    } else {
        document.getElementById('add-review').style.display = "none";   // Masque le formulaire si non log
    }
    })

// Gestions des erreurs si echec de la requête
.catch(error => {
    console.error("Erreur lors de la requête :", error);
});

// Récupération et traitement des données par un fetch
// Ecoute de l'action d'envoie du formulaire
reviewForm.addEventListener('submit', function(event) {

    event.preventDefault();     // Bloque le rafraichissement de la page lors du submit

    const accessToken = localStorage.getItem('access_token');           // Récupération du token dans le localStorage
    const text = document.getElementById('review-text').value.trim();   // Valeur nettoyée du text
    const rating = parseInt(document.getElementById('rating').value);   // Valeur de la note
    const log = {                                                       // Model de l'objet envoyé
        place_id: placeId,
        text: text,
        rating: rating
    };

    console.log("Note envoyée :", rating);
    console.log("Objet log envoyé :", log);

    // Gestion retour des erreurs côté client
    if (!rating || rating < 1 || rating > 5) {
        alert("Veuillez sélectionner une note entre 1 et 5.");
        return;
    }

    // Envoie de la requête à l'api pour créer une nouvelle review
    fetch(`http://localhost:5000/api/v1/reviews/`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + accessToken
        },
        body: JSON.stringify(log)
    })

    // Réception et je gestion de la réponse en cas d'erreur
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur lors de l'envoi de l'avis : ${response.status}`);
        }
        return response.json();
    })

    // Gestions des données récupérées
    .then(data => {
        displayReviews([data]);                             // Appel de la fonction pour l'affichage des reviews
        document.getElementById('review-form').reset();     // Remise à zéro du formulaire de review
    })

    // Gestions des erreurs si echec de la requête
    .catch(error => {
        console.error("Erreur lors de l'envoi :", error);
        alert("Échec de l'envoi de l'avis.");
    });
});

// Ecoute si la page à finie de charger
document.addEventListener('DOMContentLoaded', function () {

    // Récupération des éléments du document pour le form addReview
    const ratingInput = document.getElementById('rating');

    // Vérifie si les composants sont présent
    if (!stars || !ratingInput) return;

    // Boucle pour ajouter les écouteurs d'event
    for (let i = 0; i < stars.length; i++) {
        const star = stars[i];                          // Sélectionne un composant étoile selon l'index

        // Ecoute au click sur chaque composant
        star.addEventListener('click', function () {
            const selectedRating = this.getAttribute('data-index');
            ratingInput.value = selectedRating;                     // Récupère la valeur de la note

            // Boucle pour actualisation du style visuel du form étoile
            for (let j = 0; j < stars.length; j++) {
                const etoile = stars[j];                // Sélectionne un composant étoile selon l'index
                etoile.classList.remove('selected');    // Remet les étoiles en non sélectionnées

                // Vérifie la valeur de l'étoile et la note sélectionnées
                if (parseInt(etoile.getAttribute('data-index')) <= parseInt(selectedRating)) {
                    etoile.classList.add('selected'); // Si OK ont la selectionne
                }
            }
        });
    }
});

