app.factory("MovieLists", function ($http, $log) {

  // function to create array of movies
  var createMovieList = function (listName) {

		var url = "http://api.themoviedb.org/3/movie/" + listName + "?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=";
		var promises = [];

		var fillList = function (page) {
			return $http.get(url + (page || 1))
			.then(res => res.data);
		};

    // call the get request for page one
		return fillList(1)
		.then(movies => {
			var i = 2;
      // add page 1 to array of promises
			promises.push(movies);
      // add get requests for each page to promises array
			while(i <= movies.total_pages) {
				promises.push(fillList(i));
				i += 1;
			}
      // create a Promise.all so that all get requests finish before moving on
			return Promise.all(promises);
		})
		.then(movies => {
      // create a single array of movies from the various get requests
			return movies.reduce((result, movs) => { 
				result.push(...movs.results);
				return result;
			}, []);
		})
    // filter out movies without posters as they do not interest us for purposes of exercise
		.then(movies => movies.filter(movie => movie.poster_path))
    // create shortcut for the movie poster's url
    // then return array of movies
		.then(movies => {
			movies.forEach(movie => movie.posterurl = "http://image.tmdb.org/t/p/w342" + movie.poster_path);
		 return movies;
		});

  };

  return {
    // create list of movies now_playing
    // createMovieList could later be used for 'latest', 'upcoming' and 'popular'
    now_playing: createMovieList("now_playing"),
    currentPage: 1
  };

});


