'use client'
import Banner from '../../components/banner/Banner';
import Suggestions from '../../components/suggestions/Suggestions';
import Footer from '../../components/footer/Footer';
import { useEffect } from 'react';


export default function Home() {

  useEffect(() => {
    sessionStorage.setItem('isEmailSent', '');
  }, []); 
  
  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-between "> 
      { <Banner/> && <Suggestions/> && <Footer/> ? 
        <>
          <Banner/>
          <Suggestions/>
          <Footer/>
        </>
        :
        <div className="w-full h-full min-h-screen flex flex-col justify-center items-center">
          <span className="loader"></span>
        </div>
      }
        
    </main>
  );
}
