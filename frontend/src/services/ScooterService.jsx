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

    updateScooter(slug, data) {
        return api().put(`scooter/${slug}`, { 'scooter': data });
    },

    deleteScooter(slug) {
        return api().delete(`scooter/${slug}`);
    },
    
};

export default ScooterService;