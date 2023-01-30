import {useContext, useCallback, useEffect, useState} from 'react';
import StationService from '../services/StationService';
import StationContext from "../context/StationsContext";
import { toast } from "react-toastify";

export function useStations() {
    const {stations, setStations} = useContext(StationContext);
    const [oneStation, setOneStation] = useState({});
    const [isCorrect, setIsCorrect] = useState(false);

    const useOneStation = useCallback((slug) => {
        StationService.getOneStation(slug)
            .then(({data}) => {
                setOneStation(data);
            })
            .catch(e => console.error(e));
    }, [oneStation]);

    const useAddStation = useCallback(data => {
        StationService.createStation(data)
        .then(({ data, status }) => {
            if (status === 200) {
                toast.success('Station created successfully');
                setStations([...stations, data]);
                setIsCorrect(true);
                setTimeout(() => { setIsCorrect(false); }, 1000);
            }
        })
        .catch(e => {
            console.error(e);
            toast.error('Create station error');
        });
    }, []);

    const useUpdateStation = useCallback((slug, data) => {
        console.log(slug);
        console.log(data);
        setIsCorrect(true);
        setTimeout(() => { setIsCorrect(false); }, 1000);
    }, []);

    const useDeleteStation = (slug) => {
        StationService.deleteStation(slug)
        .then(({ data, status }) => {
            if (status === 200) {
                toast.success(data.data);
                setStations(stations.filter(station => station.slug !== slug));
            }
        })
        .catch(e => console.error(e));
    }

    return { isCorrect, stations, setStations, useOneStation, oneStation, setOneStation, useAddStation, useUpdateStation, useDeleteStation }}