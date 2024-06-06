import Banner from '@/components/banner/Banner';
import Suggestions from '@/components/suggestions/Suggestions';
import Footer from '@/components/footer/Footer';



export default function Home() {
  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-between ">
        <Banner/>
        <Suggestions/>
        <Footer/>
        
    </main>
  );
}
