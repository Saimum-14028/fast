import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import CountUp from 'react-countup';
import { AuthContext } from './AuthProvider';
import React, { useContext } from 'react';
import Loading from './Loading';


const Features = () => {

    const { userCount, bookedCount, deliveredCount, loading} = useContext(AuthContext);

    if (loading) 
        return <Loading></Loading>

    return (
        <div className='w-11/12 mx-auto my-5'>
            
            <h3 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-10">Our Features</h3>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mb-10'>
                <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-clip-border shadow-none bg-base-200 px-2">
                    <div
                        className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden shadow-none rounded-xl bg-clip-border">
                        <HealthAndSafetyIcon></HealthAndSafetyIcon>
                        
                        <div className="flex w-full flex-col gap-0.5">
                            <div className="flex items-center justify-between">
                                <h5
                                className="block text-xl font-semibold">
                                Parcel Safety
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="p-0 mb-6">
                        <p className="block">
                        We prioritize parcel safety, implementing robust security measures throughout our delivery process to ensure the secure handling and timely arrival of your packages, giving you peace of mind.
                        </p>
                    </div>
                </div>  
                <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-clip-border shadow-none bg-base-200 px-2">
                    <div
                        className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden shadow-none rounded-xl bg-clip-border">
                        <ElectricBoltIcon></ElectricBoltIcon>
                        
                        <div className="flex w-full flex-col gap-0.5">
                            <div className="flex items-center justify-between">
                                <h5
                                className="block text-xl font-semibold">
                                Super Fast
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="p-0 mb-6">
                        <p className="block">
                        Experience the pinnacle of efficiency with our super-fast delivery service. We prioritize speed and reliability, ensuring your parcels reach their destination promptly and seamlessly.
                        </p>
                    </div>
                </div>  
                <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-clip-border shadow-none bg-base-200 px-2">
                    <div
                        className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden shadow-none rounded-xl bg-clip-border">
                        <PriceCheckIcon></PriceCheckIcon>
                        
                        <div className="flex w-full flex-col gap-0.5">
                            <div className="flex items-center justify-between">
                                <h5
                                className="block text-xl font-semibold">
                                Low Cost
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="p-0 mb-6">
                        <p className="block">
                        We take pride in offering cost-effective parcel delivery solutions, providing budget-friendly options without compromising on the quality and reliability of our services
                        </p>
                    </div>
                </div>  
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-clip-border shadow-none bg-base-200 px-2">
                    <div className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden shadow-none rounded-xl bg-clip-border">
                        <div className="flex w-full flex-col gap-0.5">
                            <h5 className="block text-xl font-semibold text-center">
                            Number of Parcel Booked: <span className='text-green-500'><CountUp end={bookedCount}></CountUp></span>
                            </h5>
                        </div>
                    </div>
                </div> 
                <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-clip-border shadow-none bg-base-200 px-2">
                    <div className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden shadow-none rounded-xl bg-clip-border">
                        <div className="flex w-full flex-col gap-0.5">
                            <h5 className="block text-xl font-semibold text-center">
                            Number of Parcel Delivered: <span className='text-green-500'><CountUp end={deliveredCount}></CountUp></span>
                            </h5>
                        </div>
                    </div>
                </div> 
                <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-clip-border shadow-none bg-base-200 px-2">
                    <div className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden shadow-none rounded-xl bg-clip-border">
                        <div className="flex w-full flex-col gap-0.5">
                            <h5 className="block text-xl font-semibold text-center">
                            Number of Users: <span className='text-green-500'><CountUp end={userCount}></CountUp></span>
                            </h5>
                        </div>
                    </div>
                </div> 
            </div>     
        </div>
        
    );
};

export default Features;