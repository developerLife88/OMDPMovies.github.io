
$(document).ready(function(){
    
  // $('#c1').css('background', 'rgba(0,0,0,0.8)').css('height', '100%'); 
    
$('#movieForm').on('submit', function(e){
  
   // console.log('form is working');
    
    var movieSearch = $('#movieName').val();
    
    
    console.log(movieSearch);
    
    fetchMovies(movieSearch);
    e.preventDefault();
    $(this)[0].reset();
    $('#s').html(`<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"><i class="fas fa-spinner"></i></span> Loading...`);
   // $('#c1').css('background', 'rgba(0,0,0,0.8)').css('height', 'auto');
   //  $('#mlist').css('height', '100%').css('height', 'auto');
});  /* ---- end of the form ----*/   
    
    

    
    
   
    
    
    
    
    
    
    function fetchMovies(movieSearch){
        
    $.ajax({
      method: 'GET',
        dataType: 'jsonp', /*https://api.jquery.com/jquery.getjson/ dataType JSON jQuery calls jQuery.parseJSON on the response for you However, if you omit the dataType, jQuery trys to do some magic and guesses which data was received */
        url: 'http://www.omdbapi.com/?apikey=80fe09c6&s=' + movieSearch
    }).done(function(response){
        console.log(response);
        
    
        
        if(response.Response == "False"){
            $('.alert').css('display', 'block');
              $('#s').html(`<i class="fas fa-search"></i>`);
            // $('#c1').css('background', 'rgba(0,0,0,0.8)').css('height', '100%');
        }
        else if(response.Response == "True"){
            $('.alert').css('display', 'none');
            $('#s').html(`<i class="fas fa-search"></i>`);
            // $('#c1').css('background', 'rgba(0,0,0,0.8)').css('height', '100%');
        }
       // if(response.Search.length <= 3){
   // $('#c1').css('background', 'rgba(0,0,0,0.8)').css('height', '100%');
      //  }
        
   
        
        
        var moviesArray = response.Search; // where Serach is the name of the array holding the movies
        
        //console.log(moviesArray[0].Year);
        
        
        var placeholder = ' ';
        $.each(moviesArray, function(index, movie){
            
           if(movie.Poster == "N/A"){
            console.log("no image");
        movie.Poster = "img/noposter.jpg";
    }
            
            //placeholder += movie.Title;
            
           // console.log(placeholder);
            
            
            /*-------------assignment ----------*/
            
            var id = movie.imdbID;
     placeholder += `
<a onclick="clickcedMovie('${id}')" ><div class="custome-container" data-toggle="modal" data-target=".m1">
 <img src="${movie.Poster}"  class="poster m-auto pt-1">
  <div class="overlay">
    <div class="text">${movie.Title}
<br><br> Click For Details
</div>

  </div>
</div> </a>
        `;
            
    $('#mlist').html(placeholder);
            
       
     
        });/*----end of each ----*/ 
         
    }); /*----end of done function ----*/  
           
    }
        
});/*-----end of device ready --------*/









     function clickcedMovie(id){
        console.log(id); 
         
         
     $.ajax({
        method: 'GET',
         url: 'http://www.omdbapi.com/?apikey=80fe09c6&i=' + id
     }).done(function(response){
       console.log(response); 
         
         
                if(response.Poster == "N/A"){
            console.log("no image");
        response.Poster = "img/noposter.jpg";
    }
         
         var details = ' ';
         
         details = `
<div class="row">

<img src="${response.Poster}" class="poster2">

<div class="col-lg">

<ul class="list-group list-group-flush py-2 pl-5">
  <li class="list-group-item"><h1>${response.Title}</h1></li>
  <li class="list-group-item"><i class="fab fa-imdb"></i> Rate: &#160; ${response.imdbRating}</li>
  <li class="list-group-item"><i class="fas fa-info-circle"></i> Plot:&#160;${response.Plot}</li>
  <li class="list-group-item"><i class="fas fa-users"></i> Actors: &#160; ${response.Actors}</li>
<li class="list-group-item"><i class="fas fa-user"></i> Director: &#160;${response.Director}</li>
  <li class="list-group-item"><i class="far fa-calendar-alt"></i> Released Date: &#160;${response.Released}</li>
  <li class="list-group-item"><i class="far fa-clock"></i> Run time: &#160;${response.Runtime}</li>
  <li class="list-group-item"><i class="fas fa-film"></i> Genre: &#160;${response.Genre}</li>
  <li class="list-group-item"><i class="fas fa-award"></i> Awards: &#160;${response.Awards}</li>
</ul>
</div>
</div>
            `;
         
         $('#movieDetails').html(details);
     });    
         
            }/*-----end of clickedMovie -----*/


/*  JSONP allows you to specify a callback function that is passed your JSON object. This allows you to bypass the same origin policy and load JSON from an external server into the JavaScript on your webpage.  */