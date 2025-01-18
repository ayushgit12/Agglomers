(function() {
    //Add Tracker to global scope (sorry, i know it's bad) but it needs to be ready for usb events
    document.trackLink = function(uri, e, o, t) {
        var async_nav = true;
        if(typeof t != "undefined") {
            if(!(t === null || t === "" || t === "_self" || t === "_parent" || t === "_top")) {
                async_nav = false;
            }
        }
        if(async_nav) {
            e.preventDefault();
            setTimeout(function() {
                window.location.href = uri;
            }, 250);
        }
        try {
            //console.log('Tracker-Tracked: ' + ((uri.indexOf(':') >= 0) ? '/' + uri.replace(/:\/*/, '/') : uri), {transport: 'beacon'});
            ga('send', 'pageview', (uri.indexOf(':') >= 0) ? '/' + uri.replace(/:\/*/, '/') : uri, {transport: 'beacon'});
        }
        catch(err) {} //I refuse to handle this :D

    };

    //GA for links marked with tracking attributes
    $(function() {
        $('body').on('click', 'a:not([data-track="false"])', function (e) {
            var o = $(this);
            var href = o.attr('href');
            var is_ext = false;
            if(/^https?:\/\//i.test(href))
            {
                var url_host = href.match(/^[a-z]+\:\/+(?:.*@)?([a-z-\.]+)/i);
                if(url_host[1] != window.location.hostname)
                {
                    is_ext = true;
                    //console.log("Tracker: Found Full External URL: " + href);
                    document.trackLink(href, e, o, o.prop('target'));
                }
                else
                {
                    //console.log("Tracker: Changing Full Internal URL: " + href);
                    href = href.match(/^[a-z]+\:\/+(?:.*@)?(?:[a-z-\.]+)(.*)/i)[1];
                    //console.log("Tracker: Changed To Internal URL: " + href);
                }
            }

            if(!is_ext)
            {
                if(/\.(?!html\b|htm\b|php\b)([a-z]{2,4})(?:(?:\?|\#).*)?$/i.test(href))
                {
                    //console.log("Tracker: Found File URL: " + href);
                    document.trackLink(href, e, o, o.prop('target'));
                }
                //else {
                //    console.log("Tracker: Ignored Non-file URL: " + href);
                //}
            }
        });
    });
})();