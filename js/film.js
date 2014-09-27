$(document).on('pageinit', '.film-page', function() {

    tab_jour_min = new Array("Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa");
    mainFilm();

    function mainFilm() {
        $('#projection').html('');
        $('.film-title').html('');
        $('#duration').html('');
        $('#title-pro').html('');
        $('#synopsis').html('');
        $('#producer').html('');
        $('#actors').html('');
        $('#country').html('');
        $('#compt-cat').html('');
        $('#fiff-campus').html('');
        $('.film-favorite').html('');

        $('#title-pro').text('');
        $('.film-favorite').show();
        $('#projection').show();

        $('.film-header').show();
        $('.film-synopsis').show();
        var filmId = id;
        var film = getFilmById(filmId);
        var resultSessions = getSessionByFilmId(filmId);
        console.log(film, resultSessions);

        if (film.getLongMetrage() === '1') {
            $('#header-title').text('Long métrage');
        } else {
            if (film.getShortFilm() === '1') {
                $('#header-title').text('Court métrage');
            } else {
                if (film.getClip() === '1') {
                    $('#header-title').text('Clip');
                } else {
                    if (film.getEventPro() === '1') {
                        $('#header-title').text('Espace pro');
                    } else {
                        $('#header-title').text('Evénement');
                    }
                }
            }
        }

        $('.film-title').text(film.getTitle());
        if (film.getDuration() !== 'NULL') {
            $('#duration').text(film.getDuration() + ' min');
        }
        $('.film-header').css('background', 'url(img/film/' + film.getImgLink() + ') center top no-repeat');
        $('.film-header').css('background-size', 'cover');


        if (film.getCategory() !== 'NULL' && film.getCategory()) {
            $('#category').text('   ' + film.getCategory());
        }
        if (resultSessions) {
            resultSessions.each(function(session) {
                var d = splitDate(session.getDatetime());
                var datetimeSession = new Date(d.year, d.month, d.day, d.hours, d.minutes, d.seconds);

                var dataSessionId = 'data-sessionid="' + session.getId() + '"';
                var dataSessionFilmId = 'data-sessionfilmid="' + session.getFilmId() + '"';
                var dataSessionDatetime = 'data-sessiondatetime="' + session.getDatetime() + '"';
                var dataSessionPlace = 'data-sessionplace="' + session.getPlace() + '"';
                var dataSessionIsFav = 'data-sessionisfav="' + ((isFavorite(session.getId())) ? 1 : 0) + '"';

                var dataSession = dataSessionId + ' ' + dataSessionFilmId + ' ' + dataSessionDatetime + ' ' + dataSessionPlace + ' ' + dataSessionIsFav;

                var dateLi = '<li>' + tab_jour_min[datetimeSession.getDay()] + datetimeSession.getDate() + '</li>';
                var min = '';
                if (datetimeSession.getMinutes() < 10) {
                    min = '0' + datetimeSession.getMinutes();
                } else {
                    min = datetimeSession.getMinutes();
                }
                var hour = '';
                if (datetimeSession.getHours() < 10) {
                    hour = '0' + datetimeSession.getHours();
                } else {
                    hour = datetimeSession.getHours();
                }
                var timeLi = '<li>' + hour + ':' + min + '</li>';
                var sizeLi = '';
                if (session.getPlace().toString().length > 10) {
                    sizeLi = 'style="font-size: 14px; line-height: 12px"';
                }
                var placeLi = '<li ' + sizeLi + '>' + session.getPlace() + '</li>';
                var classLi = 'add-favorite fav-btn';
                if (isFavorite(session.getId())) {
                    classLi = 'is-favorite fav-btn';
                }
                var favLi = '<li><a href="#" class="' + classLi + '" ' + dataSession + '>Ajouter à mon festival</a></li>';
                var list = dateLi + timeLi + placeLi + favLi;
                var ul = '<ul class="film-show">' + list + '</ul>';

                var p = '';

                var ulp = ul;

                var sessionFilms = getFilmsByBlockId(session.getBlockId());
                var count = 0;
                sessionFilms.each(function(se) {
                    count++;
                });
                if (count > 1) {
                    if (count <= 2) {
                        sessionFilms.each(function(se) {
                            if (filmId.toString() !== se.getId()) {
                                p = '<p id="projection">Projeté avec <a class="link" data-filmid="' + se.getId() + '" href="#">' + se.getTitle() + '</a></p>';
                            }
                        });
                    } else {
                        var i = 0;
                        sessionFilms.each(function(se) {
                            if (i === 0) {
                                if (filmId.toString() !== se.getId()) {
                                    p = '<p id="projection">Projeté avec <a class="link" data-filmid="' + se.getId() + '" href="#">' + se.getTitle() + '</a>';
                                    i++;
                                }
                            } else {
                                if (filmId.toString() !== se.getId()) {
                                    p += ', <a class="link" data-filmid="' + se.getId() + '" href="#">' + se.getTitle() + '</a>';
                                    i++;
                                }
                            }
                        });
                        p += '</p>';
                    }

                    ulp += p;
                }

                $('.film-favorite').append(ulp);
            });
        }


        if (film.getSession() === '1') {
            $('.film-header').hide();
            $('.film-synopsis').hide();
            $('#producer').html('<span>' + film.getTitle() + '</span>');
        }

        if (film.getEventPro() === '1') {
            $('#title-pro').text(film.getTitle());
            $('.film-header').hide();
            $('.film-favorite').hide();
        }

        if (film.getEventPublic() === '1') {
            $('#title-pro').text(film.getTitle());
            $('.film-header').hide();
            $('#projection').hide();
        }

        if (film.getCompetitionCategory() !== 'NULL' && film.getCompetitionCategory()) {
            $('#compt-cat').html(film.getCompetitionCategory());
        }
        if (film.getSynopsis() !== 'NULL' && film.getSynopsis()) {
            $('#synopsis').html(film.getSynopsis());
        }
        if (film.getProducer() !== 'NULL' && film.getProducer()) {
            $('#producer').html('<span>De</span> ' + film.getProducer());
        }
        if (film.getActors() !== 'NULL' && film.getActors()) {
            $('#actors').html('<span>Avec</span> ' + film.getActors());
        }
        if (film.getCountry() !== 'NULL' && film.getCountry()) {
            $('#country').text(film.getCountry());
        }
        if (film.getFiffCampus() === '0') {
            $('#fiff-campus').hide();
        }
        $('#video').hide();
        if (film.getTrailerLink() !== 'NULL' && film.getTrailerLink() !== '') {
            $('#video').show();
            href = film.getTrailerLink();
            //$('#video').attr('href', film.getTrailerLink());
            //$('#video').attr('target', '_blank');
        }

        // FUNCTION

        function splitDate(dateString) {
            var date = dateString.split('-');
            var dayTab = date[2].split(' ');
            var time = dateString.split(':');
            var hour = time[0].split(' ');

            var month = 0;
            if (date[1] === '09') {
                month = 8;
            } else {
                month = 9;
            }

            var datetime = {
                year: date[0],
                month: month,
                day: dayTab[0],
                hours: hour[1],
                minutes: time[1],
                seconds: time[2]
            };

            return datetime;
        }


        // EVENT

        $('#video').on('tap', function() {
            window.open(href, '_blank', 'location=yes');
        });

        $('.link').on('tap', function() {
            window.id = parseInt($(this).attr('data-filmid'));
            console.log(id);
            mainFilm();
        });

        $('.fav-btn').on('tap', function() {
            var sessionId = $(this).attr('data-sessionid');
            var sessionFilmId = $(this).attr('data-sessionfilmid');
            var sessionDatetime = $(this).attr('data-sessiondatetime');
            var sessionPlace = $(this).attr('data-sessionplace');
            var sessionIsFav = $(this).attr('data-sessionisfav');

            if (sessionIsFav === '1') {
                $(this).attr('class', 'add-favorite fav-btn');
                $(this).attr('data-sessionisfav', '0');
                removeFavorite(sessionId);
            } else {
                $(this).attr('class', 'is-favorite fav-btn');
                $(this).attr('data-sessionisfav', '1');
                addFavorite(sessionId, sessionFilmId, sessionDatetime, sessionPlace);
            }
        });
    }
});