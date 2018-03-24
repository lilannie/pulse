import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <div className='header'>
        <span className="navbar-site"></span>
        <div className='text-box'>
          <h1 className='header-primary'>
            <span className='header-primary-main'>E-Clerks</span>
            <span className='header-primary-sub'>Small Equipment Checkout</span>
          </h1>
        </div>
      </div>
    );
  }
}
