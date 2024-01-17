import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { AuthContext } from './AuthProvider';
import { useContext } from 'react';
import Loading from './Loading';
import { motion } from "framer-motion"

const Statistics = () => {
    const { target, bookedCount, deliveredCount, loading} = useContext(AuthContext);
    
    if (loading) 
        return <Loading></Loading>

    const [bar,setBar] = useState({
        series: [{
            data: target.map(card => card.count)
          }],
          options: {
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                borderRadius: 4,
                horizontal: true,
              }
            },
            title: {
                text: 'Booking By Date',
                align: 'center'
              },
            dataLabels: {
              enabled: false
            },
            xaxis: {
                categories: target.map(card => card._id)
              ,
              title: {
                text: 'Count'
              }
            },
            yaxis: {
                title: {
                  text: 'Booking Date'
                },
            },
            
          },
        
    })

    const [line, setLine] = useState({
        series: [
            {
              name: "Number of Booked Parcel",
              data: [bookedCount]
            },
            {
              name: "Number of Delivered Parcel",
              data: [deliveredCount]
            }
          ],
          options: {
            chart: {
              height: 350,
              type: 'line',
              dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
              },
              toolbar: {
                show: false
              }
            },
            colors: ['#77B6EA', '#545454'],
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: 'smooth'
            },
            title: {
              text: 'Line Chart',
              align: 'center'
            },
            grid: {
              borderColor: '#e7e7e7',
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            markers: {
              size: 1
            },
            xaxis: {
              categories: [],
              title: {
                text: 'Parcel'
              }
            },
            yaxis: {
              title: {
                text: 'Number'
              },
              min: 0,
              max: (parseInt(bookedCount/5)*5+10)
            },
            legend: {
              position: 'top',
              horizontalAlign: 'right',
              floating: true,
              offsetY: -25,
              offsetX: -5
            }
          },
    })

    console.log(target);

    return (
        <div >
            <motion.div animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                  }}>
                    <h1 className="text-3xl font-bold my-2 text-center">Statistics</h1>
            </motion.div>
            <div className='bg-white my-5'>
                <ReactApexChart options={bar.options} series={bar.series} type="bar" height={350} />
             </div>
            <div className='bg-white'> 
                <ReactApexChart options={line.options} series={line.series} type="line" height={350} />
            </div>
        </div>
    );
};

export default Statistics;