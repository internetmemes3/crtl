import { Hero, Peplonomic, Footer, Cocainenomics, Arcade, Logo } from "../components/Home";
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
      <Arcade />
    </main>
    </>
  );
}

export default Home;