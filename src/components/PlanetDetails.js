function PlanetDetails({ planet }) {
  const [facts, setFacts] = useState([]);

  useEffect(() => {
    if (planet) {
      fetch(`/api/planets/${planet.id}/facts`)
        .then(res => res.json())
        .then(data => setFacts(data));
    }
  }, [planet]);

  return (
    <div className="planet-details-panel">
      <h2>{planet.name}</h2>
      <p>Átmérő: {planet.size} km</p>
      <p>Távolság a Naptól: {planet.distance_from_sun} millió km</p>
      <div className="facts-list">
        {facts.map(fact => (
          <div key={fact.id} className="fact-card">
            {fact.content}
          </div>
        ))}
      </div>
    </div>
  );
} 