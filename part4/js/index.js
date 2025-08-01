// Ecoute si la page à finie de charger
document.addEventListener('DOMContentLoaded', function () {

    // Récupération des éléments du document pour afficher les boutons
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');
    const addPlace = document.getElementById('add-place-link');

    // Récupération des éléments du document pour y ajouter des composants
    let places_list = document.getElementById('places-list');

    // Récupération de l'élément slider de tri de prix dans le document
    // Création d'un tablau de valeurs pour le slider de tri
    const slider = document.getElementById('price-slider');
    const sliderValues = ['All', 100, 50, 10];

    // Création d'un tableau vide pour récupérer et afficher toutes les places de la BDD
    let allPlaces = [];

    // Affichage conditionnel des boutons du header selon le statut de connexion
    if (isLoggedIn()) {
        loginLink.style.display = 'none';
        addPlace.style.display = 'inline-block'
        logoutLink.style.display = 'inline-block';
    } else {
        loginLink.style.display = 'inline-block';
        addPlace.style.display = 'none';
        logoutLink.style.display = 'none';
    }

    // Ajout d'un écouteur sur le bouton de déconnexion
    logoutLink.addEventListener('click', function (event) {
        event.preventDefault();     // Bloque le rafraichissement de la page
        logoutUser();               //Appel la fonction de déconnexion (auth.js)
    });

    // Fonction pour afficher toutes les places
    function displayPlaces(places) {

        // Vide le composant html qui contient toutes les places (bonnes pratiques)
        places_list.innerHTML = '';

        // Boucle sur la liste allPlaces pour récupérer les infos de chaque place
        for (const item of places) {

            // Création du model de composant injecté dynamiquement dans le html
            places_list.innerHTML += `
                <a href="place.html?id=${item.id}&image=${item.image_url.split('/').pop()}" class="place-card-link">
                    <div class="place-card">
                        <img src="${item.image_url}" alt="Image of ${item.title}" class="place-card-image">
                        <div class="place-card-info">
                            <h3>${item.title}</h3>
                            <div class="info-price">
                                <p>
                                    Price per night: ${item.price}
                                </p>
                                <img src="assets/clochette.png" class="place-card-price">
                            </div>
                        </div>
                    </div>
                </a>`;
        }
    }

    // Ajout d'un écouteur sur le slider pour déterminer la position du curseur dans le tableau de valeurs
    slider.addEventListener('input', function (event) {
        const sliderIndex = parseInt(event.target.value);   // Récupère l'index pointé par l'event
        const maxPrice = sliderValues[sliderIndex];         // Récupère la valeur pointée par l'index

        filterPlaceByPrice(maxPrice);                       // Appel de la fonction de tri des places
    })

    // Fonction pour filtrer les prix des places et leurs affichages
    // Prend en argument la valeur de l'index pointé
    function filterPlaceByPrice(maxPrice) {
        let filteredPlaces = [];                            // Création d'un tableau vide

        // Toggle pour trier les places
        if (maxPrice === 'All') {                           // Si toutes les places
            filteredPlaces = allPlaces;                     // Récupère toutes les places
        } else {                                            // sinon ...
            for (let i = 0; i < allPlaces.length; i++) {    // Boucle pour parcourir tout le tableau de places
                let place = allPlaces[i];                   // Stock la place selon sont index

                // Vérifie le prix de la place avec la valeur de l'index du tableau du slider
                if (place.price <= maxPrice) {
                    filteredPlaces.push(place);             // Si OK l'envoie dans le tableau sinon continu la boucle
                }
            }
        }

        // Appel de la fonction pour afficher les places avec le tri des places en argument
        displayPlaces(filteredPlaces);
    }

    // Envoie de la requête à l'api places pour récupérer toutes les places de la BDD
    fetch("http://localhost:5000/api/v1/places/", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('access_token')},
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
        // Création d'un tableau avec des path d'images
        const imagePaths = [
            "assets/bord_de_mer.jpg",
            "assets/bord_du_lac.jpg",
            "assets/campagne.jpg",
            "assets/foret.jpg",
            "assets/montagne.jpg",
            "assets/tente.jpg",
            "assets/cottage.jpg",
            "assets/maison_marron.jpg",
            "assets/maison_rose.jpg"
        ];

        // Boucle pour attribuer une image à chaque place récupérée
        for (let index = 0; index < data.length; index++) {
            const place = data[index];
            const imageIndex = index % imagePaths.length;
            place.image_url = imagePaths[imageIndex];
        }

        allPlaces = data;           // Stock les data récupérées dans le tableau allPlaces
        displayPlaces(allPlaces);   // Appel de la fonction displayPlaces pour les renvoyer côté client
    })

    // Gestions des erreurs si echec de la requête
    .catch(error => {
        console.error("Erreur lors de la requête :", error);
    });
});
