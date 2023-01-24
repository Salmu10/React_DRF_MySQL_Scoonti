import {useContext, useCallback, useEffect, useState} from 'react';
import StationService from '../services/StationService';

export function useStations() {
    const [loading, setLoading] = useState(false);
    const [stations, setStations] = useState([]);
    // const [isCorrect, setIsCorrect] = useState(false);

    useEffect(function () {
        setLoading(true);
        StationService.getAllStations()
        .then( ({data}) => {
            setStations(data);
            setLoading(false);
        })
    }, [])

    return { stations }
}