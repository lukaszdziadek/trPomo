

var firstRssDownload = true;
var firstFeedTitle;
var newFeedTitle;
var newFeedLink;
var newFeedDate;

setInterval(function () {

    var url = "http://biznes.pap.pl/pl/rss/6614?nocache="+ (new Date).getTime();

    $.getJSON(document.location.protocol + "//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=" + encodeURIComponent(url))
        .success(function (data) {
            //alert("udalo sie  " + data.responseData.feed.entries[1].title);
            if (firstRssDownload) {
                createRssList(data);
                firstFeedTitle = data.responseData.feed.entries[0].title;
                console.log(firstFeedTitle);
                firstRssDownload = false;
            } else {
                newFeedTitle = data.responseData.feed.entries[0].title;
                if (firstFeedTitle != newFeedTitle) {
                    alert("nowy feed");
                    if (checkNewTitle(data, newFeedTitle)) {
                        newFeedLink = data.responseData.feed.entries[0].link;
                        newFeedTitle = data.responseData.feed.entries[0].publishedDate;
                        $("#rssList").append("<a href='" + newFeedLink + " 'class='list-group-item' target='_blank'>"
                            + "<span class='label label-danger'>" + item.publishedDate + "</span>"
                            + "<span class='group-item-text info-title'>" + newFeedTitle + "</span>"
                            + "</a>");
                    }
                    firstFeedTitle = newFeedTitle;
                }
            }      
        })
        .fail(function () {
            alert("no to mamy problem, nie nawiazalem polaczenia");
        });

}, 5000);


function createRssList(data) {
    $.each(data.responseData.feed.entries, function (index, item) {
        $("#rssList").append("<a href='" + item.link + " 'class='list-group-item' target='blank'>"
            + "<span class='label label-danger'>" + item.publishedDate + "</span>"
            + "<span class='group-item-text info-title'>" + item.title + "</span>"
            + "</a>");
    });

};

function checkNewTitle(data, newFeedTitle) {
    alert(newFeedTitle);
    if (newFeedTitle.toLowerCase().indexOf("a") >= 0) {
        alert("wiadomosc zawiera szukany klucz a");
        return true;
    }
    return false;
};

