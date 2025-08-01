// Ecoute si la page à finie de charger
document.addEventListener('DOMContentLoaded', function () {

        // Récupération des éléments du document pour le form login
        const loginForm = document.getElementById('login-form');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const loginButton = document.getElementById('login-button');

        // Récupération des éléments du document pour le form signup
        const signupForm = document.getElementById('signup-form');
        const signup_first_name = document.getElementById('first-name');
        const signup_last_name = document.getElementById('last-name');
        const signup_email = document.getElementById('signup-email');
        const signup_password = document.getElementById('signup-password');
        const signupButton = document.getElementById('signup-button');

        // Fonction pour bloquer les boutons de submit si les champs obligatoire ne sont pas remplis
        function toggleButtonState() {
            // Nettoie et vérifie les champs du formulaire de login
            if (
                emailInput.value.trim() !== '' && passwordInput.value.trim() !== '') {
                loginButton.disabled = false;
            } else {
                loginButton.disabled = true;
            }

            // Nettoie et vérifie les champs du formulaire de signup
            if (
                signup_first_name.value.trim() !== '' &&
                signup_last_name.value.trim() !== '' &&
                signup_email.value.trim() !== '' &&
                signup_password.value.trim() !== ''
            ) {
                signupButton.disabled = false;
            } else {
                signupButton.disabled = true;
            }
        }

        // Ecoute et vérifie avec la fonction toggle si les champs sont remplis pour bloquer le bouton ou non
        // Vérification pour login
        emailInput.addEventListener('input', toggleButtonState);
        passwordInput.addEventListener('input', toggleButtonState);

        // Vérification pour signup
        signup_first_name.addEventListener('input', toggleButtonState);
        signup_last_name.addEventListener('input', toggleButtonState);
        signup_email.addEventListener('input', toggleButtonState);
        signup_password.addEventListener('input', toggleButtonState);

        // Appel de la fonction toggle quand tout les champs seront remplis ou en cas de correction
        toggleButtonState();

        // Ecoute si le client corrige un input erroné après un message d'erreur -> remet à zéro le message d'erreur
        emailInput.addEventListener('input', function () {
            document.getElementById('error-message').textContent = "";
        });
        passwordInput.addEventListener('input', function () {
            document.getElementById('error-message').textContent = "";
        });

        // Récupération et traitement des données par un fetch
        // Si c'est pour le connexion :
        if (loginForm) {
            // Ecoute de l'action d'envoie du formulaire
            loginForm.addEventListener('submit', function (event) {

                    event.preventDefault();     // Bloque le rafraichissement de la page lors du submit

                    const email = emailInput.value;                       // Valeur de l'email
                    const password = passwordInput.value;                 // Valeur du password

                    const log = { email: email, password: password};      // Model de l'objet envoyé

                    // Envoie de la requête à l'api d'authentification pour la connexion
                    fetch("http://localhost:5000/api/v1/auth/login", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(log)})

                    // Réception et je gestion de la réponse en cas d'erreur
                    .then(response => {
                        if (!response.ok) {
                            if (response.status === 401) {
                                const error_message = document.getElementById('error-message');
                                error_message.textContent = "Invalid email or password";
                            } else {
                                throw new Error(`Erreur serveur : ${response.status}`);
                            }
                            return null;
                        }
                        return response.json();
                    })

                    // Gestions des données récupérées
                    .then(data => {
                        localStorage.setItem("access_token", data.access_token);    // Envoie du token dans le localStorage
                        localStorage.setItem("refresh_token", data.refresh_token);  // Envoie du refresh token dans le localStorage
                        localStorage.setItem("user", JSON.stringify(data.user));    // Envoie de l'objet user dans le localStorage (Récupération du First et Last name)
                        window.location.href = "index.html";                        // Rédirection vers la page d'accueil
                    })

                    // Gestions des erreurs si echec de la requête
                    .catch(error => {
                        console.error("Request failed:", error);
                    });
            })
        }

        // Si c'est pour le formulaire d'inscription :
        if (signupForm) {
            // Ecoute de l'action d'envoie du formulaire
            signupForm.addEventListener('submit', function (event) {
                event.preventDefault();     // Bloque le rafraichissement de la page lors du submit

                const first_name = signup_first_name.value; // Valeur du first name
                const last_name = signup_last_name.value;   // Valeur du last name
                const email = signup_email.value;           // Valeur de l'email
                const password = signup_password.value;     // Valeur du password

                const user = {                              // Model de l'objet envoyé
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: password,
                    is_admin: false
                };

                // Envoie de la requête à l'api pour créer un nouveau user
                fetch("http://localhost:5000/api/v1/users/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user)
                })

                // Réception et je gestion de la réponse en cas d'erreur
                .then(response => {
                    if (!response.ok) {
                        if (response.status === 400) {
                            document.getElementById('error-message').textContent =
                                "Invalid input data or email already registered";
                        } else {
                            throw new Error(`Erreur serveur : ${response.status}`);
                        }
                        return null;
                    }
                    return response.json();
                })

                // Gestions des données récupérées
                .then(data => {
                    if (!data) return;

                    // Envoie de la requête à l'api d'authentification pour la connexion juste après l'inscription
                    return fetch("http://localhost:5000/api/v1/auth/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: email, password: password })
                    });
                })

                // Réception et je gestion de la réponse en cas d'erreur
                .then(response => {
                    if (!response || !response.ok) {
                        if (response && response.status === 401) {
                            document.getElementById('error-message').textContent = "Login failed after signup";
                        } else if (response) {
                            throw new Error(`Erreur serveur : ${response.status}`);
                        }
                        return;
                    }
                    return response.json();
                })

                // Gestions des données récupérées
                .then(data => {
                    // Vérifie que les data sont correctes sinon sort du fetch
                    if (!data) return;

                    localStorage.setItem("access_token", data.access_token);    // Envoie le token dans le localStorage
                    localStorage.setItem("refresh_token", data.refresh_token);  // Envoie le refresh token dans le localStorage
                    localStorage.setItem("user", JSON.stringify(data.user));    // Envoie l'objet user dans le localStorage (récupération du first et last name)
                    window.location.href = "index.html";                        // Redirection vers la page d'accueil
                })

                // Gestions des erreurs si echec de la requête
                .catch(error => {
                    console.error("Request failed:", error);
                });

            });
        }
});
