import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRestaurants } from '../actions/firebase_actions';
import { Link } from 'react-router';

class HomeIndex extends Component {

  componentWillMount() {
    this.props.fetchRestaurants();
  }

  renderPosts() {
    if (this.props.restaurants.length==0){
      return (
        <li className="list-group-item">Loading...</li>
      );
    }else{
      var restaurants = [];
      for (const key of Object.keys(this.props.restaurants)) {
          this.props.restaurants[key].id = key;
          restaurants.push(this.props.restaurants[key]);
      }
      return restaurants.map((restaurant) => {
        return (
            <li className="list-group-item" key={restaurant.id}>
              <Link to={"restaurant/"+ restaurant.id}>
              <strong>{restaurant.title}</strong><br/>
              {restaurant.subtitle}
              </Link>
            </li>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <h2>List of restaurants</h2>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { restaurants: state.restaurants.all };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchRestaurants }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeIndex);
