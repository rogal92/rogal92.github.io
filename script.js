$(document).ready(function() {

  var apiRoot = 'http://moviesapplication.us-east-2.elasticbeanstalk.com/v1/movie';
  var datatableRowTemplate = $('[data-datatable-row-template]').children()[0];
  var moviesContainer = $('[data-movies-container]');

  // init
  getMovies();

  function createElement(data) {
    var element = $(datatableRowTemplate).clone();

    element.attr('data-movie-id', data.id);
    element.find('[data-movie-title-section] [data-movie-title-paragraph]').text(data.title);
    element.find('[data-movie-title-section] [data-movie-title-input]').val(data.title);

    element.find('[data-movie-author-section] [data-movie-author-paragraph]').text(data.author);
    element.find('[data-movie-author-section] [data-movie-author-input]').val(data.author);
      
    element.find('[data-movie-genre-section] [data-movie-genre-paragraph]').text(data.genre);
    element.find('[data-movie-genre-section] [data-movie-genre-input]').val(data.genre);
      
    element.find('[data-movie-production-section] [data-movie-production-paragraph]').text(data.production);
    element.find('[data-movie-production-section] [data-movie-production-input]').val(data.production);

    return element;
  }

  function handleDatatableRender(data) {
    moviesContainer.empty();
    data.forEach(function(movie) {
      createElement(movie).appendTo(moviesContainer);
    });
  }

  function getMovies() {
    var requestUrl = apiRoot + 'getMovies';

    $.ajax({
      url: requestUrl,
      method: 'GET',
      success: handleDatatableRender
    });
  }

  function handleMovieDeleteRequest() {
    var parentEl = $(this).parent().parent();
    var movieId = parentEl.attr('data-movie-id');
    var requestUrl = apiRoot + 'deleteMovie';

    $.ajax({
      url: requestUrl + '/?' + $.param({
        movieId: id
      }),
      method: 'DELETE',
      success: function() {
        parentEl.slideUp(400, function() { parentEl.remove(); });
      }
    })
  }

  function handleMovieSubmitRequest(event) {
    event.preventDefault();

    var movieTitle = $(this).find('[name="title"]').val();
    var movieAuthor = $(this).find('[name="author"]').val();
    var movieGenre = $(this).find('[name="genre"]').val();
    var movieProduction = $(this).find('[name="production"]').val();    

    var requestUrl = apiRoot + 'createMovie';

    $.ajax({
      url: requestUrl,
      method: 'POST',
      processData: false,
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      data: JSON.stringify({
        title: movieTitle,
        author: movieAuthor,
        genre: movieGenre,
        production: movieProduction
      }),
      complete: function(data) {
        if(data.status === 200) {
          getMovies();
        }
      }
    });
  }

    //edycja
//  function toggleEditingState() {
//    var parentEl = $(this).parent().parent();
//    parentEl.toggleClass('datatable__row--editing');
//
//    var movieTitle = parentEl.find('[data-movie-title-paragraph]').text();
//    var movieAuthor = parentEl.find('[data-movie-author-paragraph]').text();
//    var movieGenre = parentEl.find('[data-movie-genre-paragraph]').text();
//    var movieProduction = parentEl.find('[data-movie-production-paragraph]').text();
//
//    parentEl.find('[data-movie-title-input]').val(movieTitle);
//    parentEl.find('[data-movie-author-input]').val(movieAuthor);
//    parentEl.find('[data-movie-genre-input]').val(movieGenre);
//    parentEl.find('[data-movie-production-input]').val(movieProduction);
//  }
    
    
//    
//    function handleBoardNameSelect(event) {
//    var $changedSelectEl = $(event.target);
//    var selectedBoardId = $changedSelectEl.val();
//    var $listNameSelectEl = $changedSelectEl.siblings('[data-list-name-select]');
//    var preparedListOptions = prepareBoardOrListSelectOptions(availableBoards[selectedBoardId].lists);
//
//    $listNameSelectEl.empty().append(preparedListOptions);
//  }
//
//  function handleCardCreationRequest(event) {
//    var requestUrl = trelloApiRoot + 'createTrelloCard';
//    var $relatedMovieRow = $(event.target).parents('[data-movie-id]');
//    var relatedMovieId = $relatedMovieRow.attr('data-movie-id');
//    var relatedMovie = availableMovies[relatedMovieId];
//    var selectedListId = $relatedMovieRow.find('[data-list-name-select]').val();
//
//    if (!selectedListId) {
//      alert('You have to select a board and a list first!');
//      return;
//    }
//
//    $.ajax({
//      url: requestUrl,
//      method: 'POST',
//      processData: false,
//      contentType: "application/json; charset=utf-8",
//      dataType: 'json',
//      data: JSON.stringify({
//        name: relatedMovie.title,
//        description: relatedMovie.author + relatedMovie.genre + relatedMovie.production,
//        listId: selectedListId
//      }),
//      success: function(data) {
//        console.log('Card created - ' + data.shortUrl);
//        alert('Card created - ' + data.shortUrl);
//      }
//    });
//  }

  $('[data-movie-add-form]').on('submit', handleMovieSubmitRequest);

//  moviesContainer.on('click','[data-movie-edit-button]', toggleEditingState);
//  moviesContainer.on('click','[data-movie-edit-abort-button]', toggleEditingState);
//  moviesContainer.on('click','[data-movie-submit-update-button]', handleMovieUpdateRequest);
  moviesContainer.on('click','[data-movie-delete-button]', handleMovieDeleteRequest);
});
