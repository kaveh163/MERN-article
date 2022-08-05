import { useState, useEffect } from "react";
import styles from '../home.module.css';
import ListBody from "../ListBody";
const Home = () => {
  const [flash, setFlash] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (document.location.search) {
      const query = new URLSearchParams(document.location.search);
      const display_flash = query.get("display_flash");
      if (display_flash === "true") {
        setFlash(true);
        setTimeout(() => {
          window.location.replace("/");
        }, 3000);

        // setTimeout(() => {
        //   window.location.href = "/";
        // }, 3000);
      }
    }
    console.log("Hello");
    const articles = async () => {
      try {
        const response = await fetch("/api/articles/list");
        const data = await response.json();
        console.log("fetchData", data);
        setData(data);
      } catch (error) {
        console.log("error occured");
      }
    };
    articles();
  }, []);
  const handleCards = () => {
    const currentDate = new Date();
    
    const cardElements = data.articles.map((item, index) => {
      return (
        <section className={`col ${styles.culmn}`} key={index}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>

              <ListBody key={index} value={item.body}/>
              <p className={`text-capitalize ${styles.author}`}>Created By: {`${item.user.firstname} ${item.user.lastname}`}</p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </section>
      );
    });
    return cardElements;
  };
  return (
    <>
      <section className={`container-fluid ${styles.wrapper}`}>
        {flash && (
          <div className="alert alert-success mt-3">
            Successfully Registered
          </div>
        )}
        {/* <h1>Home</h1> */}
        <section className={`row row-cols-1 row-cols-md-2 g-md-2 ${styles.wrap}`}>
          {data && handleCards()}
        </section>
      </section>
    </>
  );
};

export default Home;
