app.directive("pages", function () {

  return {
    restrict: "E",
    template: `
			<uib-pagination
				total-items="totalItems"
				items-per-page="perPage"
				max-size="maxPages"
				ng-model="currentPage"
				ng-change="changePage(currentPage)"
				boundary-link-numbers="true"
				force-ellipses="true"
				class="pagination-md">
			</uib-pagination>
    `,
    controller: function ($scope, $state, MovieLists) {

      var perPage = $scope.perPage = 12;
	    $scope.maxPages = 5;

      MovieLists.now_playing
      .then(movies => {
        $scope.totalPages = Math.ceil(movies.length / perPage);
		    $scope.totalItems = movies.length;
        $scope.currentPage = MovieLists.currentPage;
      });

      $scope.changePage = function (page) {
        $state.go("home", {page});
      };

    }
  };

});
