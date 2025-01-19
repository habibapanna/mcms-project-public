import React from 'react';
import BannerSection from './BannerSection/BannerSection';
import PopularCamps from '../../../components/PopularCamps/PopularCamps';
import FeedbackForm from '../../../components/FeedbackForm/FeedbackForm';
import FeedbackDisplay from '../../../components/FeedbackDisplay/FeedbackDisplay';
import CampFinder from '../../../components/CampFinder/CampFinder';





const Home = () => {
    return (
        <div>
            <BannerSection></BannerSection>
            <PopularCamps></PopularCamps>
            <FeedbackForm></FeedbackForm>
            <FeedbackDisplay></FeedbackDisplay>
            <CampFinder></CampFinder>
            
            
        </div>
    );
};

export default Home;