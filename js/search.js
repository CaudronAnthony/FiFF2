$(document).on('pageinit', '.search-page', function() {
    trtSearch();
});

window.search = function(page) {

    var search = getSearchValue(page);
    searchResults = new Films();

    films.each(function(film) {
        var save = false;
        // Recherche sur le titre du film
        if (film.getTitle().toLowerCase().search(search) > -1) {
            save = true;
        }
        // Recherche sur la catégorie
        if (film.getCategory().toLowerCase().search(search) > -1) {
            save = true;
        }


        if (save) {
            searchResults.add(film);
        }
    });

    $.mobile.changePage('search.html', {transition: 'slide', reverse: true});
    refreshSearch(page);
};

function trtSearch() {
    $('.search-film-list').empty();
    searchResults.each(function(searchResult) {
        $('.search-film-list').append(addToSearchList(searchResult));
    });
    resizeP();
}

function addToSearchList(searchResult) {
    var type = null;
    if (searchResult.getLongMetrage() === '1') {
        type = 'LM';
    } else {
        if (searchResult.getShortFilm() === '1') {
            type = 'CM';
        } else {
            if (searchResult.getClip() === '1') {
                type = 'Clip';
            } else {
                if (searchResult.getEventPublic() === '1') {
                    type = 'EVENT';
                } else {
                    type = 'PRO';
                }
            }
        }
    }
    var typeList = '<li>' + type + '</li>';
    var ul = '<ul>' + typeList + '</ul>';
    var sizeP = '';
    if (searchResult.getTitle().toString().length > 40) {
        sizeP = 'style="font-size: 14px; line-height: 14px"';
    }
    var p = '<p class="one-line" ' + sizeP + '>' + searchResult.getTitle() + '</p>';
    return '<a href="film.html" class="film" data-role="none" data-transition="slide" data-inline="true" onclick="window.id=' + searchResult.getId() + '">' + ul + p + '</a>';
}

function resizeP() {
    var minValue = 30;
    $('.search-film-list a p').each(function() {
        var size = parseInt($(this).height());
        if (size <= minValue) {
            $(this).attr('class', 'one-line');
        } else {
            $(this).attr('class', 'two-lines');
        }
    });
}

function refreshSearch(page) {
    switch (page) {
        case 'index':
            $('.index-page form').find('[name="search"]').val('');
            break;
        case 'film':
            $('.film-page form').find('[name="search"]').val('');
            break;
        case 'actu':
            $('.actu-page form').find('[name="search"]').val('');
            break;
        case 'alpha':
            $('.alpha-page form').find('[name="search"]').val('');
            break;
        case 'contact':
            $('.contact-page form').find('[name="search"]').val('');
            break;
        case 'fav':
            $('.fav-page form').find('[name="search"]').val('');
            break;
        case 'film':
            $('.film-page form').find('[name="search"]').val('');
            break;
        case 'infos':
            $('.infos-page form').find('[name="search"]').val('');
            break;
        case 'plan':
            $('.plan-page form').find('[name="search"]').val('');
            break;
        case 'search':
            $('.search-page form').find('[name="search"]').val('');
            break;
        case 'tarifs':
            $('.tarifs-page form').find('[name="search"]').val('');
            break;
        case 'tarifs':
            $('.pros-page form').find('[name="search"]').val('');
            break;
        default:
            break;
    }
}

function getSearchValue(page) {
    var search;

    switch (page) {
        case 'index':
            search = $('.index-page form').find('[name="search"]').val().toLowerCase();
            break;
        case 'film':
            search = $('.film-page form').find('[name="search"]').val().toLowerCase();
            break;
        case 'actu':
            search = $('.actu-page form').find('[name="search"]').val().toLowerCase();
            break;
        case 'alpha':
            search = $('.alpha-page form').find('[name="search"]').val().toLowerCase();
            break;
        case 'contact':
            search = $('.contact-page form').find('[name="search"]').val().toLowerCase();
            break;
        case 'fav':
            search = $('.fav-page form').find('[name="search"]').val().toLowerCase();
            break;
        case 'film':
            search = $('.film-page form').find('[name="search"]').val().toLowerCase();
            break;
        case 'infos':
            search = $('.infos-page form').find('[name="search"]').val().toLowerCase();
            break;
        case 'plan':
            search = $('.plan-page form').find('[name="search"]').val().toLowerCase();
            break;
        case 'search':
            search = $('.search-page form').find('[name="search"]').val().toLowerCase();
            break;
        case 'tarifs':
            search = $('.tarifs-page form').find('[name="search"]').val().toLowerCase();
            break;
        default:
            break;
    }

    return search;
}

// EVENT

$(window).on("orientationchange", function() {
    resizeP();
});

$(document).on('pageshow', '.search-page', function() {
    resizeP();
});