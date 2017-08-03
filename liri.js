var keys = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

var spotify = new Spotify({
      id: '5e2fb3a773504f04b39504ed1a755e48',
      secret: '7be512ab4304406c848956957f5be932'
        });

var getMyTweets = function() {
    console.log('getMyTweets')
    var client = new Twitter({
        consumer_key: 'ObmTzZz3eKTtywNyTA2LHtRYH',
        consumer_secret: 'OBHp3nOtHgKfV7ybV6gRSTUoxRA2DDlJsadSMUxYDHqKsvrFM8',
        access_token_key: '60378031-j4aBnFJXsCjgDc0ARvL3odZ8Z7cspdsUDWtEPjjXF',
        access_token_secret: 'HWMNGAlaFLdZ6hL2mZa1udQHyecWE9BuyeqgluoASueNv'
    });
    //var client = new Twitter(keys.twitterKeys);
    //
    var params = {
        screen_name: 'IntergalacticTB'
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log('no_error')
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(' ');
                console.log(tweets[i].text);
            }
        } else {
            console.log(error)
        }
    });

}

var getArtistNames = function(artist) {
    return artist.name;
}

var getMeSpotify = function(songName) {
   
    
        spotify.search({
            type: 'track',
            query: songName
        }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            } 
     
    //   console.log(data);
    // });
    var songs = data.tracks.items;
    for (var i = 0; i<songs.length; i++) {
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].preview_url);
        console.log(data.tracks.items[0].album.name); 
    }
      
     });
     }   


//
getmeMovie = function(movieName) { 

    queryURL = 'http://www.omdbapi.com/?t=' + movieName + '&apikey=40e9cece&tomatoes=true&r=json';
    request(queryURL, function(err, response, body) {
        if (!err && response.statusCode == 200) {
          var jsonData = JSON.parse(body);
  

          console.log('Title: ' + jsonData.Title);
          console.log('Year: ' + jsonData.Year);
          console.log('Rated: ' + jsonData.Rated);
          console.log('Country: ' + jsonData.Country);
          console.log('Language: ' + jsonData.Language);
          console.log('Plot: ' + jsonData.Plot);
          console.log('Actors: ' + jsonData.Actors);
          console.log('Rotten tomatoes ratings: ' + jsonData.tomatoRating);
          console.log('Rotten tomatoes URL: ' + jsonData.tomatoURL);
        }
     });
  }

var pick = function(caseData, functionData) {
    switch (caseData) {
        case 'my-tweets':
            getMyTweets();
            break;
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
        case 'movie-this':
           getmeMovie(functionData);
           break;
        default:
            console.log('LIRI does not know that');

    }
}



var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo)
};

runThis(process.argv[2], process.argv[3]);
 //}



// 'http://www.omdbapi.com/?t=' + movieName + '&tomatoes=true&r=json