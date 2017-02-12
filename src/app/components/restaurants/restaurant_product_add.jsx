import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { createProduct } from '../../actions/firebase_actions';


class RestaurantProductAdd extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
      super(props);
      this.state = {
          message: '',
      };
  }

  onSubmit(props) {
    this.props.createProduct(props,this.props.params.id).then((data) => {
      if (data.payload.errorCode)
        this.setState({ message: data.payload.errorMessage });
      else
      this.setState({ message: 'Product was saved!' });
    });
  }


  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a new Product</h3>
        <p>
            {this.state.message}
        </p>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <Field className="form-control" component="input" type="text" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <Field className="form-control" component="input" type="text" name="description" />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <Field className="form-control" component="input" name="price" />
        </div>
        <button className="btn btn-success btn-block" type="submit">Submit</button>
      </form>
    )
  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createProduct }, dispatch);
}

// Decorate the form component
RestaurantProductAdd = reduxForm({
  form: 'newProduct' // a unique name for this form
})(RestaurantProductAdd);

RestaurantProductAdd = connect(null, mapDispatchToProps)(RestaurantProductAdd);

export default RestaurantProductAdd;
