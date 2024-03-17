import React from 'react';

const Tab = ({ tab, activeTab, handleTabClick }) => (
  <li
    className={`nav-item mx-3 ${activeTab === tab.id ? 'activeTab' : ''}`}
    onClick={() => handleTabClick(tab.id)}
  >
    <a className="nav-link active" aria-current="page" href={tab.path}>
      <img src={tab.icon} alt="" className="image11" />
      {tab.label}
    </a>
  </li>
);

export default Tab;
