import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import Filter from '../Sidebar';
import Tabs from '../Tabs';
import TicketsList from '../TicktetsList';
import Notification from '../Notification';

import logo from './Logo.svg';
import css from './App.module.scss';

function App({ errors }) {
  return (
    <div className={css.container}>
      <img src={logo} alt="planet" />
      <div className={css.layout}>
        <div className={css.sidebar}>
          <Filter />
        </div>
        <div className={css.main}>
          <Tabs />
          {errors >= 15 ? (
            <Notification type="alert">
              При обращении к серверу произошла ошибка.
              <br />
              <br />
              Попробуйте повторить поиск позже.
            </Notification>
          ) : null}
          {errors >= 5 && errors < 15 ? (
            <Notification type="notify">
              Наблюдается легкая турбулентность, не все билеты будут отображены.
              <br />
              <br />
              Попробуйте повторить поиск позже.
            </Notification>
          ) : null}
          {errors < 15 ? <TicketsList /> : null}
        </div>
      </div>
    </div>
  );
}

App.defaultProps = {
  errors: 0,
};
App.propTypes = {
  errors: propTypes.number,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(App);
