export default function ScooterCard ({ scooter }) {
    // console.log(station);
    return (
        
        <div className="card w-96 bg-base-100">
            <div className="card-body">
                <h2 className="card-title font-bold text-xl">{scooter.name}</h2>
                <p>{scooter.status}</p>
            </div>
        </div>
    )
}