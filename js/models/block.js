window.Block = Backbone.Model.extend({
    defaults: {
        id: null,
        film_id: null,
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
    getDatetime: function() {
        return this.get('datetime');
    },
    setDatetime: function(value) {
        this.set({datetime: value});
    },
    getPlace: function() {
        return this.get('place');
    },
    setPlace: function(value) {
        this.set({place: value});
    }
});

window.Blocks = Backbone.Collection.extend({
    model: Block,
    sort_key: 'datetime',
    comparator: function(item) {
        return item.get(this.sort_key);
    },
    sortByField: function(fieldName) {
        this.sort_key = fieldName;
        this.sort();
    }
});

window.initBlock = function() {
    var blocks = new Blocks();
    $.ajax({
        type: 'GET',
        url: 'data/fiff_db_v2.xml',
        dataType: 'xml',
        success: function(xml) {
            $(xml).find('table[name="block"]').each(function() {
                var block = new Block({
                    id: $(this).find('column[name="block_id"]').text(),
                    film_id: $(this).find('column[name="film_id"]').text(),
                    datetime: $(this).find('column[name="datetime"]').text(),
                    place: $(this).find('column[name="place"]').text()
                });
                blocks.add(block);
            });
        },
        async: false
    });
    return blocks;
};

window.getAllBlockOfTheDay = function() {
    var resultBlocks = new Blocks();
    blocks.each(function(block) {
        var d = splitDate(block.getDatetime());
        var datetime = new Date(d.year, d.month, d.day, d.hours, d.minutes, d.seconds);
        if (datetime.getFullYear() === today.getFullYear()
                && datetime.getMonth() === today.getMonth()
                && datetime.getDate() === today.getDate()) {
            resultBlocks.add(block);
        }
    });
    return resultBlocks;
};

window.getTheRestOfBlocks = function() {
    var resultBlocks = new Blocks();
    blocks.each(function(block) {
        var d = splitDate(block.getDatetime());
        var datetime = new Date(d.year, d.month, d.day, d.hours, d.minutes, d.seconds);
        if (datetime.getFullYear() === today.getFullYear()
                && datetime.getMonth() === today.getMonth()
                && datetime.getDate() === today.getDate()) {
        resultBlocks.add(block);
        }
    });
    return resultBlocks;
};

window.getDates = function() {
    var dates = new Array();
    $.ajax({
        type: 'GET',
        url: 'data/fiff_db_v2.xml',
        dataType: 'xml',
        success: function(xml) {
            $(xml).find('table[name="block"]').each(function() {
                var d = splitDate($(this).find('column[name="datetime"]').text());
                var dateBlock = new Date(d.year, d.month, d.day, d.hours, d.minutes, d.seconds);
                var same = false;
                $.each(dates, function(key, date) {
                    if (date.getFullYear() === dateBlock.getFullYear()
                            && date.getMonth() === dateBlock.getMonth()
                            && date.getDate() === dateBlock.getDate()) {
                        same = true;
                    }
                });
                if (!same) {
                    dates.push(dateBlock);
                }
            });
        },
        async: false
    });
    var date_sort_asc = function(date1, date2) {
        if (date1 > date2)
            return 1;
        if (date1 < date2)
            return -1;
        return 0;
    };
    dates.sort(date_sort_asc);
    return dates;
};

window.getAllProsOfTheDay = function() {
    var pros = new Blocks();
    var prosOfTheDay = new Blocks();
    var filmPros = new Films();

    films.each(function(film) {
        if (film.getEventPro() === '1') {
            filmPros.add(film);
        }
    });
    
    filmPros.each(function(film){
        blocks.each(function(block){
            if (block.getFilmId() === film.getId()) {
                pros.add(block);
            }
        });
    });
    
    pros.each(function(block){
        var d = splitDate(block.getDatetime());
        var datetime = new Date(d.year, d.month, d.day, d.hours, d.minutes, d.seconds);
        if (datetime.getFullYear() === today.getFullYear()
                && datetime.getMonth() === today.getMonth()
                && datetime.getDay() === today.getDay()) {
            prosOfTheDay.add(block);
        }
    });

    return prosOfTheDay;
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