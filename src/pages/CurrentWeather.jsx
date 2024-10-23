import React from 'react';

export default function CurrentWeather({ temperature, feelsLike, condition, dayTemp, nightTemp }) {
  // Obtener la fecha y hora actual
  const now = new Date();
  
  // Formatear la fecha en español
  const dateOptions = {
    month: 'long',
    day: 'numeric'
  };
  
  // Formatear la hora
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  const formattedDate = now.toLocaleDateString('es-ES', dateOptions);
  const formattedTime = now.toLocaleTimeString('es-ES', timeOptions);
  
  // Capitalizar la primera letra del mes
  const capitalizedDate = formattedDate.replace(/^\w|\s\w/g, letra => letra.toUpperCase());
  
  // Combinar fecha y hora
  const dateTimeString = `${capitalizedDate}, ${formattedTime}`;

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
        <h2>{dateTimeString}</h2>
        <div className="day">
          <h2>Day {dayTemp}º</h2>
          <h2>Night {nightTemp}º</h2>
        </div>
      </div>
    </>
  );
}