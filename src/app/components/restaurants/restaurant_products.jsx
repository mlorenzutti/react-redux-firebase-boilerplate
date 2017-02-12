import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRestaurant } from '../../actions/firebase_actions';
import { Link } from 'react-router';

class RestaurantProducts extends Component {



  renderProducts() {
    if (this.props.restaurant.length==0){
      return (
        <li className="list-group-item">Loading...</li>
      );
    }else{
      const FBproducts = this.props.restaurant.menu.items;
      var products = [];
      for (const key of Object.keys(FBproducts)) {
          FBproducts[key].id = key;
          products.push(FBproducts[key]);
      }
      return products.map((product) => {
        return (
            <li className="list-group-item" key={product.id}>
              <Link to={"restaurant/"+ product.id}>
              <strong>{product.name}</strong><br/>
              {product.description}
              </Link>
            </li>
        );
      });
    }
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
          <div className="text-right">
            <Link to={"/restaurant/"+this.props.params.id+"/products/add"}>Add Product</Link>
          </div>
          {this.renderProducts()}
        </div>
      );
    }
  }
}

function mapStateToProps(state){
  return { restaurant: state.restaurants.restaurant };
}


export default connect(mapStateToProps, null )(RestaurantProducts);
