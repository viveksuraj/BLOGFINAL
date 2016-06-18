var { Router, Route, IndexRoute, Link, browserHistory } = ReactRouter

var MovieContainer = React.createClass({
  render : function(){
    return(
      <div className ="container" id = "main">
      <Navbar />
      <main>
      {this.props.children}
      </main>
      </div>
    );
  }
});

// Navigation bar
var Navbar = React.createClass({
  render: function(){
    return(
      <div className="navbar navbar-inverse navbar-static-top">
        <div className="container">
          <a href="#" className="navbar-brand">Movie Manager</a>
            <button className="navbar-toggle" data-toggle="collapse" data-target=".navHeaderCollapse">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            <div className="collapse navbar-collapse navHeaderCollapse">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#/home">Home</a></li>
              <li><a href="#/movies">Movie List</a></li>
              <li><a href="#/add">Add Movie</a></li>
              <li><a href="#/contact">Contact us</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});
// Home component
var Home = React.createClass({
  render : function(){

    return(
<div id="myCarousel" className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
      <li data-target="#myCarousel" data-slide-to="3"></li>
      <li data-target="#myCarousel" data-slide-to="4"></li>
    </ol>
    <div className="carousel-inner" role="listbox">
      <div className="item active">
        <img src="/images/cinderella.jpeg" className="img-responsive" alt="First slide" />
      </div>
      <div className="item">
        <img src="/images/Image2.jpeg" className="img-responsive" alt="Second slide" />
      </div>
      <div className="item">
        <img src="/images/alice.jpeg.jpg" className="img-responsive" alt="Third slide" />
      </div>
      <div className="item">
        <img src="/images/Image4.jpeg" className="img-responsive" alt="Fourth slide" />
      </div>
      <div className="item">
        <img src="/images/Movie.jpeg.jpg" className="img-responsive" alt="Fifth slide" />
      </div>
    </div>
    <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
      <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
      <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
    );
  }
});

// Search movie
var SearchMovie = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  submit : function(event){
  event.preventDefault()
  console.log(this.state.Title);
  var input ={
    Title: this.state.Title
  }
    $.ajax({
    type: 'POST',
    url: 'api/movies',
    data:input,
    success : function(data){
    this.setState({data: data});
    }.bind(this)
  });
  },
  getData : function(){
  $.ajax({
    url: 'api/movies',
    dataType: 'json',
    cache: false,
    type: 'GET',
    success: function(data) {
      this.setState({data: data});
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.getData();
    setInterval(this.getData, 2000);
    },
  MovieTitleChange: function(event) {
    this.setState({Title: event.target.value});
    console.log(this.state);
  },

  render : function(){
    return (
      <div>
      <div className = "well">
      <div className = "container">
      <form onSubmit = {this.submit}>
       <div className="form-group">
         <input type="text" onChange={this.MovieTitleChange} val={this.state.Title} name ="Title" placeholder="Enter movie name .." className="form-control" id="searchForm"/>
       </div>
       <div className="form-group">
       <div className="col-sm-offset-4 col-sm-10">
         <button type="submit" id="save" className="btn btn-success">Search and Save</button>
       </div>
       </div>
       </form>
       </div>
       </div>
       <MovieList data = {this.state.data} />
       </div>
    );
  }
});

// Movie List component
var MovieList = React.createClass({
    render : function(){
       return (
         <div>
         {
           this.props.data.map(function(result){
           return(
             <div className = "row">
             <div className = "jumbotron">
             <div className="col-md-4">
             <img src={result.Poster} alt={result.Title} id="img" />
             </div>
             <div className = "col-md-8">
             <p>Title : {result.Title}</p>
             <p>Description : {result.Plot}</p>
             <p>Director : {result.Director}</p>
             <p>Actors : {result.Actors}</p>
             <DeleteMovie movie_title={result.Title}/>
             </div>
             </div>
             </div>
           );
         }
       )}
         </div>
       );
     }
});

var AddForm =React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  submit : function(event){
  event.preventDefault()
  console.log(this.state.title);
  var input ={
    Title: this.state.title
  }
    $.ajax({
    type: 'POST',
    url: '/api/getMovie',
    data:input,
    dataType: 'json',
    success : function(data){
    this.setState({data: data});
    }.bind(this)
  });
  },
  titleChange: function(event) {
    this.setState({title: event.target.value});
    console.log(this.state);
  },
  render : function(){
    return(
      <div>
      <div className ="jumbotron" id="addMovie">
       <div className="container" >
           <form onSubmit={this.submit}>
             <div className="form-group">
                 <div className="row">
                     <div className="col-xs-8">
                         <label className="control-label">Movie title</label>
                         <input type="text" className="form-control" name="title" onChange={this.titleChange} val={this.state.title}/>
                     </div>
                     <button type="submit" className="btn btn-primary" id="addBtn">Search Movie</button>
                  </div>
            </div>
          </form>
       </div>
     </div>
    <AddMovieList data ={this.state.data} />
      </div>
    );
  }
});


// Add Movie List component

var AddMovieList = React.createClass({
  getInitialState : function(event){
      return {data :[]};
  },
  submit : function(event){
    event.preventDefault()
    console.log("inside submit");
    var data ={
      Title : this.props.data.Title,
      Director : this.props.data.Director,
      Writer : this.props.data.Writer,
      Actors : this.props.data.Actors,
      Released : this.props.data.Released,
      Poster : this.props.data.Poster,
      Plot : this.props.data.Plot
    }
    $.ajax({
    type: 'POST',
    url: '/api/addMovie',
    data:data,
    success : function(data){
    this.setState({data: data});
    }.bind(this)
  });
  },
    render : function(){
       return (
         <div>
             <div className ="jumbotron" id="addMovie">
              <div className="container" >
                  <form onSubmit ={this.submit}>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-4 selectContainer">
                                <label className="control-label">Genre</label>
                                  <input type="text" className="form-control" name="genre" value={this.props.data.Genre}/>
                            </div>

                            <div className="col-xs-4 selectContainer">
                                <label className="control-label">Language</label>
                                  <input type="text" className="form-control" name="language" value={this.props.data.Language}/>
                            </div>

                            <div className="col-xs-4 selectContainer">
                                <label className="control-label">Country</label>
                                  <input type="text" className="form-control" name="country" value={this.props.data.Country}/>
                            </div>
                          </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-4">
                                <label className="control-label">Director</label>
                                <input type="text" className="form-control" name="director" value={this.props.data.Director}/>
                            </div>
                            <div className="col-xs-4">
                                <label className="control-label">Writer</label>
                                <input type="text" className="form-control" name="writer" value ={this.props.data.Writer}/>
                            </div>
                            <div className="col-xs-4">
                                <label className="control-label">Actors</label>
                                <input type="text" className="form-control" name="actor" value={this.props.data.Actors}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-6">
                                <label className="control-label">Released</label>
                                <input type="text" className="form-control" name="released" value={this.props.data.Released}/>
                            </div>
                            <div className="col-xs-6">
                                <label className="control-label">Youtube trailer</label>
                                <input type="text" className="form-control" name="poster" value={this.props.data.Poster}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Plot</label>
                        <textarea className="form-control" name="plot" rows="8" value={this.props.data.Plot}></textarea>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-xs-6">
                          <label className="control-label">Rating</label>
                          <input type="text" className="form-control" name="ratings" value={this.props.data.imdbRating}/>
                       </div>
                       <div className="col-xs-6">
                         <label className="control-label">Awards</label>
                         <input type="text" className="form-control" name="awards" value={this.props.data.Awards}/>
                      </div>
                    </div>
                  </div>
                    <button type="submit" className="btn btn-success pull-right">Save Movie</button>
                  </form>
              </div>
            </div>
             </div>
           );
     }
});

// Contact us component
var ContactUS = React.createClass({
render:function(){
  return(
    <div className="container ContactUs">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="well well-sm">
              <form className="form-horizontal" action="" method="post">
              <fieldset>
                <legend className="text-center">Contact us</legend>
                <div className="form-group">
                  <label className="col-md-3 control-label" for="name">Name</label>
                  <div className="col-md-9">
                    <input id="name" name="name" type="text" placeholder="Your name" className="form-control"/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label" for="email">Your E-mail</label>
                  <div className="col-md-9">
                    <input id="email" name="email" type="text" placeholder="Your email" className="form-control"/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label" for="message">Your message</label>
                  <div className="col-md-9">
                    <textarea className="form-control" id="message" name="message" placeholder="Please enter your message here..." rows="5"></textarea>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-md-12 text-right">
                    <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                  </div>
                </div>
              </fieldset>
              </form>
            </div>
          </div>
        </div>
    </div>
  );
}
});

// Delete component
var DeleteMovie = React.createClass ({
 delete:function(event){
   event.preventDefault()
   var input ={
     Title : this.props.movie_title
   }
// Deleting a movie
  $.ajax ({
    url: "api/movies/"+input.Title,
    type: 'DELETE',
    success : function(data){
    console.log("Success");
    }
  });
 },
render: function (){
  return (
 <form onSubmit={this.delete}>
 <button className="btn btn-danger" type="submit" value={this.props.movie_title} name="movie_title">Delete</button>
 </form>
 );
}
});

// Main Route
var browserHistory = ReactRouter.browserHistory;
ReactDOM.render(
(
<Router history = {browserHistory}>
    <Route path="/" component={MovieContainer}>
      <IndexRoute component = {Home} />
      <Route path="/home" component={Home} />
      <Route path="/movies" component={SearchMovie} />
      <Route path="/add" component={AddForm} />
      <Route path ="/contact" component ={ContactUS} />
    </Route>
</Router>
),
document.getElementById('content')
);
