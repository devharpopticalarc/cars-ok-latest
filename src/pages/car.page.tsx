import { useEffect, useState } from "react";
import cars$ from '../assets/cars.json';

export default function CarPage() {
  const defaultCar = {
    "_id": {
      "$oid": "646f5091a2004c2e1dd35eec"
    },
    "brand": "Lamborghini",
    "model": "Aventador",
    "fuelType": "Petrol",
    "bodyType": "Coupe",
    "transmission": "Automatic",
    "price": "1500000",
    "color": "Blue",
    "year": "2019",
    "engineSize": "6.5L",
    "horsepower": "700 hp",
    "seatingCapacity": 2,
    "mileage": "8 km/l",
    "wheelDrive": "All-Wheel Drive",
    "features": [
      "Adaptive Suspension",
      "Carbon Ceramic Brakes",
      "Leather Upholstery",
      "Apple CarPlay",
      "Android Auto"
    ],
    "safetyRating": "4 out of 5",
    "vin": "1234567890",
    "chassisNumber": "ABC123DEF456",
    "img": "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_gw/aventador/2023/02_09_refresh/aven_gate_s_01_m.jpg",
    "location": "Los Angeles"
  };

  const [car, setCar] = useState<any>(defaultCar);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id'); if (!id) return;
    const car = cars$.filter(e => e._id.$oid === id)[0];
    console.log({ car });
    setCar((e: any) => car);
  }, []);
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap items-center justify-center">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 rounded-lg overflow-hidden shadow-lg">
          <img src={car.img} alt={car.brand} className="w-full h-auto" />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Brand: {car.brand}</h2>
            <h2 className="text-xl font-bold mb-2">Model: {car.model}</h2>
            <p className="text-gray-600">Body Type: {car.bodyType}</p>
            <p className="text-gray-600">Year: {car.year}</p>
            <p className="text-gray-600">Color: {car.color}</p>
            <p className="text-gray-600">Price: {car.price}</p>
            <p className="text-gray-600">Location: {car.location}</p>
            <p className="text-gray-600">Mileage: {car.mileage}</p>
            <p className="text-gray-600">Seating Capacity: {car.seatingCapacity}</p>
            <p className="text-gray-600">Fuel Type: {car.fuelType}</p>
            <p className="text-gray-600">Engine Size: {car.engineSize}</p>
            <p className="text-gray-600">Horsepower: {car.horsepower}</p>
            <p className="text-gray-600">Transmission: {car.transmission}</p>
            <p className="text-gray-600">Wheel Drive: {car.wheelDrive}</p>
            <p className="text-gray-600">Safety Rating: {car.safetyRating}</p>
            <p className="text-gray-600">VIN: {car.vin}</p>
            <p className="text-gray-600">Chassis Number: {car.chassisNumber}</p>
            <div className="my-4">
              <h3 className="text-lg font-bold mb-2">Features</h3>
              <ul className="list-disc list-inside">
                {car.features.map((feature: any, index: any) => (
                  <li key={index} className="text-gray-600">{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}