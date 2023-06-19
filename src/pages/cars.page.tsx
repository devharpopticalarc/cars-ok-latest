import { ChangeEvent, useEffect, useState } from "react";
import { CommonUtilities } from "../utils/common.utils";
import Car from "../components/car.component";
import { CarFilterLabels, CarFilterValues } from "../constants/car-filter.enum";
import DropDownMenu from "../components/DropDownMenu";
import CarDetailsModal from "../components/car-details.modal";
import cars$ from '../assets/cars.json';
import './cars.css';

export default function CarsPage(): JSX.Element {

  const ALL = 'All';
  interface DefaultCarFilterValuesType {
    [CarFilterValues.BRAND]: string,
    [CarFilterValues.MODEL]: string,
    [CarFilterValues.COLOR]: string,
    [CarFilterValues.FUEL_TYPE]: string,
    [CarFilterValues.HORSE_POWER]: string,
    [CarFilterValues.PRICE]: { min: string | number, max: string | number },
    [CarFilterValues.LOCATION]: string,
  }

  const defaultCarFilterValues: DefaultCarFilterValuesType = {
    [CarFilterValues.BRAND]: ALL,
    [CarFilterValues.MODEL]: ALL,
    [CarFilterValues.COLOR]: ALL,
    [CarFilterValues.FUEL_TYPE]: ALL,
    [CarFilterValues.HORSE_POWER]: ALL,
    [CarFilterValues.PRICE]: { min: '', max: '' },
    [CarFilterValues.LOCATION]: ALL,
  }

  const [priceRange, setPriceRange] = useState<{ min: string | number, max: string | number }>({ min: '', max: '' });
  const [visibleCarDetails, setVisibleCarDetails] = useState<boolean>(false);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [cars, setCars] = useState(cars$);
  const [carFilterValues, setCarFilterValues] = useState<DefaultCarFilterValuesType>(defaultCarFilterValues);

  useEffect(() => {
    console.log(cars.map(car => ({ value: car.fuelType, text: car.fuelType })))
  }, []);

  useEffect(() => {
    // Object.keys(carFilterValues).map((key: any) => {
    //   if (carFilterValues[key] !== ALL){
    //     const c = cars$.filter((car: any) => (car[key] === carFilterValues[key]));
    //     console.log(c)
    //   }
    //   else {

    //   }
    // });

    let cars00: any;
    cars00 = cars$.filter((car) => carFilterValues[CarFilterValues.BRAND] !== ALL ? carFilterValues[CarFilterValues.BRAND] === car.brand : true)
    cars00 = cars00.filter((car: any) => carFilterValues[CarFilterValues.MODEL] !== ALL ? carFilterValues[CarFilterValues.MODEL] === car.model : true)
    cars00 = cars00.filter((car: any) => carFilterValues[CarFilterValues.COLOR] !== ALL ? carFilterValues[CarFilterValues.COLOR] === car.color : true)
    cars00 = cars00.filter((car: any) => carFilterValues[CarFilterValues.FUEL_TYPE] !== ALL ? carFilterValues[CarFilterValues.FUEL_TYPE] === car.fuelType : true)
    cars00 = cars00.filter((car: any) => carFilterValues[CarFilterValues.HORSE_POWER] !== ALL ? carFilterValues[CarFilterValues.HORSE_POWER] === car.horsepower : true)
    cars00 = cars00.filter((car: any) => carFilterValues[CarFilterValues.LOCATION] !== ALL ? carFilterValues[CarFilterValues.LOCATION] === car.location : true)

    cars00 = cars00.filter((car: any) => ((priceRange.min !== '') && (priceRange.max !== '')) ? CommonUtilities.isInRange(Number(car.price), Number(priceRange.min), Number(priceRange.max)) : true);

    setCars(cars => cars00);
  }, [carFilterValues, priceRange]);

  function onPriceRangeChange(event: ChangeEvent<HTMLInputElement>, type: string): void {
    const value: string | number = event.target.value.toString() === '' ? '' : Number(event.target.value);
    setPriceRange(e => ({ ...e, [type]: value.toString() }))
  }

  function onDropDownChange(event: ChangeEvent<HTMLSelectElement>, filterLabel: string) {
    const value = event.currentTarget.value;
    const newValues: Record<string, string> = { [filterLabel]: value };

    if (filterLabel === CarFilterValues.BRAND) {
      newValues[CarFilterValues.MODEL] = ALL;
      newValues[CarFilterValues.COLOR] = ALL;
      newValues[CarFilterValues.FUEL_TYPE] = ALL;
      newValues[CarFilterValues.HORSE_POWER] = ALL;
    }

    setCarFilterValues((selectedFilterLabels: any) => {
      return { ...selectedFilterLabels, ...newValues };
    })

  }

  function showCarDetails(id: string) {
    console.log(id);
    setSelectedCarId(e => id);
    setVisibleCarDetails(e => true);
  }

  function modalClose() {
    setVisibleCarDetails(e => false)
  }

  return (
    <>
      {visibleCarDetails && <CarDetailsModal modalClose={modalClose} car={cars.filter(e => e._id.$oid === selectedCarId)[0]} />}
      <div className="flex flex-col lg:flex-row h-[100%]">
        <div className="lg:border-r lg:border-slate-300 lg:h-[100%]">
          <div className="flex flex-wrap justify-around flex-row lg:flex-col p-4">
            <DropDownMenu className="w-full" value={carFilterValues[CarFilterValues.BRAND]} onChange={(event) => onDropDownChange(event, CarFilterValues.BRAND)} menuLabel={CarFilterLabels.BRAND} options={[{ value: ALL, text: ALL }, ...cars$.map(value => value.brand).filter((value, index, self) => self.indexOf(value) === index).map(value => ({ value: value, text: value }))]} />
            <DropDownMenu className="w-full" value={carFilterValues[CarFilterValues.MODEL]} onChange={(event) => onDropDownChange(event, CarFilterValues.MODEL)} menuLabel={CarFilterLabels.MODEL} options={[{ value: ALL, text: ALL }, ...cars.map(value => value.model).filter((value, index, self) => self.indexOf(value) === index).map(value => ({ value: value, text: value }))]} />
            <DropDownMenu className="w-full" value={carFilterValues[CarFilterValues.COLOR]} onChange={(event) => onDropDownChange(event, CarFilterValues.COLOR)} menuLabel={CarFilterLabels.COLOR} options={[{ value: ALL, text: ALL }, ...cars$.map(value => value.color).filter((value, index, self) => self.indexOf(value) === index).map(value => ({ value: value, text: value }))]} />
            <DropDownMenu className="w-full" value={carFilterValues[CarFilterValues.FUEL_TYPE]} onChange={(event) => onDropDownChange(event, CarFilterValues.FUEL_TYPE)} menuLabel={CarFilterLabels.FUEL_TYPE} options={[{ value: ALL, text: ALL }, ...cars$.map(value => value.fuelType).filter((value, index, self) => self.indexOf(value) === index).map(value => ({ value: value, text: value }))]} />
            <DropDownMenu className="w-full" value={carFilterValues[CarFilterValues.HORSE_POWER]} onChange={(event) => onDropDownChange(event, CarFilterValues.HORSE_POWER)} menuLabel={CarFilterLabels.HORSE_POWER} options={[{ value: ALL, text: ALL }, ...cars$.map(value => value.horsepower).filter((value, index, self) => self.indexOf(value) === index).map(value => ({ value: value, text: value }))]} />
            <DropDownMenu className="w-full" value={carFilterValues[CarFilterValues.LOCATION]} onChange={(event) => onDropDownChange(event, CarFilterValues.LOCATION)} menuLabel={CarFilterLabels.LOCATION} options={[{ value: ALL, text: ALL }, ...cars$.map(car => ({ value: car.location, text: car.location }))]} />
            <div className="w-full">
              <label>Price: </label>
              <div className="flex flex-col sm:flex-row">
                <div className="w-full md:w-1/2 sm:pr-[1em] flex mb-[1em]">
                  <input
                    className='w-full border border-black'
                    type="number"
                    value={priceRange.min}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => onPriceRangeChange(event, 'min')}
                    placeholder="Min Price"
                  /></div>
                <div className="w-full md:w-1/2 sm:pl-[1em] flex mb-[1em]"><input
                  className='w-full border border-black'
                  type="number"
                  value={priceRange.max}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => onPriceRangeChange(event, 'max')}
                  placeholder="Max Price"
                /></div></div>
            </div>
          </div>
        </div>

        <div className="w-[100%]">
          <div className="overflow-hidden border border-slate-300 rounded-md p-[0.75em] m-[0.5em]">
            <div className="flex flex-col sm:flex-row borde rounded-md overflow-hidden">
              <div className="flex position-relative" style={{ backgroundColor: 'black' }}>
                <div className="ribbon_3"><span>Featured</span></div>
                <div className="flex items-center justify-center">
                  <img className="w-full sm:w-[8em]" src="https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_gw/aventador/2023/02_09_refresh/aven_gate_s_01_m.jpg" />
                </div>
              </div>
              <div className="ml-0 sm:ml-[2em]" style={{ height: '7em', backgroundColor: 'white', flexGrow: 1 }}>
                <div style={{ fontSize: '1.2em', fontWeight: 600, color: '#555', marginBottom: '0.25em' }}>2019 Lamborghini Aventador</div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div className="me-2" style={{ fontSize: '0.9em' }}><i className="fa fa-calendar" style={{ color: '#5dc302' }} aria-hidden="true"></i><span>2014</span></div>
                  <div className="me-2" style={{ fontSize: '0.9em' }}><i className="fa fa-tachometer" style={{ color: '#5dc302' }}
                    aria-hidden="true"></i> <span>38,000 km</span></div>
                  <div className="me-2" style={{ fontSize: '0.9em' }}><i className="fa fa-map-marker" style={{ color: '#5dc302' }}
                    aria-hidden="true"></i> <span>New York</span></div>
                </div>
                <div className="flex">
                  <div className="pe-2" style={{ borderRight: '1px solid #ddd' }}><span style={{ color: '#555', fontSize: '0.8em' }}>Petrol</span></div>
                  <div className="px-2 me-2" style={{ borderRight: '1px solid #ddd' }}><span style={{ color: '#555', fontSize: '0.8em' }}>1300cc</span></div>
                  <div><span style={{ color: '#555', fontSize: '0.8em' }}>Automatic</span></div>
                </div>
                <div>
                  <div><span style={{ color: '#555', fontSize: '0.8em' }}>Last Updated: 1 day ago</span></div>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col justify-between sm:justify-start">
                <div className="" style={{ fontSize: '1.5em', fontWeight: 700 }}>$456.00</div>
                <div className="px-2 py-1" style={{ fontSize: '0.85em', background: '#5dc302', color: 'white', borderRadius: '5px', textTransform: 'uppercase', fontWeight: '600' }}>View Details<i className="ms-1 fa fa-arrow-circle-right" aria-hidden="true"></i></div>
              </div>
            </div>
          </div>
        </div>

        {/* <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {
            cars.map((e) => {
              return <Car key={CommonUtilities.randomHexString(20)}
                onViewDetailsClick={showCarDetails}
                model={e.model}
                price={e.price}
                id={e._id.$oid}
                img={e.img}
              ></Car>
            })
          }
        </div> */}
      </div>
    </>
  );
}