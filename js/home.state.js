app.config(function ($stateProvider) {

  $stateProvider.state("home", {
    url: "/:page",
    template: `
			<div id="movies">
        <div id="movie-container">
				<a class="poster" ng-repeat="movie in movies" aria-label="movie.title" ng-click="modalOpen(movie)">
					<img ng-src="{{movie.posterurl}}">
					<md-tooltip md-direction="top" class="popup">
						{{movie.title}}
					</md-tooltip>
				</a>
        </div>
			</div>
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
    controller: "HomeCtrl"
  });
});

