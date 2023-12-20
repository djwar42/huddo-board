"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';

type Service = {
  name: string;
  version: string;
};

export default function Page() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('https://boards.api.huddo.com/v')
      .then(response => {
        setServices(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError('Failed to load services.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="flex min-h-screen flex-nowrap flex-col items-center justify-center p-24">
      <div className="w-full items-center justify-center font-mono text-sm">
        <h1 className="text-lg mb-3">Huddo Board</h1>
        <ul>
          {services.map(service => (
            <li key={service.name}>
              {service.name} - {service.version}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
