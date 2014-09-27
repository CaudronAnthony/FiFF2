$(document).on('pageinit', '.alpha-page', function() {

    trtAlpha();

    function trtAlpha() {
        $('.alpha-film-list').empty();
        films.each(function(film) {
            if (long_metrage) {
                $('.alpha-film-list').append(addToLmList(film));
            } else {
                if (short_metrage) {
                    $('.alpha-film-list').append(addToCmList(film));
                }
            }
        });
        resizeP();
    }

    function addToLmList(film) {
        if (film.getLongMetrage() === '1') {
            var type = null;
            if (film.getLongMetrage() === '1') {
                type = 'LM';
            } else {
                if (film.getShortFilm() === '1') {
                    type = 'CM';
                }
            }
            var typeList = '<li>' + type + '</li>';
            var ul = '<ul>' + typeList + '</ul>';
            var sizeP = '';
            if (film.getTitle().toString().length > 40) {
                sizeP = 'style="font-size: 14px; line-height: 14px"';
            }
            var p = '<p class="one-line" ' + sizeP + '>' + film.getTitle() + '</p>';
            return '<a href="film.html" class="film" data-role="none" data-transition="slide" data-inline="true" onclick="window.id=' + film.getId() + '">' + ul + p + '</a>';
        } else {
            return '';
        }
    }

    function addToCmList(film) {
        if (film.getShortFilm() === '1') {
            var type = null;
            if (film.getLongMetrage() === '1') {
                type = 'LM';
            } else {
                if (film.getShortFilm() === '1') {
                    type = 'CM';
                }
            }
            var typeList = '<li>' + type + '</li>';
            var ul = '<ul>' + typeList + '</ul>';
            var sizeP = '';
            if (film.getTitle().toString().length > 40) {
                sizeP = 'style="font-size: 12px; line-height: 10px"';
            }
            var p = '<p class="one-line" ' + sizeP + '>' + film.getTitle() + '</p>';
            return '<a href="film.html" class="film" data-role="none" data-transition="slide" data-inline="true" onclick="window.id=' + film.getId() + '">' + ul + p + '</a>';
        } else {
            return '';
        }
    }

    function resizeP() {
        var minValue = 30;
        $('.alpha-film-list a p').each(function() {
            var size = parseInt($(this).height());
            if (size <= minValue) {
                $(this).attr('class', 'one-line');
            } else {
                $(this).attr('class', 'two-lines');
            }
        });
    }

    // EVENT

    $(window).on("orientationchange", function() {
        resizeP();
    });

    $(document).on('pageshow', '.alpha-page', function() {
        resizeP();
    });

    $('.short').on('tap', function() {
        if (!short_metrage) {
            long_metrage = false;
            short_metrage = true;
            $('.short').removeClass('film-inactive').addClass('film-active');
            $('.long').removeClass('film-active').addClass('film-inactive');
            trtAlpha();
        }
    });

    $('.long').on('tap', function() {
        if (!long_metrage) {
            long_metrage = true;
            short_metrage = false;
            $('.long').removeClass('film-inactive').addClass('film-active');
            $('.short').removeClass('film-active').addClass('film-inactive');
            trtAlpha();
        }
    });
});