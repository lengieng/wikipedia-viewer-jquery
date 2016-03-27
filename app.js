$(document).ready(function() {
    var result = '';
    
    $("#search-box").focus(function() {
        if ($(window).width() >= 480) {
            $("#search-box").css({"width":"400px",
                                  "animation-duration":"0.5s",
                                  "animation-name":"expand"});
        }
    });
    
    $("#search-box").blur(function() {
        if ($("#search-box").val() == '') {
            if ($(window).width() >= 480) {
                $("#search-box").css({"width":"300px",
                                      "animation-duration":"0.5s",
                                      "animation-name":"shrink"});
            }
        }
    });

    // Clear button click event
    $("#clear-btn").click(function() {
        $("#search-box").val("").focus();
        $("#result").html("");
        
        // Center everything
        $("#main").css({"top":"50%",
                        "position":"relative",
                        "-webkit-transform":"translateY(-50%)",
                        "-moz-transform":"translateY(-50%)",
                        "-ms-transform":"translateY(-50%)",
                        "transform":"translateY(-50%)"});
    });
    
    // Random button click event
    $("#random-btn").click(function() {
        window.open('http://en.wikipedia.org/wiki/Special:Random');
    });
  
    // Update the result div when ajax is complete
    $(document).ajaxStop(function () {
        $("#main").css({"top":"initial",
                        "position":"initial",
                        "-webkit-transform":"initial",
                        "-moz-transform":"initial",
                        "-ms-transform":"initial",
                        "transform":"initial"
                       });
        $("#result").html(result);
    });
    
    // When user presses ENTER key in the search box
    $("#search-box").keypress(function(event) {
        if (event.which == 13) {
            if ($("#search-box").val() != '') {
                wikiSearch($("#search-box").val());
            }
        }
    });
    
    // Search button click event
    $("#search-btn").click(function() {
        if ($("#search-box").val() != '') {
            wikiSearch($("#search-box").val());
        }
    });
    
    // Function for searching on wikipedia
    function wikiSearch(searchText) {
        result = '';
        var url = 'https://en.wikipedia.org/w/api.php';
        if (searchText != '') {
            // Format: https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&utf8=1&exsentences=1&exlimit=max&exintro=1&explaintext=1&gsrnamespace=0&gsrlimit=10&gsrsearch=SEARCH-TEXT&callback=?
            url += '?action=query&format=json&prop=extracts&generator=search';
            url += '&utf8=1&exsentences=1&exlimit=max&exintro=1&explaintext=1';
            url += '&gsrnamespace=0&gsrlimit=10&gsrsearch=' + searchText;
            url += '&callback=?';
            $.getJSON(url, function(data) {
                $.each(data.query.pages, function(i, item) {
                    result += '<div class="col-xs-12 result-item">';
                    result += '<a target="_blank" href="http://en.wikipedia.org/?curid=';
                    result += item.pageid + '">' + '<h2>' + item.title + '</h2>'
                    result += '<p>' + item.extract + '</p></div></a>';
                });
            }).fail(function(data) {
                console.log(JSON.stringify(data));
            });
        }
    }
});