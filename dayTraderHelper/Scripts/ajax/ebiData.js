
var firstFeedDate;
var firstRssDownload = true;
var firstFeedTitle;
var newFeedTitle;
var newFeedLink;
var newFeedDate;
var hotStocks = ["vivid", "11 bit", "a"];
var hasFound;



setInterval(function () {

    var url = "http://biznes.pap.pl/pl/rss/6614?nocache="+ (new Date).getTime();

    $.getJSON(document.location.protocol + "//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=" + encodeURIComponent(url))
        .success(function (data) {
            //alert("udalo sie  " + data.responseData.feed.entries[1].title);
            if (firstRssDownload) {
                addComponentsToPage(data,firstRssDownload);
                firstFeedTitle = data.responseData.feed.entries[0].title;
                console.log(firstFeedTitle);
                firstRssDownload = false;
                $("#alarmSound")[0].play();
            } else {
                newFeedTitle = data.responseData.feed.entries[0].title;
                if (firstFeedTitle != newFeedTitle) {
                    console.log("nowy feed");
                    $("#alarmSound").play();
                    if (checkNewTitlehasHotStocks(data, newFeedTitle)) {
                        addComponentsToPage(data, firstRssDownload);
                    } else {
                        firstFeedTitle = newFeedTitle;
                    }
                }
            }      
        })
        .fail(function () {
            alert("no to mamy problem, nie nawiazalem polaczenia");
        });

}, 5000);

function checkNewTitlehasHotStocks(data, newFeedTitle) {
    $.each(hotStocks, function (index, item) {
        if (newFeedTitle.toLowerCase().indexOf(item) >= 0) {
            return hasFound = true;
        } else {
            hasFound = false;
        }
    });
    console.log(hasFound);
    return hasFound;
};

function formatDate(itemDate) {
    
    itemDate = new Date(itemDate);   
    var monthDay = itemDate.getDate();
    var hours = itemDate.getHours();
    var minutes = itemDate.getMinutes();
    var seconds = itemDate.getSeconds();
    var pubDate = hours + ":" + minutes+" " + seconds +" sekund";
    console.log(pubDate);

    return pubDate;
};

function addComponentsToPage(data, firstRssDownload) {
    if (firstRssDownload) {
        $.each(data.responseData.feed.entries, function (index, item) {
            $("#rssList").append("<a href='" + item.link + " 'class='list-group-item' target='blank'>"
                + "<span class='label label-danger'>" + formatDate(item.publishedDate) + "</span>"
                + "<span class='group-item-text info-title'>" + item.title + "</span>"
                + "</a>");
        });
    } else {
        newFeedLink = data.responseData.feed.entries[0].link;
        newFeedTitle = data.responseData.feed.entries[0].title;
        newFeedDate = formatDate(data.responseData.feed.entries[0].publishedDate);

        $("#rssList").append("<a href='" + newFeedLink + " 'class='list-group-item' target='_blank'>"
         + "<span class='label label-danger'>" + newFeedDate + "</span>"
         + "<span class='group-item-text info-title'>" + newFeedTitle + "</span>"
         + "</a>");
    }
}