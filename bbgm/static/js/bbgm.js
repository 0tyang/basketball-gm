// For AJAX updating pages
function ajax_update(data, url) {
    $('title').text(data['title']);
    $('#league_content').html(data['league_content']);
    if (arguments.length == 2) { // Only if a url is passed
        history.pushState(data, '', url);
    }
}

// Data tables
function bbgm_datatable(table, sort_col, data) {
    table.dataTable( {
        "aaData": data,
        "aaSorting": [[ sort_col, "desc" ]],
        "sPaginationType": "bootstrap",
        "oLanguage": {
            "sLengthMenu": "_MENU_ players per page",
            "sInfo": "Showing _START_ to _END_ of _TOTAL_ players",
            "sInfoEmpty": "Showing 0 to 0 of 0 players",
            "sInfoFiltered": "(filtered from _MAX_ total players)"
        }
    } );
}

function parse_league_url(url) {
    // Returns a list containing the integer league ID (0 if none), the
    // league root URL up to the league ID (empty string if none), and the
    // league page (first URL folder after the ID) (empty string if none).

    var league_id = 0;
    var league_root_url = '';
    var league_page = '';

    split_url = url.split('/', 5);

    // If there's a URL that starts http://domain.com/<int:league_id>,
    // split_url will have length 4 or 5, depending on if there is a page after
    // the league ID.

    if (split_url.length >= 4) {
        league_id = parseInt(split_url[3]);
        league_root_url = split_url.slice(0, 4).join('/');
    }
    if (split_url.length == 5) {
        // Get rid of any trailing #
        league_page = split_url[4].split('#')[0];
    }

    return [league_id, league_root_url, league_page];
}

function highlight_nav(league_page) {
    if (league_page == '') {
        league_page = 'league_dashboard';
    }
    $('#league_sidebar li').removeClass('active');
    $('#nav_' + league_page).addClass('active');
}

$(document).ready(function() {
    var result = parse_league_url(document.URL);
    var league_id = result[0];
    var league_root_url = result[1];
    var league_page = result[2];
    highlight_nav(league_page);

    // Handle league internal URLs
    $(document).on('click', 'a', function(event) {
        linked_url = this.href;

        // Get league root URLs for both the current URL and the linked URL
        var result = parse_league_url(document.URL);
        var league_root_url_1 = result[1];
        var result = parse_league_url(linked_url);
        var league_id_2 = result[0];
        var league_root_url_2 = result[1];
        var league_page_2 = result[2];

        // If they are the same, do AJAX page load
        if (league_id_2 > 0 && league_root_url_1 == league_root_url_2) {
            $.getJSON(linked_url, {'json': 1}, function (data) {
                ajax_update(data, linked_url);
            });

            //Highlight active page in sidebar
            highlight_nav(league_page_2);

            // If we made it this far, cancel normal page load
            return false;
        }
    });

    // Handle league internal forms
    $(document).on('submit', 'form', function(event) {
        form_url = this.action;

        // Get league root URLs for both the current URL and the form URL
        var result = parse_league_url(document.URL);
        var league_root_url_1 = result[1];
        var result = parse_league_url(form_url);
        var league_id_2 = result[0];
        var league_root_url_2 = result[1];
        var league_page_2 = result[2];

        if (league_id_2 > 0 && league_root_url_1 == league_root_url_2) {
            $.ajax({
              type: this.method,
              url: form_url,
              data: $(this).serialize() + '&json=1',
              success: function (data) {
                  ajax_update(data, form_url);
              },
              dataType: 'json'
            });

            //Highlight active page in sidebar
            highlight_nav(league_page_2);

            // If we made it this far, cancel normal page load
            return false;
        }
    });

    window.onpopstate = function(event) {
        ajax_update(event.state);
    };

    // Play menu
    if (league_id > 0) {
        var play_status = $('#play_status');
        var play_phase = $('#play_phase');
        var play_button = $('#play_button');

        var jug = new Juggernaut;

        // Load cached play menu - this only runs once, which is good, but I'm not sure why.
        jug.on('connect', function(){
            $.get(league_root_url + '/push_play_menu');
        });

        // Listen for updates to play menu
        jug.subscribe(league_id + '_status', function(data){
            play_status.html(data);

            // Refresh page, as appropriate
            var refresh_pages = ['standings', 'playoffs', 'schedule', 'free_agents']
            var result = parse_league_url(document.URL);
            var league_page = result[2];
            if (jQuery.inArray(league_page, refresh_pages) > -1) {
                $.getJSON(document.URL, {'json': 1}, function (data) {
                    ajax_update(data);
                });
            }
        });
        jug.subscribe(league_id + '_phase', function(data){
            play_phase.html(data);
        });
        jug.subscribe(league_id + '_button', function(data){
            play_button.html(data);
        });
    }
});
