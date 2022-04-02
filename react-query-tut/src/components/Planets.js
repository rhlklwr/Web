import React, { useState } from "react";
import { useQuery } from 'react-query';


import Planet from "./Planet";
const fetchPlanets = async (key) => {
    const res = await fetch(`http://swapi.dev/api/planets/?page=${key.queryKey[1]}`);
    return res.json();
}

const Planets = () => {
    const [page, setPage] = useState(1);
    const { data, status } = useQuery(['planets', page], fetchPlanets, {
        staleTime: 2000,
    });

    return ( 
        <div>
            <h2>Planets</h2>
            <button onClick={() => setPage(1)}>Page 1</button>
            <button onClick={() => setPage(2)}>Page 2</button>
            <button onClick={() => setPage(3)}>Page 3</button>
            {status  === 'loading' && (
                <div>Loading data...</div>
            )}
            {status  === 'error' && (
                <div>error fetching data</div>
            )}
            {status  === 'success' && (
                <div>
                    {data.results.map(planet => <Planet key={planet.name} planet={planet} />)}
                </div>
            )}
        </div>
     );
}
 
export default Planets;