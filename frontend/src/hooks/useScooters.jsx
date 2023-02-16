import {useContext, useCallback, useEffect, useState} from 'react';
import ScooterService from '../services/ScooterService';
import ScooterContext from "../context/ScootersContext";
import { toast } from "react-toastify";

export function useScooters() {
    const {scooters, setScooters} = useContext(ScooterContext);
    const [oneScooter, setOneScooter] = useState({});
    const [isCorrect, setIsCorrect] = useState(false);

    const useOneScooter = useCallback((slug) => {
        ScooterService.getOneScooter(slug)
            .then(({data}) => {
                setOneScooter(data);
            })
            .catch(e => console.error(e));
    }, [oneScooter]);

    const useAddScooter = useCallback(data => {
        ScooterService.createScooter(data)
            .then(({ data, status }) => {
                if (status === 200) {
                    toast.success('Scooter added successfully');
                    setScooters([...scooters, data]);
                    setIsCorrect(true);
                    setTimeout(() => { setIsCorrect(false); }, 1000);
                }
            })
            .catch(e => {
                console.error(e);
                toast.error('Add new scooter error');
            });
    }, []);

    const useUpdateScooter = useCallback((slug, data) => {
        console.log(slug);
        console.log(data);
        setIsCorrect(true);
        setTimeout(() => { setIsCorrect(false); }, 1000);
    }, []);

    const useDeleteScooter = (slug) => {
        ScooterService.deleteScooter(slug)
            .then(({ data, status }) => {
                if (status === 200) {
                    toast.success(data.data);
                    setScooters(scooters.filter(scooter => scooter.slug !== slug));
                }
            })
            .catch(e => console.error(e));
    }

    return { isCorrect, scooters, setScooters, useOneScooter, oneScooter, setOneScooter, useAddScooter, useUpdateScooter, useDeleteScooter }}