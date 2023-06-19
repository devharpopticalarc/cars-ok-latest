import { CommonUtilities } from "../utils/common.utils";

export default function CarDetailsModal({ modalClose, car }: any) {
  function disableModalClose(event: any) {
    event.stopPropagation()
  }

  function contactDealer() {
    // const carDealService = new CarDealService();
    // carDealService.notifyAdmin({ carId: 'sdfsffsdf', dealerId: 'sdsadasd' });
  }
  return (
    <div onClick={modalClose} style={{ position: 'fixed', display: 'flex', justifyContent: 'center', color: 'black', backgroundColor: 'rgb(50, 50, 50, 0.6)', width: '100%', height: '100%' }}>
      <div onClick={disableModalClose} style={{ backgroundColor: 'white', overflowY: 'scroll', padding: '1em 5em', display: 'flex', flexDirection: 'column' }}>
        <h2>Car Details</h2>
        <div>
          <img className='mb-1' src={car.img} alt="Avatar" style={{ width: '100%', maxWidth: '15em' }} />
          <p><span>Brand:</span> {car.brand || 'Not Available'}</p>
          <p><span>Model:</span> {car.model || 'Not Available'}</p>
          <p><span>Fuel Type:</span> {car.fuelType || 'Not Available'}</p>
          <p><span>Body Type:</span> {car.bodyType || 'Not Available'}</p>
          <p><span>Transmission:</span> {car.transmission || 'Not Available'}</p>
          <p><span>Price:</span> {car.price || 'Not Available'}</p>
          <p><span>Color:</span> {car.color || 'Not Available'}</p>
          <p><span>Year:</span> {car.year || 'Not Available'}</p>
          <p><span>Engine Size:</span> {car.engineSize || 'Not Available'}</p>
          <p><span>Horsepower:</span> {car.horsepower || 'Not Available'}</p>
          <p><span>Seating Capacity:</span> {car.seatingCapacity || 'Not Available'}</p>
          <p><span>Mileage:</span> {car.mileage || 'Not Available'}</p>
          <p><span>Wheel Drive:</span> {car.wheelDrive || 'Not Available'}</p>
        </div>
        <div>
          <p><span>Features:</span></p>
          <ul>
            {
              car.features.map((e: string) => {
                return <li key={CommonUtilities.randomHexString(10)}>{e}</li>
              })
            }
            {/* <li>Air Conditioning</li>
            <li>Power Windows</li>
            <li>Navigation System</li> */}
          </ul>
        </div>
        <div>
          <p><span>Safety Rating:</span> {car.safetyRating || 'Not Available'}</p>
        </div>
        <div className='mb-1'>
          <p><span>VIN:</span> {car.vin || 'Not Available'}</p>
          <p><span>Chassis Number:</span> {car.chassisNumber || 'Not Available'}</p>
        </div>
        <div>
          <button onClick={contactDealer} style={{ marginRight: '0.3em', cursor: 'pointer', backgroundColor: '#1383b3', padding: '0.3em', color: 'white', fontWeight: '700', border: '2px solid #1383b3' }} >Contact Dealer</button>
          <button onClick={modalClose} style={{ cursor: 'pointer', backgroundColor: '#1383b3', padding: '0.3em', color: 'white', fontWeight: '700', border: '2px solid #1383b3' }} >Close</button>
        </div>
      </div>
    </div>
  );
}