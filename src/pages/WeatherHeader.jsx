import React from 'react';

export default function WeatherHeader({ location }) {
  return (
    <div className="header">
      <h2>{location}</h2>
      <img src="/storage/img/search_white.png" alt="" className="search-icon" />
    </div>
  );
}