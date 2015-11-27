
var firstFeedDate;
var firstRssDownload = true;
var firstFeedTitle;
var FeedTitle;
var FeedLink;
var FeedDate;
var hotStocks = ["vivid", "11 bit", "a"];
var hasFound;



setInterval(function () {

    var time = (new Date).getTime();

    var url = "http://biznes.pap.pl/pl/rss/6614?nocache=" + time;


    $.getJSON(document.location.protocol + "//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=" + encodeURIComponent(url))
        .success(function (data) {
            //alert("udalo sie  " + data.responseData.feed.entries[1].title);
            if (firstRssDownload) {
                console.log(firstRssDownload);
                addComponentsToPage(data,true);
                firstFeedTitle = data.responseData.feed.entries[0].title;
                console.log(firstFeedTitle);
                firstRssDownload = false;
                console.log(firstRssDownload);
                $("#alarmSound")[0].play();
            } else {
                newFeedTitle = data.responseData.feed.entries[0].title;
                if (firstFeedTitle != newFeedTitle) {
                    console.log("nowy feed");
                    $("#alarmSound")[0].play();
                    if (checkNewTitlehasHotStocks(data, newFeedTitle)) {
                        addComponentsToPage(data, false);
                        firstFeedTitle = newFeedTitle;
                    } else {
                        firstFeedTitle = newFeedTitle;
                    }
                }
            }      
        })
        .fail(function () {
            alert("no to mamy problem, nie nawiazalem polaczenia");
        });

}, 3000);

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

function addComponentsToPage(data, firstdl) {
    if (firstdl) {
        $.each(data.responseData.feed.entries, function (index, item) {
            $("#rssList").append("<a href='" + item.link + " 'class='list-group-item' target='blank'>"
                + "<span class='label label-danger'>" + formatDate(item.publishedDate) + "</span>"
                + "<span class='group-item-text info-title'>" + item.title + "</span>"
                + "</a>");
        });
    } else {
        FeedLink = data.responseData.feed.entries[0].link;
        FeedTitle = data.responseData.feed.entries[0].title;
        FeedDate = formatDate(data.responseData.feed.entries[0].publishedDate);

        $("#rssList").append("<a href='" + FeedLink + " 'class='list-group-item' target='_blank'>"
         + "<span class='label label-danger'>" + FeedDate + "</span>"
         + "<span class='group-item-text info-title'>" + FeedTitle + "</span>"
         + "</a>");
    }
};