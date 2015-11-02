

setInterval(function () {

    var url = "http://www.gpwinfostrefa.pl/GPWIS2/pl/rss/10";

    $.getJSON(document.location.protocol + "//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=" + encodeURIComponent(url))
        .success(function (data) {
            //alert("udalo sie  " + data.responseData.feed.entries[1].title);
            $("body").append("tytul infa : " + data.responseData.feed.entries[1].title);
        })
        .fail(function () {
            alert("no to mamy problem, nie nawiazalem polaczenia");
        });

},3000);