import {useContext, useCallback, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import StationService from '../services/StationService';
import StationContext from "../context/StationsContext";
import { toast } from "react-toastify";

export function useStations() {
    const navigate = useNavigate();
    const {stations, setStations} = useContext(StationContext);
    const [oneBike, setOneBike] = useState({});

    const getOneStation = useCallback((slug) => {
        StationService.getOneStation(slug)
            .then(({ data }) => {
                    console.log(data);
                    setOneBike(data);
            })
            .catch(e => console.error(e));
    }, []);

    const useAddStation = useCallback(data => {
        StationService.createStation(data)
        .then(({ data, status }) => {
            if (status === 200) {
                toast.success('Station created successfully');
                navigate('/dashboard/stations');
                setStations([...stations, data]);
            }
        })
        .catch(e => console.error(e));
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

    return { stations, setStations, getOneStation, oneBike, setOneBike, useAddStation, useDeleteStation }}