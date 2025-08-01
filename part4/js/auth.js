// Fonction pour vérifier que le user est bien connecté
function isLoggedIn() {
    if (localStorage.getItem('access_token') === null || localStorage.getItem('refresh_token') === null) {
        return false;
    } else { return true; }
};

// Fonction pour déconnecter le user avec clean du localStorage
function logoutUser() {
    console.log("logout appelé !")
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.reload();
}
