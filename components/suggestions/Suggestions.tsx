'use client'
import Image from "next/image";
import "./style.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


function Suggestions() {

    const suggestionsPlaces = [
        {
            img: '/el-chaten.jpg',
            description: 'El Chatén, Argentina'
        },
        {
            img: '/rio-de-janeiro.jpg',
            description: 'Rio de Janeiro, Brasil'
        },
        {
            img: '/cinque-terre.jpg',
            description: 'Cinque Terre, Italy'
        },
        {
            img: '/tulum.jpg',
            description: 'Tulum, Mexico'
        },
        {
            img: '/thailand.jpg',
            description: 'Koh Phi Phi, Thailand'
        },
        {
            img: '/switzerland.jpg',
            description: 'Lauterbrunnen, Switzerland'
        },
        {
            img: '/pragser-wildsee.jpg',
            description: 'Pragser Wildsee, Italy'
        },
        {
            img: '/capadoccia.jpg',
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
                <div className="w-full h-full">
                    <Slider {...settings}>
                    {
                        suggestionsPlaces.map((places, index) => (
                            <div key={index} className="px-3">
                                <Image 
                                src={places.img}
                                alt={places.description}
                                width={400}
                                height={700}
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
