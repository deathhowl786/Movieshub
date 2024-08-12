$(document).ready(function(){
    // alert("hello");
    $.ajax({
        type: "GET",
        url: "moviesDB.xml",
        dataType: "xml",
        success: function(xml){
            // alert($(xml).find('Movie:first').find('Title').text());
            let movies = [];
            var count = 0;
            // alert(count);
            $(xml).find('Movie').each(function(){
                // var movie_label = "movie-" + (++count);
                // alert(movie_label);
                var title = $(this).find('Title').text();
                const year = $(this).find('Year').text();
                const director = $(this).find('Director').text();
                const genre = $(this).find('Genre').text();
                const rating = $(this).find('Rating').text();
                const image = $(this).find('Image').text();
                movies.push({"title": title, "year": year,"director": director, "genre": genre, "rating": rating, "image": image});
                $('.movie-list').append(`
                    <div class="movie" id="${movies[count]["year"]}-${movies[count]["rating"]}">
                        <img src="${movies[count]["image"]}" alt="${"movie-"+ (count+1)}" />
                        <main>
                            <h1>${movies[count]["title"]}</h1>
                            <span><i class="fa-solid fa-calendar-days"></i> ${movies[count]["year"]}</span>
                            <span><i class="fa-solid fa-clapperboard"></i> ${movies[count]["director"]}</span>
                            <span><i class="fa-solid fa-font-awesome"></i> ${movies[count]["genre"]}</span>
                            <span><i class="fa-solid fa-star"></i> ${movies[count++]["rating"]}</span>
                        </main>

                    </div>
                    `);   
            });
        },
        error: function(){
        $('.movie-list').append('<li>Loading Moivies..</li>');   
        }
    })

    function listSort(sign, target){
        var toSort = $(".movie-list").children();
        toSort = Array.prototype.slice.call(toSort, 0);
        toSort.sort(function(a, b) {
        var aord = +a.id.split('-')[target];
        var bord = +b.id.split('-')[target];
        // two elements never have the same ID hence this is sufficient:
        return (aord > bord) ? 1*sign : -1*sign;
        });
        $(".movie-list").innerHTML = "";
        for(var i = 0, l = toSort.length; i < l; i++) {
        $(".movie-list").append(toSort[i]);
        }
    }

    function search() {
        // Declare variables
        var input, filter, ul, li, a, i, txtValue;
        // input = document.getElementById('myInput');
        filter = $("#search-bar").value.toUpperCase();
        // ul = document.getElementById("myUL");
        movies = $(".movie-list").children();
      
        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < movies.length; i++) {
          a = movies[i].getElementsByTagName("span")[0];
          b = movies[i].getElementsByTagName("span")[1];
          txtValue = (a.textContent || a.innerText) + (b.textContent || b.innerText);
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            movies[i].style.display = "block";
          } else {
            movies[i].style.display = "none";
          }
        }
      }


    $(".movie-list").ready(function(){
        listSort(-1,0);
        listSort(-1,1);
    })

    $("#year-sort").click(function(){
        if($("#year-sort").attr("name") == "asc"){
            listSort(-1, 0);
            $("#year-sort").attr("name", "desc");
            $("#year-sort").children('i').attr("class", "fa-solid fa-arrow-up");
        }
        else{
            listSort(1, 0);
            $("#year-sort").attr("name", "asc");
            $("#year-sort").children('i').attr("class", "fa-solid fa-arrow-down");
        }
    })

    $("#rate-sort").click(function(){
        if($("#rate-sort").attr("name") == "asc"){
            listSort(-1, 1);
            $("#rate-sort").attr("name", "desc");
            $("#rate-sort").children('i').attr("class", "fa-solid fa-arrow-up");
        }
        else{
            listSort(1, 1);
            $("#rate-sort").attr("name", "asc");
            $("#rate-sort").children('i').attr("class", "fa-solid fa-arrow-down");
        }
    })
})

function search() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    // input = document.getElementById('myInput');
    filter = $("#search-bar").val().toUpperCase();
    // ul = document.getElementById("myUL");
    movies = $(".movie-list").children();
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < movies.length; i++) {
      a = movies[i].getElementsByTagName("h1")[0];
      b = movies[i].getElementsByTagName("span")[1];
      c = movies[i].getElementsByTagName("span")[2];
      txtValue = (a.textContent || a.innerText) + (b.textContent || b.innerText) + (c.textContent || c.innerText);
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        movies[i].style.display = "block";
      } else {
        movies[i].style.display = "none";
      }
    }
  }