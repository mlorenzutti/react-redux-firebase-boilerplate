import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRestaurant } from '../../actions/firebase_actions';
import { Link } from 'react-router';

class RestaurantSections extends Component {

  renderSections() {
    if (this.props.restaurant.length==0){
      return (
        <li className="list-group-item">Loading...</li>
      );
    }else{
      const FBsections = this.props.restaurant.menu.sections;
      var sections = [];
      for (const key of Object.keys(FBsections)) {
          FBsections[key].id = key;
          sections.push(FBsections[key]);
      }
      return (
          <div>
            {this.renderLoop(sections)}
          </div>
      );
    }
  }

  getMap(startingSections){
    var sections = [];
    for (const key of Object.keys(startingSections)) {
        startingSections[key].id = key;
        sections.push(startingSections[key]);
    }
    return sections;
  }

  renderLoop(sections) {
    console.log(sections.sections);

    return sections.map((section) => {
      const hasChildren = (section.sections != undefined);
      const childSections = hasChildren ? this.getMap(section.sections) : null;
      return (
          <div>
          <li className="list-group-item" key={section.id}>
            <Link to={"restaurant/"+ section.id}>
            <strong>{section.title}</strong><br/>
            {section.subtitle}
            </Link>
          </li>
          {hasChildren ? (
            <div>{this.renderLoop(childSections)}</div>
          ) : (
            <div></div>
          )}
        </div>

      );
    });
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
            <Link to={"/restaurant/"+this.props.params.id+"/sections/add"}>Add Section</Link>
          </div>
          {this.renderSections()}
        </div>
      );
    }
  }
}

function mapStateToProps(state){
  return { restaurant: state.restaurants.restaurant };
}


export default connect(mapStateToProps, null )(RestaurantSections);
