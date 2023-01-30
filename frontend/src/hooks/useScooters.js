import {useContext, useCallback, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import ScooterService from '../services/ScooterService';
import ScooterContext from "../context/ScootersContext";
import { toast } from "react-toastify";

export function useScooters() {
    const navigate = useNavigate();
    const {scooters, setScooters} = useContext(ScooterContext);
    const [oneScooter, setOneScooter] = useState({});

    const getOneScooter = useCallback((slug) => {
        console.log(slug);
        ScooterService.getOneScooter(slug)
            .then(({ data }) => {
                    console.log(data);
                    setOneScooter(data);
            })
            .catch(e => console.error(e));
    }, []);

    const useDeleteScooter = (slug) => {
        console.log(slug);
        // ScooterService.deleteScooter(slug)
        // .then(({ data, status }) => {
        //     if (status === 200) {
        //         toast.success(data.data);
        //         setScooters(scooters.filter(scooter => scooter.slug !== slug));
        //     }
        // })
        // .catch(e => console.error(e));
    }

    return { scooters, setScooters, getOneScooter, oneScooter, setOneScooter, useDeleteScooter }}