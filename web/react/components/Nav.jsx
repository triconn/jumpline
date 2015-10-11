import React from 'react';
import '../../styles/components/Nav.css';

export default class Nav extends React.Component {

  render() {
    return (

      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a href="#">
              <img alt="iQueue" src="/static/images/logo.png" />
            </a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <button type="button" className="btn btn-default navbar-btn">
              <span className="greyText">iQueue</span>
            </button>
            <button type="button" className="btn btn-default navbar-btn">
              <span className="greyText">Edit Text Message</span>
            </button>
          </div>
        </div>
      </nav>

    );
  }
}

