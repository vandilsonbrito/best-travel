'use client'
import Image from "next/image";
import "./style.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useMedia from 'use-media';

function Suggestions() {

    const isMobile = useMedia({ maxWidth: '719px' })

    const suggestionsPlaces = [
        {
            imgDesktop: '/el-chaten.webp',
            imgMobile: '/el-chaten-mobile.webp',
            description: 'El Chatén, Argentina'
        },
        {
            imgDesktop: '/rio-de-janeiro.webp',
            imgMobile: '/rio-de-janeiro-mobile.webp',
            description: 'Rio de Janeiro, Brasil'
        },
        {
            imgDesktop: '/cinque-terre.webp',
            imgMobile: '/cinque-terre-mobile.webp',
            description: 'Cinque Terre, Italy'
        },
        {
            imgDesktop: '/tulum.webp',
            imgMobile: '/tulum-mobile.webp',
            description: 'Tulum, Mexico'
        },
        {
            imgDesktop: '/thailand.webp',
            imgMobile: '/thailand-mobile.webp',
            description: 'Koh Phi Phi, Thailand'
        },
        {
            imgDesktop: '/switzerland.webp',
            imgMobile: '/switzerland-mobile.webp',
            description: 'Lauterbrunnen, Switzerland'
        },
        {
            imgDesktop: '/pragser-wildsee.webp',
            imgMobile: '/pragser-wildsee-mobile.webp',
            description: 'Pragser Wildsee, Italy'
        },
        {
            imgDesktop: '/capadoccia.webp',
            imgMobile: '/capadoccia-mobile.webp',
            description: 'Capadoccia, Turkey'
        },
        
    ]
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
              breakpoint: 1100,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 580,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };


    return (
        <section className="w-full h-full ">
            <div className="row w-full h-full flex flex-col justify-center items-center bg-primary px-1 md:px-20 pt-14 pb-20 overflow-hidden">
                
                <h2 className="text-lg lg:text-[1.5rem] text-white  lg:font-semibold mb-8 text-center tracking-wide">Favorite Destinations</h2>
                <div className="w-full max-w-[1350px] h-full">
                    <Slider {...settings}>
                    {
                        suggestionsPlaces.map((places, index) => (
                            <div key={index} className="max-w-[450px] px-3">
                                <Image 
                                src={isMobile ? places.imgMobile : places.imgDesktop}
                                alt={places.description}
                                width={650}
                                height={800}
                                className="h-[450px] md:h-[500px] rounded-lg"
                                />
                                <p className="text-white text-center my-2">{places.description}</p>
                            </div>
                        ))
                    }   
                    </Slider>
                </div>
           
                         
            </div>
        </section>
    )
}

export default Suggestions
