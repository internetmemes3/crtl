import { Hero, Peplonomic, Footer, Cocainenomics, Based, Logo } from "../components/Home";
import { Navbar } from "@/components";


const Home = () => {
  return (
    <>
    
    <Navbar />

    <main>
    
      <Hero />
      <Logo />
      
      <Peplonomic />
      <Cocainenomics />
      <Based />
    </main>
    </>
  );
}

export default Home;