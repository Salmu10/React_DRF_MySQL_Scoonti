import api from "./api"

const StationService = {

    getAllStations() {
        return api().get("/station");
    },

    getOneStation(slug) {
        return api().get(`station/${slug}`);
    },

    createStation(data, slots = 0) {
        return api().post("/station", { 'station': data, 'slot': { 'num_slots': slots } });
    },

    deleteStation(slug) {
        return api().delete(`station/${slug}`);
    },
};

export default StationService;