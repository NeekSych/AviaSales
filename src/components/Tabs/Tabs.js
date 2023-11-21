import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { setSort } from '../../store/aviasales';

import css from './Tabs.module.scss';

function Tabs({ sort, setSort }) {
  const [tabs, setTabs] = useState([
    { value: 'fast', label: 'Самый быстрый', active: false },
    { value: 'cheap', label: 'Самый дешевый', active: false },
    { value: 'optimal', label: 'Оптимальный', active: false },
  ]);

  useEffect(() => {
    updateTabs(sort);
  }, [sort]);

  const updateTabs = (value) => {
    setTabs((vals) => {
      const newTabsConfig = [];
      for (const t of vals) {
        newTabsConfig.push({ ...t, active: t.value === value });
      }
      return newTabsConfig;
    });
  };

  const tabsComponents = tabs.map((t) => <TabItem onClick={setSort} {...t} key={t.value} />);

  return <div className={cn(css.Tabs, 'borderRadius')}>{tabsComponents}</div>;
}

Tabs.defaultProps = {
  sort: '',
  setSort: () => {},
};
Tabs.propTypes = {
  sort: propTypes.string,
  setSort: propTypes.func,
};

const mapStateToProps = (state) => ({
  sort: state.sort,
});

export default connect(mapStateToProps, { setSort })(Tabs);

function TabItem({ onClick, active, label, value }) {
  return (
    <div
      className={cn(css.tab, { [`${css.active}`]: active })}
      onClick={() => {
        onClick(value);
      }}
    >
      {label}
    </div>
  );
}

TabItem.defaultProps = {
  onClick: () => {},
  active: false,
  label: undefined,
  value: '',
};
TabItem.propTypes = {
  onClick: propTypes.func,
  active: propTypes.bool,
  label: propTypes.string,
  value: propTypes.string,
};
