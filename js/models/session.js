window.Session = Backbone.Model.extend({
    defaults: {
        id: null,
        film_id: null,
        block_id: null,
        datetime: null,
        place: null
    },
    getId: function() {
        return this.get('id');
    },
    setId: function(value) {
        this.set({id: value});
    },
    getFilmId: function() {
        return this.get('film_id');
    },
    setFilmId: function(value) {
        this.set({film_id: value});
    },
    getBlockId: function() {
        return this.get('block_id');
    },
    setBlockId: function(value) {
        this.set({block_id: value});
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

window.Sessions = Backbone.Collection.extend({
    model: Session
});

window.initSession = function() {
    var sessions = new Sessions();
    $.ajax({
        type: 'GET',
        url: 'data/fiff_db_v2.xml',
        dataType: 'xml',
        success: function(xml) {
            $(xml).find('table[name="session"]').each(function() {
                var session = new Session({
                    id: $(this).find('column[name="session_id"]').text(),
                    film_id: $(this).find('column[name="film_id"]').text(),
                    block_id: $(this).find('column[name="block_id"]').text(),
                    datetime: $(this).find('column[name="datetime"]').text(),
                    place: $(this).find('column[name="place"]').text()
                });
                sessions.add(session);
            });
        },
        async: false
    });
    return sessions;
};

window.getSessionByFilmId = function(id) {
    var resultSessions = new Sessions();

    sessions.each(function(session) {
        if (id.toString() === session.getFilmId()) {
            console.log(session);
            resultSessions.add(session);
        }
    });

    return resultSessions;
};