import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRestaurant } from '../../actions/firebase_actions';
import { Link } from 'react-router';

class RestaurantShow extends Component {

  componentWillMount() {
    this.props.fetchRestaurant(this.props.params.id);
  }

  render() {
    if (!this.props.restaurant) {
      return (
        <div>
          Loading....
        </div>
      );
    }else{
      return (
        <div>
          <h2>Restaurant {this.props.restaurant.title}</h2>
          <div className="row">
            <div className="col-sm-3">
              <div className="list-group">
                <Link className="list-group-item list-group-item-action" to={"/restaurant/"+ this.props.params.id + "/products"}>Products</Link>
                <Link className="list-group-item list-group-item-action" to={"/restaurant/"+ this.props.params.id + "/sections"}>Sections</Link>
              </div>
            </div>
            <div className="col-sm-9">
              {this.props.children}
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state){
  return { restaurant: state.restaurants.restaurant };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchRestaurant }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantShow);
