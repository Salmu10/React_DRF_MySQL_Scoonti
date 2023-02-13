import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import RentService from "../services/RentService";

export function useRent() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        const path = pathname.split('/')[1];
        if (path === 'dashboard') {
            console.log('hola admin');
        }
    }, []);

    const useDeleteRentMultiple = async (ids) => {
    }
    
    const useRentScooter = (slot) => {
        console.log(slot);
        // RentService.rentScooter(data)
        //     .then((dataThen) => {
        //         if (dataThen.status == 200) {
        //             toast.success("You rent a Bike, thanks you")
        //             setTimeout(() => {
        //                 navigate("/home")
        //                 window.location.reload()
        //             }, 1000);
        //         }
        //     })
        //     .catch(() => {
        //         toast.warning("You can't rent more than 1 scooter")
        //     });
    }

    const useBringBackScooter = (slot) => {
        console.log(slot);
        RentService.getOneRent()
            .then((data) => {
                if (data.status == 200) {
                    slot.scooter_id = data.data.scooter;
                }
            })
            .catch(() => {
                toast.warning("You don't have any bike")
            });
    }

    return { useDeleteRentMultiple, useRentScooter, useBringBackScooter }
}