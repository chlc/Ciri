var keys = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

var fs = require('fs');

var getTweets = function(){

 
var client = new Twitter(keys.twitterKeys);
 
var params = {screen_name: 'nwankps'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    //console.log(tweets);
    for (var i=0; i<tweets.length - 1; i++) {
    	console.log(tweets[i].created_at);
    	console.log(' ');
    	console.log(tweets[i].text);
    }
  }
});

}


var spotify = new Spotify({
  id: 'a8bbe79b7c1c402c9a22d770d54ff9df',
  secret: '911cbcfaeb814f51876b2038f777072c'
});


var getSpotify = function(songname){

songname = process.argv[3];

var getArtistNames = function(artist){
	return artist.name;
}

spotify.search({ type: 'track', query: songname, limit: 10}, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    var songs = data.tracks.items;
    for(var i=0; i<songs.length; i++){
    	console.log(i);
    	console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
    	console.log('song name: ' + songs[i].name);
    	console.log('preview song: ' + songs[i].preview_url);
    	console.log('album: ' + songs[i].album.name);
    	console.log('------------------------------------------');
    }
});

}

var getMovie = function(moviename){

moviename = process.argv[3];

request('http://www.omdbapi.com/?apikey=40e9cece&t='+ moviename +'&y=&plot=short&r=json', function (error, response, body) {
 if (!error && response.statusCode === 200){
 	
 	var jsonData = JSON.parse(body);
 	console.log('Title: ' + jsonData.Title);
 	console.log('Year: ' + jsonData.Year);
 	console.log('Rated: ' + jsonData.Rated);
 	console.log('IMDB Rating: ' + jsonData.imdbRating);
 	console.log('Country: ' + jsonData.Country);
 	console.log('Language: ' + jsonData.Language);
 	console.log('Plot: ' + jsonData.Plot);
 	console.log('Actors: ' + jsonData.Actors);
 	console.log('Rotten Tomatoes: ' + jsonData.tomatoRating);
 	console.log('RT URL: ' + jsonData.tomatoURL);
 }
});

}
var doThat = function(){
fs.readFile('random.txt', 'utf8', function(err, data) {
	if(err) throw err;
	
	var dataArr = data.split(',');

	if(dataArr.length == 2){
		pick(dataArr[0], dataArr[1]);
	} else if (dataArr.length ==1){
		pick(dataArr[0]);
	}
});
}

var pick = function(caseData, functionData){
	switch(caseData){
		case 'tweets':
			getTweets();
			break;
		case 'spotifyjam':
			getSpotify(functionData);
			break;
		case 'movie':
			getMovie();
			break;
		case 'do':
			doThat();
			break;
			default:
			console.log('Ciri cannot help you.');
	}
}

var runThis = function(a1, a2){
	pick(a1, a2);
};

runThis(process.argv[2], process.argv[3]);