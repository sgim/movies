app.factory("ModalFactory", function ($uibModal) {

  var makeStyle = (movie) => `
		background: url(${movie.posterurl}) no-repeat;
    `;
      //<div class="modalBackground" style="${makeStyle(movie)}"></div>

  var create = function (movie){
    $uibModal.open({
      animation: true,
      template: `
      <div>
        <div class="modalNav">
					<button ng-click="close()"> Back to list </button>
					<button ng-click="next()"> Next </button>
        </div>
				<img class="modalPoster" ng-src=${movie.posterurl}/>
        <div class="modalInfo">
					<h2>${movie.title} (${movie.release_date.match(/\d*/)})</h2>
					<h3>Score: ${movie.vote_average} | Release Date: ${movie.release_date}</h3>
					<p>${movie.overview}</p>
        </div>
			</div>
      `,
      controller: "ModalInstanceCtrl",
      resolve: {
        movie: () => movie
      }
    });
  };
  return {
    create
  }
});

app.controller("ModalInstanceCtrl", function ($scope, $uibModalInstance, MovieLists, ModalFactory, movie) {
  var allMovies;
  MovieLists.now_playing.then(movies => allMovies = movies);
  $scope.close = () => $uibModalInstance.dismiss();
  $scope.next = function () {
    var i = allMovies.findIndex(mov => mov.id === movie.id) + 1;
    $scope.close();
    ModalFactory.create(allMovies[i] || allMovies[0]);
  };
});
