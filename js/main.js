$(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        initAll();
        initDb();
        long_metrage = true;
        short_metrage = false;

        tab_jour = new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
        today = new Date();
        dates = getDates();

        var validDay = false;
        for (var i = 0; i < dates.length; i++) {
            if (dates[i].getFullYear() === today.getFullYear()
                    && dates[i].getMonth() === today.getMonth()
                    && dates[i].getDate() === today.getDate()) {
                validDay = true;
            }
        }

        if (!validDay) {
            today = dates[0];
        }

        treatment();

        // FUNCTION

        function treatment() {
            $('#date_today').text(tab_jour[today.getDay()] + ' ' + today.getDate().toString());
            $('#film-list').empty();
            var resultBlocks = getAllBlockOfTheDay();
            resultBlocks.each(function(block) {
                $('#film-list').append(addToList(block));
            });
            resizeP();
        }

        function addToList(block) {
            var film = getFilmById(block.getFilmId());
            if (film.getEventPro() === '0') {
                var d = splitDate(block.getDatetime());
                var time = new Date(d.year, d.month, d.day, d.hours, d.minutes, d.seconds);
                var size = '';
                if (block.getPlace().toString().length > 8) {
                    size = 'style="font-size: 12px"';
                }
                var min = '';
                if (time.getMinutes() < 10) {
                    min = '0' + time.getMinutes();
                } else {
                    min = time.getMinutes();
                }
                var hour = '';
                if (time.getHours() < 10) {
                    hour = '0' + time.getHours();
                } else {
                    hour = time.getHours();
                }
                var timeList = '<li ' + size + '>' + hour + ':' + min + '</li>';
                var placeList = '<li ' + size + '>' + block.getPlace() + '</li>';
                var type = null;
                var color = '';
                if (film.getLongMetrage() === '1') {
                    type = 'LM';
                } else {
                    if (film.getShortFilm() === '1') {
                        type = 'CM';
                    } else {
                        if (film.getClip() === '1') {
                            type = 'Clip';
                        } else {
                            type = 'EVENT';
                            color = 'style="background-color: #DBF35A"';
                        }
                    }
                }
                var typeList = '<li ' + size + '>' + type + '</li>';
                var ul = '<ul>' + timeList + placeList + typeList + '</ul>';
                var sizeP = '';
                if (film.getTitle().toString().length > 40) {
                    sizeP = 'style="font-size: 14px; line-height: 14px"';
                }
                var p = '<p class="one-line" ' + sizeP + '>' + film.getTitle() + '</p>';

                return '<a href="film.html" ' + color + ' class="film" data-role="none" data-transition="slide" data-inline="true" onclick="window.id=' + film.getId() + '">' + ul + p + '</a>';
            }
        }

        function getKeyDate(dateSearch) {
            $.each(dates, function(key, date) {
                if (date.getFullYear() === dateSearch.getFullYear()
                        && date.getMonth() === dateSearch.getMonth()
                        && date.getDate() === dateSearch.getDate()) {
                    keyDate = key;
                }
            });
        }

        function resizeP() {
            var minValue = 30;
            $('#film-list a p').each(function() {
                var size = parseInt($(this).height());
                if (size <= minValue) {
                    $(this).attr('class', 'one-line');
                } else {
                    $(this).attr('class', 'two-lines');
                }
            });
        }

        function initDb() {
            favorites = new Favorites();
            favorites.fetch();
        }

        function initAll() {
            blocks = initBlock();
            films = initFilm();
            sessions = initSession();
        }

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

        $('#next-day').on('tap', function() {
            getKeyDate(today);
            if ((keyDate + 1) < dates.length) {
                today = dates[keyDate + 1];
                treatment();
            }
        });


        $('#previous-day').on('tap', function() {
            getKeyDate(today);
            if ((keyDate - 1) >= 0) {
                today = dates[keyDate - 1];
                treatment();
            }
        });

        $(window).on('orientationchange', function() {
            resizeP();
        });

        $(document).on('pageshow', '.index-page', function() {
            resizeP();
        });
    }
});