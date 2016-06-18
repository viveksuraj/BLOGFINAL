var { Router, Route, IndexRoute, Link, browserHistory } = ReactRouter

var PlaceContainer = React.createClass({
  render : function(){
    return(
      <div className ="container" id = "main">
      <Navbar/>
      <main>
      {this.props.children}
      </main>
      <Footer />
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
          <a href="#" className="navbar-brand">Blog Manager</a>
            <button className="navbar-toggle" data-toggle="collapse" data-target=".navHeaderCollapse">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            <div className="collapse navbar-collapse navHeaderCollapse">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#/home">Home</a></li>
              <li><a href="#/Aboutus">About me</a></li>
              <li><a href="#/ViewPlaces">View Places</a></li>
              <li><a href="#/Contact">Contact us</a></li>
            </ul>
          </div>
        </div>
      </div>
        );
  }
});

// header component
var Header = React.createClass({
  render : function(){
    return(
      <header className="intro-header">
          <div className="container">
              <div className="row">
                  <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                      <div className="site-heading">
                          <h1>Clean Blog</h1>
                          <hr className="small"/>
                          <span className="subheading">BLOG FOR PLACES</span>
                      </div>
                  </div>
              </div>
          </div>
      </header>
    );
  }
});
var Footer = React.createClass({
  render: function()
  {
    return(
      <footer>
          <div className="container">
              <div className="row">
                  <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                      <ul className="list-inline text-center">
                          <li>
                              <a href="#">
                                  <span className="fa-stack fa-lg">
                                      <i className="fa fa-circle fa-stack-2x"></i>
                                      <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                                  </span>
                              </a>
                          </li>
                          <li>
                              <a href="#">
                                  <span className="fa-stack fa-lg">
                                      <i className="fa fa-circle fa-stack-2x"></i>
                                      <i className="fa fa-facebook fa-stack-1x fa-inverse"></i>
                                  </span>
                              </a>
                          </li>
                          <li>
                              <a href="#">
                                  <span className="fa-stack fa-lg">
                                      <i className="fa fa-circle fa-stack-2x"></i>
                                      <i className="fa fa-github fa-stack-1x fa-inverse"></i>
                                  </span>
                              </a>
                          </li>
                      </ul>
                      <p className="copyright text-muted">Copyright &copy; Your Website 2014</p>
                  </div>
              </div>
          </div>
      </footer>
    );
  }
});


// Home component
var Home = React.createClass({
  render : function(){

    return(
    <div className="container">
    <p>We spoke about how we’d both come to the realization, fairly recently, that though we’ve both traded in lots of self-destructive habits for more nurturing ones, the…</p>
    </div>
    );
  }
});

var Aboutus = React.createClass({
  render : function(){
    return(
      <div className="About-intro-header" >
          <div className="container">
          <p>With its historic landmarks and buildings, long sandy beaches, cultural and art centers and parks, Chennai's tourism offers many interesting locations to visitors. One of the most important tourist attraction of Chennai is actually in the neighbouring town of Mahabalipuram with its ancient temples and rock carvings of the 7th century Pallava kingdom. Chennai is listed in the Lonely planet's top 10 city to travel for the year 2015.</p>
              <div className="row">
                  <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                      <div className="page-heading">
                          <h1>About Me</h1>
                          <hr className="small" />
                          <span className="subheading">This is what I do.</span>
                      </div>
                  </div>
              </div>
          </div>
          </div>
    );
  }
});

var ViewPlaces = React.createClass({
  getInitialState : function(){
    return {data :[]};
  },
  getData : function(){
  $.ajax({
    url: '/api/Places',
    dataType: 'json',
    cache: false,
    type: 'GET',
    success: function(data) {
      this.setState({data: data});
      }.bind(this)
    });
  },
  componentDidMount : function(){
    this.getData();
    setInterval(this.getData, 5000);
  },

  render : function(){
    return(
      <article>
          <div className="container">
              <div className="row">
                  <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                  <div>
                        <Places data = {this.state.data} />
              </div>
              </div>
              </div>
              </div>
              </article>
    );
  }
});
var Places = React.createClass({
    render : function(){
      return (
      <div>
      {
        this.props.data.map(function(Places){
    return (
      <div className ="home">
          <div className="parallax" parallax-speed="2">
          <h1 id="logo" className="text-center">
          </h1>
          </div>
          <main id="main">
           <div className="container">
             <div className="row topspace">
                <div className="col-sm-8 col-sm-offset-2">
                   <article className="post">
                   <header className="entry-header">
                  <h1 className="entry-title">{Places.Title}</h1>
                  </header>
                  <p><img alt="" src={Places.Image}/></p>
                  <p>{Places.Location}</p>
                  </article>
                 </div>
                 </div>
                 </div>

  </main>
  </div>
    );
  }
  )}
  </div>
  );
  }
  });

// Main Route
var browserHistory = ReactRouter.browserHistory;
ReactDOM.render(
(
<Router history = {browserHistory}>
    <Route path="/" component={PlaceContainer}>
      <IndexRoute component = {Home} />
      <Route path="/home" component={Home} />
      <Route path="/ViewPlaces" component={ViewPlaces} />
      <Route path="/Aboutus" component={Aboutus} />
    </Route>
</Router>
),
document.getElementById('content')
);
