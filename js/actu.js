$(document).on('pageshow', '.actu-page', function() {
    var connectionType = checkConnection();

    if (connectionType === 'none') {
        $('#actu-hl').text('Pour consulter la page des actualités, veuillez vous connecter à internet.');
        $('#actu-frame').hide();
    } else {
        $('#actu-hl').text('');
        $('#actu-frame').show();
    }

    function checkConnection() {
        return navigator.network.connection.type;
    }
});