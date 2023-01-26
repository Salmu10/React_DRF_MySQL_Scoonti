import {useContext, useCallback, useEffect, useState} from 'react';
import StationService from '../services/StationService';

export function useStations() {
    const [loading, setLoading] = useState(false);
    const [stations, setStations] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(function () {
        setLoading(true);
        StationService.getAllStations()
        .then( ({data}) => {
            setStations(data);
            setLoading(false);
        })
    }, [])

    const useAddStation = useCallback(data => {
        StationService.createStation(data)
        .then(({ data, status }) => {
            if (status === 200) {
            //     toast.success('Station created');
                setStations([...stations, data]);
                setIsCorrect(true);
                setTimeout(() => { setIsCorrect(false) }, 1000);
            }
        })
        .catch(e => console.error(e));
    }, []);

    const useDeleteStation = (slug) => {
        console.log(slug);
    }


    return { loading, isCorrect, stations, useAddStation, useDeleteStation }
}