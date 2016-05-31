app.controller("HomeCtrl", function ($scope, $stateParams, MovieLists, $uibModal) {
	var page = MovieLists.currentPage = $stateParams.page || 1;
	var num = $scope.num = 12;

	MovieLists.now_playing
	.then(movies => {
    $scope.movies = movies.slice(num * (page - 1), num*page);
	});

  $scope.modalOpen = function (movie) {

    $uibModal.open({
      animation: true,
      template: `
  <div>
    
  </div>
      `,
      controller: "ModalInstanceCtrl"
    });

  };
	
});

app.controller("ModalInstanceCtrl", function ($scope, $uibModalInstance) {

  console.log("modal open!");

});
