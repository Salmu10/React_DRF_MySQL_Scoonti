import api from "./api"

const ScooterService = {

    getAllScooters() {
        return api().get("/scooter");
    },

    getOneScooter(slug) {
        return api().get(`scooter/${slug}`);
    },

    createScooter(data) {
        return api().post("/scooter", { 'scooter': data });
    },

    deleteScooter(slug) {
        return api().delete(`scooter/${slug}`);
    },
    
};

export default ScooterService;