$(document).on('pagebeforeshow', '.plan-page', function() {
    $('#map-hl').hide();
});
$(document).on('pageshow', '.plan-page', function() {
    map();

    function map() {
        $('#map-hl').show();
    }

    $(window).on("orientationchange", function() {
        map();
    });
});