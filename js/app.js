window.Instagram = {

    config: {},

    BASE_URL: 'https://api.instagram.com/v1',

    init: function(option) {
        option = option || {};
        this.config.client_id = option.access_token;
    },

    searchTags: function(name, callback) {
        var endpoint = this.BASE_URL + '/tags/search?q=' + name + '&access_token=' + this.config.client_id;
        this.getJSON(endpoint, callback);
    },

    getJSON: function(url, callback) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            success: function( response ) {
                if (typeof callback === 'function') callback(response);
            }
        });
    }
};

Instagram.init ({
    //Replace this access token with your own access token
    access_token: '5452165022.9bc6718.4c07cfbb36934043acadaf07cc7bc75c'
});

$( document ).ready(function() {

    $( '#form' ).on('submit', function( e ) {
        e.preventDefault();

        var tagName = $( '#search' ).val();
        Instagram.searchTags(tagName, function( response ) {
            var $instagram = $( '#instagram' );
                $instagram.html('');

            for ( var i = 0; i < response.data.length; i++ ) {
                tags = response.data[i].name;
                mediaCount = response.data[i].media_count;
                var instagramEndPoint = 'https://www.instagram.com/explore/tags/';
                $instagram.append('<center><br><a href="'+ instagramEndPoint + tags + '" target="_blank">' + '#' + tags + '</a>');
                $instagram.append('<center>' + mediaCount + " posts");
            }

        });

    });

});