$(document).on('pageinit', '.pro-page', function() {
    trtPro();

    function trtPro() {
        $('.pro-list').empty();
        $('#pro-day').text(tab_jour[today.getDay()] + ' ' + today.getDate());
        var prosOfTheDay = getAllProsOfTheDay();
        
        prosOfTheDay.each(function(proOfTheDay) {
            var listElement = addToProList(proOfTheDay);
            $('.pro-list').append(listElement);
        });
        resizeP();
    }

    function addToProList(proOfTheDay) {
        var film = getFilmById(proOfTheDay.getFilmId());
        var d = splitDate(proOfTheDay.getDatetime());
        var time = new Date(d.year, d.month, d.day, d.hours, d.minutes, d.seconds);
        var size = '';
        if (proOfTheDay.getPlace().toString().length > 8) {
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
        var timeList = '<li>' + hour + ':' + min + '</li>';
        var placeList = '<li ' + size + '>' + proOfTheDay.getPlace() + '</li>';
        var ul = '<ul>' + timeList + placeList + '</ul>';
        var sizeP = '';
        if (film.getTitle().toString().length > 40) {
            sizeP = 'style="font-size: 14px; line-height: 14px"';
        }
        var p = '<p class="one-line" ' + sizeP + '>' + film.getTitle() + '</p>';

        return '<a href="film.html" class="film" data-role="none" data-transition="slide" data-inline="true" onclick="window.id=' + film.getId() + '">' + ul + p + '</a>';
    }

    function resizeP() {
        var minValue = 30;
        $('.pro-list a p').each(function() {
            var size = parseInt($(this).height());
            if (size <= minValue) {
                $(this).attr('class', 'one-line');
            } else {
                $(this).attr('class', 'two-lines');
            }
        });
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

    $('#next-pro').on('tap', function() {
        getKeyDate(today);
        if ((keyDate + 1) < dates.length) {
            today = dates[keyDate + 1];
            trtPro();
        }
    });


    $('#previous-pro').on('tap', function() {
        getKeyDate(today);
        if ((keyDate - 1) >= 0) {
            today = dates[keyDate - 1];
            trtPro();
        }
    });

    $(window).on("orientationchange", function() {
        resizeP();
    });

    $(document).on('pageshow', '.pro-page', function() {
        resizeP();
    });
});