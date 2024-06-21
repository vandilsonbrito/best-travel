'use client'
import Image from "next/image";
import "./style.css"
import { useEffect, useState } from "react";

function Suggestions() {

    const [imgNumber, setImgNumber] = useState(1);

    const previousPicture = () => {
        setImgNumber(imgNumber - 1);
        if (imgNumber === 1) return setImgNumber(6);
    
    }
    const nextPicture = () => {
        setImgNumber(imgNumber + 1);
        if (imgNumber > 5) return setImgNumber(1)
    }


    useEffect(() => {
        const showImg = () => {
            const imgsCollection = document.getElementsByClassName('principal-imgs');
            const imgs = Array.from(imgsCollection);
            imgs.map((item) => {
                item.classList.add('hidden');
            })
            imgs[imgNumber - 1 ]?.classList.remove('hidden');
        
            const thumbnails = document.getElementsByClassName('thumbnails');
            const imgsThumbnails = Array.from(thumbnails);
            imgsThumbnails.map((item) => {
                item.classList.add('opacity-40');
            })
            imgsThumbnails[imgNumber - 1 ]?.classList.remove('opacity-40');
            imgsThumbnails[imgNumber - 1 ]?.classList.add('opacity-100');
        }
        showImg()
    }, [imgNumber])

    return (
        <section className="w-full h-full ">
            <div className="row w-full h-full flex flex-col justify-center items-center bg-primary px5 md:px-20 pt-14 pb-20 ">
                
            <h2 className="text-lg lg:text-[1.5rem] text-white  lg:font-semibold mb-8 text-center tracking-wide">Favorite Destinations</h2>
                <div className="w-[300px] h-[230px] md:w-[500px] md:h-[350px] lg:w-[700px] lg:h-[440px] overflow-hidden relative">
                    <div className="w-full h-full principal-imgs" 
                    >
                        <Image
                        src='/img1.jpg'
                        width={700}
                        height={0}
                        alt=""
                        quality={100}
                        ></Image>
                        <span className="absolute bottom-0 w-full p-2 bg-secundary text-center flex flex-col self-end text-white text-[.7rem] lg:text-base lg:font-semibold">Cinque Terre, Italy</span>
                    </div>
                    <div
                        className="w-full h-full principal-imgs"
                        onClick={() => {
                        
                        }}
                    >
                        <Image  
                        src='/img2.jpg' 
                        width={700}
                        height={70}
                        alt=""
                        quality={100} />
                        <span className="absolute bottom-0 w-full p-2 bg-secundary text-center flex flex-col self-end text-white text-[.7rem] lg:text-base lg:font-semibold">Rio de Janeiro, Brazil</span>
                    </div>
                    <div
                        className="w-full h-full principal-imgs"
                        onClick={() => {
                            
                        }}
                    >
                        <Image  
                        src='/img3.jpg' 
                        width={700}
                        height={70}
                        alt=""
                        quality={100} />
                        <span className="absolute bottom-0 w-full p-2 bg-secundary text-center flex flex-col self-end text-white text-[.7rem] lg:text-base lg:font-semibold">Arraial do Cabo, Rio de Janeiro, Bazil</span>
                    </div>
                    <div
                        className="w-full h-full principal-imgs"
                        onClick={() => {
                        
                        }}
                    >
                        <Image  
                        src='/img4.jpg' 
                        width={700}
                        height={70}
                        alt=""
                        quality={100} 
                        />
                        <span className="absolute bottom-0 w-full p-2 bg-secundary text-center flex flex-col self-end text-white text-[.7rem] lg:text-base lg:font-semibold">Cappadocia, Turkey</span>
                    </div>
                    <div
                        className="w-full h-full principal-imgs"
                        onClick={() => {
                        
                        }}
                    >
                        <Image  
                        src='/img5.jpg' 
                        width={700}
                        height={70}
                        alt=""
                        quality={100} 
                        />
                        <span className="absolute bottom-0 w-full p-2 bg-secundary text-center flex flex-col self-end text-white text-[.7rem] lg:text-base lg:font-semibold">Phi Phi Islands, Thailand</span>
                    </div>
                    <div
                        className="w-full h-full principal-imgs"
                        onClick={() => {
                        
                        }}
                    >
                        <Image  
                        src='/img6.jpg' 
                        width={700}
                        height={70}
                        alt=""
                        quality={100} 
                        />
                        <span className="absolute bottom-0 w-full p-2 bg-secundary text-center flex flex-col self-end text-white text-[.7rem] lg:text-base lg:font-semibold">Furka Pass, Obergoms, Switzerland</span>
                    </div>

                    <a className="prev" onClick={previousPicture}>❮</a>
                    <a className="next" onClick={nextPicture}>❯</a>
                </div>
                

                <div className="w-[300px] md:w-[500px] lg:w-[700px] h-fit flex justify-center items-center ">
                    <div className="w-full h-[60px] flex">
                        <div
                            className="thumbnails"
                        >
                            <Image
                            src='/img1.jpg'
                            width={150}
                            height={70}
                            onClick={() => setImgNumber(1)}
                            className="aspect-video hover-shadow cursor-pointer"
                            alt="Image Itália"
                            />
                        </div>
                        <div className="thumbnails">
                            <Image
                            src='/img2.jpg'
                            width={150}
                            height={70}
                            onClick={() => setImgNumber(2)}
                            className="aspect-video hover-shadow cursor-pointer"
                            alt="Image of Rio de Janeiro"
                            />
                        </div>
                        <div className="thumbnails">
                            <Image
                            src='/img3.jpg'
                            width={150}
                            height={70}
                            onClick={() => setImgNumber(3)}
                            className="aspect-video hover-shadow cursor-pointer"
                            alt="Image Arraial do Cabo, Brazil"
                            />
                        </div>
                        <div className=" thumbnails">
                            <Image
                            src='/img4.jpg'
                            width={150}
                            height={70}
                            onClick={() => setImgNumber(4)}
                            className="aspect-video hover-shadow cursor-pointer"
                            alt="Image of Rio de Janeiro"
                            />
                        </div>
                        <div className=" thumbnails">
                            <Image
                            src='/img5.jpg'
                            width={150}
                            height={70}
                            onClick={() => setImgNumber(5)}
                            className="aspect-video hover-shadow cursor-pointer"
                            alt="Image of Rio de Janeiro"
                            />
                        </div>
                        <div className=" thumbnails">
                            <Image
                            src='/img6.jpg'
                            width={150}
                            height={70}
                            onClick={() => setImgNumber(6)}
                            className="aspect-video hover-shadow cursor-pointer"
                            alt="Image of Rio de Janeiro"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Suggestions
