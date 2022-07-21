import { useState, useEffect } from "react";

const Home = () => {
  const [flash, setFlash] = useState(false);
  
  useEffect(() => {
    if (document.location.search) {
      const query = new URLSearchParams(document.location.search);
      const display_flash = query.get("display_flash");
      if (display_flash === "true") {
        setFlash(true);
        
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }
    }
  }, []);

  return (
    <>
      <section className="container-fluid">
        {flash && <div className='alert alert-success mt-3'>Logged In</div>}
        <h1>Home</h1>
      </section>
    </>
  );
};

export default Home;
