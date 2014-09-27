window.Film = Backbone.Model.extend({
    defaults: {
        id: null,
        title: null,
        duration: null,
        synopsis: null,
        producer: null,
        category: null,
        img_link: null,
        year: null,
        country: null,
        long_metrage: null,
        short_film: null,
        clip: null,
        fiff_campus: null,
        actors: null,
        trailer_link: null,
        session: null,
        event_pro: null,
        event_public: null,
        competition_category: null
    },
    getId: function() {
        return this.get('id');
    },
    setId: function(value) {
        this.set({id: value});
    },
    getTitle: function() {
        return this.get('title');
    },
    setTitle: function(value) {
        this.set({title: value});
    },
    getDuration: function() {
        return this.get('duration');
    },
    setDuration: function(value) {
        this.set({duration: value});
    },
    getSynopsis: function() {
        return this.get('synopsis');
    },
    setSynopsis: function(value) {
        this.set({synopsis: value});
    },
    getProducer: function() {
        return this.get('producer');
    },
    setProducer: function(value) {
        this.set({producer: value});
    },
    getCategory: function() {
        return this.get('category');
    },
    setCategory: function(value) {
        this.set({category: value});
    },
    getImgLink: function() {
        return this.get('img_link');
    },
    setImgLink: function(value) {
        this.set({img_link: value});
    },
    getYear: function() {
        return this.get('year');
    },
    setYear: function(value) {
        this.set({year: value});
    },
    getCountry: function() {
        return this.get('country');
    },
    setCountry: function(value) {
        this.set({country: value});
    },
    getLongMetrage: function() {
        return this.get('long_metrage');
    },
    setLongMetrage: function(value) {
        this.set({long_metrage: value});
    },
    getShortFilm: function() {
        return this.get('short_film');
    },
    setShortFilm: function(value) {
        this.set({short_film: value});
    },
    getClip: function() {
        return this.get('clip');
    },
    setClip: function(value) {
        this.set({clip: value});
    },
    getFiffCampus: function() {
        return this.get('fiff_campus');
    },
    setFiffCampus: function(value) {
        this.set({fiff_campus: value});
    },
    getActors: function() {
        return this.get('actors');
    },
    setActors: function(value) {
        this.set({actors: value});
    },
    getTrailerLink: function() {
        return this.get('trailer_link');
    },
    setTrailerLink: function(value) {
        this.set({trailer_link: value});
    },
    getSession: function() {
        return this.get('session');
    },
    setSession: function(value) {
        this.set({session: value});
    },
    getEventPro: function() {
        return this.get('event_pro');
    },
    setEventPro: function(value) {
        this.set({event_pro: value});
    },
    getEventPublic: function() {
        return this.get('event_public');
    },
    setEventPublic: function(value) {
        this.set({event_public: value});
    },
    getCompetitionCategory: function() {
        return this.get('competition_category');
    },
    setCompetitionCategory: function(value) {
        this.set({competition_category: value});
    }
});

window.Films = Backbone.Collection.extend({
    model: Film,
    sort_key: 'title',
    comparator: function(item) {
        return item.get(this.sort_key);
    },
    sortByField: function(fieldName) {
        this.sort_key = fieldName;
        this.sort();
    }
});

window.initFilm = function() {
    var resultFilms = new Films();
    $.ajax({
        type: 'GET',
        url: 'data/fiff_db_v2.xml',
        dataType: 'xml',
        success: function(xml) {
            $(xml).find('table[name="film"]').each(function() {
                var film = new Film();
                film.setId($(this).find('column[name="film_id"]').text());
                film.setTitle($(this).find('column[name="title"]').text());
                film.setSynopsis($(this).find('column[name="synopsis"]').text());
                film.setDuration($(this).find('column[name="duration"]').text());
                film.setProducer($(this).find('column[name="producer"]').text());
                film.setCategory($(this).find('column[name="category"]').text());
                film.setImgLink($(this).find('column[name="img_link"]').text());
                film.setYear($(this).find('column[name="year"]').text());
                film.setCountry($(this).find('column[name="country"]').text());
                film.setLongMetrage($(this).find('column[name="long_metrage"]').text());
                film.setShortFilm($(this).find('column[name="short_film"]').text());
                film.setClip($(this).find('column[name="clip"]').text());
                film.setFiffCampus($(this).find('column[name="fiff_campus"]').text());
                film.setActors($(this).find('column[name="actors"]').text());
                film.setTrailerLink($(this).find('column[name="trailer_link"]').text());
                film.setSession($(this).find('column[name="session"]').text());
                film.setEventPro($(this).find('column[name="event_pro"]').text());
                film.setEventPublic($(this).find('column[name="event_public"]').text());
                film.setCompetitionCategory($(this).find('column[name="competition_category"]').text());
                resultFilms.add(film);
            });
        },
        async: false
    });
    return resultFilms;
};

window.getFilmById = function(id) {
    var resultFilm = new Film();
    films.each(function(film){
        if (id.toString() === film.getId()) {
            resultFilm = film;
        }
    });
    return resultFilm;
};

window.getFilmsByBlockId = function(id) {
    var blockSessions = new Sessions();
    sessions.each(function(session){
        if (id.toString() === session.getBlockId()) {
            blockSessions.add(session);
        }
    });
    var sessionFilms = new Films();
    blockSessions.each(function(session){
        var filmSession = getFilmById(session.getFilmId());
        sessionFilms.add(filmSession);
    });    
    return sessionFilms;
};