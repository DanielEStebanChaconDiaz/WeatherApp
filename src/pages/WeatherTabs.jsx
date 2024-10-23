import React from 'react';

export default function WeatherTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'today', label: 'Today' },
    { id: 'tomorrow', label: 'Tomorrow' },
    { id: 'tenDays', label: '10 days' }
  ];

  return (
    <div className="weather-tabs tabs-container">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}