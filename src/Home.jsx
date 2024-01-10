import About from './About';
import Banner from './Banner';
import Features from './Features';
import NewsLetter from './NewsLetter';
import { Helmet } from 'react-helmet-async';
import TopDeliveryMen from './TopDeliveryMen';

const Home = () => {
    return(
        <div>
          <Helmet>
            <title>Fast | Home</title>
          </Helmet>
          <Banner></Banner>
          <About></About>
          <Features></Features>
          <TopDeliveryMen></TopDeliveryMen>
          <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;