import React from 'react';
import { Wind, Droplets, Gauge, Sun } from 'lucide-react';

export default function MetricsGrid() {
  const metrics = [
    { Icon: Wind, value: '12km/h', label: 'Wind speed', trend: '↑ 2 km/h' },
    { Icon: Droplets, value: '24%', label: 'Rain chance', trend: '↑ 10%' },
    { Icon: Gauge, value: '720 hPa', label: 'Pressure', trend: '↓ 32 hpa' },
    { Icon: Sun, value: '2.3', label: 'UV index', trend: '↓ 0.3' }
  ];

  return (
    <div className="metrics-grid">
      {metrics.map(({ Icon, value, label, trend }) => (
        <div key={label} className="detail-card">
          <div className="detail-info">
            <Icon size={20} className="detail-icon" />
            <div>
              <div className="detail-value">{value}</div>
              <div className="detail-label">{label}</div>
            </div>
          </div>
          <div className="detail-trend">{trend}</div>
        </div>
      ))}
    </div>
  );
}