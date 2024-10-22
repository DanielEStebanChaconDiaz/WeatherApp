import React from 'react';

export default function CurrentWeather({ temperature, feelsLike, condition }) {
  return (
    <>
      <div className="clima">
        <div className="temperatura">
          <h1>{temperature}º</h1>
          <h3>Feels like {feelsLike}º</h3>
        </div>
        <div className="imagenclima">
          <img src="/storage/img/solecito.svg" alt="" className="climasol" />
          <h2>{condition}</h2>
        </div>
      </div>

      <div className="bottom">
        <h2>January 18, 16:14</h2>
        <div className="day">
          <h2>Day 3º</h2>
          <h2>Night -1º</h2>
        </div>
      </div>
    </>
  );
}