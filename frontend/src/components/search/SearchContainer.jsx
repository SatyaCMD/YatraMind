'use client';
import { useSelector } from 'react-redux';
import FlightSearch from './FlightSearch';
import HotelSearch from './HotelSearch';
import TrainSearch from './TrainSearch';
import BusSearch from './BusSearch';
import CabSearch from './CabSearch';
import InsuranceSearch from './InsuranceSearch';
import ForexSearch from './ForexSearch';
import GenericTabSearch from './GenericTabSearch';

export default function SearchContainer() {
  const activeModule = useSelector((state) => state.ui.activeModule);

  const renderModule = () => {
     switch(activeModule) {
        case 'flights': return <FlightSearch key="flights" />;
        case 'hotels': return <HotelSearch key="hotels" />;
        case 'villas': return <GenericTabSearch key="villas" service="villas" title="Book Premium Villas & Homestays" placeholder="Enter City, Location or Property Name" />;
        case 'packages': return <GenericTabSearch key="packages" service="packages" title="Search Holiday Packages" placeholder="From City or To Destination" />;
        case 'trains': return <TrainSearch key="trains" />;
        case 'buses': return <BusSearch key="buses" />;
        case 'cabs': return <CabSearch key="cabs" />;
        case 'forex': return <ForexSearch key="forex" />;
        case 'insurance': return <InsuranceSearch key="insurance" />;
        default: return <FlightSearch key="default" />;
     }
  };

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-24">
        {renderModule()}
    </div>
  );
}
