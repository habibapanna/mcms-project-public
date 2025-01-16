import React from 'react';
import BannerSection from './BannerSection/BannerSection';
import PopularCamps from '../../../components/PopularCamps/PopularCamps';
import FeedbackForm from '../../../components/FeedbackForm/FeedbackForm';
import FeedbackDisplay from '../../../components/FeedbackDisplay/FeedbackDisplay';
import UpcomingCamps from '../../../components/UpcomingCamps/UpcomingCamps';


const Home = () => {
    return (
        <div>
            <BannerSection></BannerSection>
            <PopularCamps></PopularCamps>
            <FeedbackForm></FeedbackForm>
            <FeedbackDisplay></FeedbackDisplay>
            <UpcomingCamps></UpcomingCamps>
            
            
        </div>
    );
};

export default Home;