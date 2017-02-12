import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, logoutUser } from '../actions/firebase_actions';

class App extends Component {

    constructor(props) {
        super(props);

        this.props.fetchUser();
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        this.props.logoutUser().then((data) => {
      // reload props from reducer
            this.props.fetchUser();
        });
    }

    renderUserMenu(currentUser) {
    // if current user exists and user id exists than make user navigation
        if (currentUser && currentUser.uid) {
            return (
                <li className="nav-item dropdown">
                    <a
                      href="#" className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="false">
                        {currentUser.email}</a>
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile">Profile</Link>
                        <Link className="dropdown-item" to="/logout" onClick={this.logOut}>Logout</Link>
                    </div>
                </li>
            );
        } else {
            return [
                <li className="nav-item" key={1}><Link className="nav-link" to="/login">Login</Link></li>,
                <li className="nav-item" key={2}><Link className="nav-link" to="/register">Register</Link></li>,
            ];
        }
    }

    render() {
        return (

            <div>
              <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse bg-faded">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="#">Neat</a>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                      <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>

                  </ul>
                  <ul className="navbar-nav">
                  { this.renderUserMenu(this.props.currentUser) }
                  </ul>
                </div>
              </nav>

                <div className="container mt-5">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchUser, logoutUser }, dispatch);
}


function mapStateToProps(state) {
    return { currentUser: state.currentUser };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
