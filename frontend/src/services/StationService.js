import api from "./api"

const StationService = {
    getAllStations() {
        return api().get("/station");
    },
    createStation(data) {
        // console.log(data);
        return api().post("/station", data);
    },
};

export default StationService;