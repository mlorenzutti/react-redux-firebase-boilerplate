import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';

import HomeIndex from './components/index_home';
import UserLogin from './components/user/login';
import UserLogout from './components/user/logout';
import UserRegister from './components/user/register';
import UserProfile from './components/user/profile';
import ResetPassword from './components/user/reset_password';
import RestaurantShow from './components/restaurants/restaurant_show';
import RestaurantProducts from './components/restaurants/restaurant_products';
import RestaurantProductAdd from './components/restaurants/restaurant_product_add';
import RestaurantSections from './components/restaurants/restaurant_sections';
import requireAuth from './utils/authenticated';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomeIndex} />
        <Route path="/restaurant/:id" component={RestaurantShow}>
          <Route path="/restaurant/:id/products" component={RestaurantProducts} />
          <Route path="/restaurant/:id/products/add" component={RestaurantProductAdd} />
          <Route path="/restaurant/:id/sections" component={RestaurantSections} />
        </Route>
        <Route path="/login" component={UserLogin} />
        <Route path="/logout" component={UserLogout} />
        <Route path="/register" component={UserRegister} />
        <Route path="/reset" component={ResetPassword} />
        <Route path="/profile" component={UserProfile} onEnter={requireAuth} />
    </Route>

);
