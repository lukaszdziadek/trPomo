

var firstRssDownload = true;
var firstFeedTitle;
var newFeedTitle;

setInterval(function () {

    var url = "http://rss.cnn.com/rss/edition_world.rss";

    $.getJSON(document.location.protocol + "//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=" + encodeURIComponent(url))
        .success(function (data) {
            //alert("udalo sie  " + data.responseData.feed.entries[1].title);


            if (firstRssDownload) {
                $.each(data.responseData.feed.entries, function (index, item) {
                    $("body").append("...." + item.title);
                    $("body").append("</br>");
                });
                $("body").append("</br>");
                firstFeedTitle = data.responseData.feed.entries[0].title;
                console.log(firstFeedTitle);
                firstRssDownload = false;
            } else {
                newFeedTitle = data.responseData.feed.entries[0].title;

                if (firstFeedTitle != newFeedTitle) {
                    $("body").append("----- pojawil sie nowy news ----- </br>");
                    $("body").append(newFeedTitle);
                    firstFeedTitle = newFeedTitle;
                }
            }
          
            //console.log(rssFeeds[0].publishedDate);


        })
        .fail(function () {
            alert("no to mamy problem, nie nawiazalem polaczenia");
        });

},6000);