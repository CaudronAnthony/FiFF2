window.Favorite = Backbone.Model.extend({
    defaults: {
        film_id: null,
        session_id: null,
        datetime: null,
        place: null
    },
    getFilmId: function() {
        return this.get('film_id');
    },
    setFilmId: function(value) {
        this.set({film_id: value});
    },
    getSessionId: function() {
        return this.get('session_id');
    },
    setSessionId: function(value) {
        this.set({session_id: value});
    },
    getDatetime: function() {
        return this.get('datetime');
    },
    setDatetime: function(value) {
        this.set({datetim: value});
    },
    getPlace: function() {
        return this.get('place');
    },
    setPlace: function(value) {
        this.set({place: value});
    }
});

window.Favorites = Backbone.Collection.extend({
    model: Favorite,
    localStorage: new Store("favorites"),
    sort_key: 'datetime',
    comparator: function(item) {
        return item.get(this.sort_key);
    },
    sortByField: function(fieldName) {
        this.sort_key = fieldName;
        this.sort();
    }
});

window.getAllFavorites = function() {
    return favorites;
};

window.isFavorite = function(sessionId) {
    var favorites = getAllFavorites();
    var isFav = false;
    favorites.each(function(fav) {
        if (fav.getSessionId() === parseInt(sessionId)) {
            isFav = true;
        }
    });
    return isFav;
};

window.addFavorite = function(sessionId, filmId, datetime, place) {
    var favorites = getAllFavorites();
    var fav = new Favorite({
        session_id: parseInt(sessionId),
        film_id: parseInt(filmId),
        datetime: datetime,
        place: place
    });
    favorites.add(fav);
    fav.save();
};

window.removeFavorite = function(sessionId) {
    var favorites = getAllFavorites();
    favorites.each(function(fav) {
        if (fav.getSessionId() === parseInt(sessionId)) {
            fav.destroy();
        }
    });
};

window.getAllFavoriteOfTheDay = function() {
    var results = new Favorites();

    favorites.each(function(fav) {
        var d = splitDate(fav.getDatetime());
        var datetime = new Date(d.year, d.month, d.day, d.hours, d.minutes, d.seconds);
        if (datetime.getFullYear() === today.getFullYear()
                && datetime.getMonth() === today.getMonth()
                && datetime.getDate() === today.getDate()) {
            results.add(fav);
        }
    });

    return results;
};



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