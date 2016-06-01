app.controller("HomeCtrl", function ($scope, $state, $stateParams, MovieLists, $uibModal, ModalFactory) {
	var page = $scope.currentPage = $stateParams.page || 1;
	var num = $scope.num = 12;
  var allMovies;

	var perPage = $scope.perPage = 12;
	$scope.maxPages = 5;

	MovieLists.now_playing
	.then(movies => {
    allMovies = movies;
    $scope.movies = movies.slice(num * (page - 1), num*page);
		$scope.totalPages = Math.ceil(movies.length / perPage);
		$scope.totalItems = movies.length;
	});
	$scope.changePage = function (page) {
		$state.go("home", {page});
	};
	$scope.modalOpen = ModalFactory.create;
	
});
