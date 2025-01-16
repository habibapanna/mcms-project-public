import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BannerSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-200 via-white to-green-200 py-12 px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
        Success Stories from Our Medical Camps
      </h2>
      <p className="text-center text-base sm:text-lg text-gray-600 mb-8">
        Explore inspiring moments, achievements, and positive impacts of our
        medical camps.
      </p>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="w-full sm:w-11/12 md:w-4/5 lg:w-3/4 mx-auto"
      >
        <SwiperSlide>
          <div
            className="relative h-[250px] sm:h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.postimg.cc/x8T4MwgC/piron-guillaume-k-Jw-Zx-H6jins-unsplash.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-center px-4">
                Successful Surgery Camp - Transforming Lives
              </h3>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="relative h-[250px] sm:h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.postimg.cc/Gm0W9h63/luis-melendez-Pd4l-Rf-Ko16-U-unsplash.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-center px-4">
                Free Health Checkup - Health for All
              </h3>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="relative h-[250px] sm:h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.postimg.cc/BZz99CgK/piron-guillaume-U4-Fy-Cp3-Kz-Y-unsplash.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-center px-4">
                Emergency Medical Relief - Reaching the Needy
              </h3>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="relative h-[250px] sm:h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.postimg.cc/26rm15Zv/louis-reed-pwc-KF7-L4-no-unsplash.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-center px-4">
                Child Vaccination Drive - Ensuring a Healthy Future
              </h3>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerSection;
