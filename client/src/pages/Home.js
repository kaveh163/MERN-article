import { faPersonWalkingDashedLineArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../home.module.css";
import ListBody from "../ListBody";
import ListDate from "../ListDate";

const Home = () => {
  const [flash, setFlash] = useState(false);
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [limit, setLimit] = useState(false);

  useEffect(() => {
    if (document.location.search) {
      const query = new URLSearchParams(document.location.search);
      const display_flash = query.get("display_flash");
      const success = query.get("success");
      if (display_flash === "true") {
        setFlash(true);
        setTimeout(() => {
          window.location.replace("/");
        }, 3000);
      } else if (success == "true") {
        setShow(true);
        const protectedArticles = async () => {
          try {
            const response = await fetch("api/articles/list/protected");
            const data = await response.json();
            setData(data);
            let currentTime = Date.now();
            let timeLimitInMs;
          } catch (error) {
            console.log(error);
          }
        };
        protectedArticles();
      }
    } else {
      const articles = async () => {
        try {
          const response = await fetch("/api/articles/list");
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.log("error occured");
        }
      };
      articles();
    }
  }, []);
  const handleCards = () => {
    const cardElements = data.articles.map((item, index) => {
      return (
        <section className={`col ${styles.culmn}`} key={index}>
          <Link
            to={
              show
                ? `/articles/list/${item._id}/?success=true`
                : `/articles/list/${item._id}`
            }
            className={`card ${styles.crd}`}
          >
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>

              <ListBody key={index} value={item.body} />
              <p className={`text-capitalize ${styles.author}`}>
                Created By: {`${item.user.firstname} ${item.user.lastname}`}
              </p>
            </div>
            <ListDate key={index} date={item.updatedAt} />
          </Link>
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
        <section
          className={`row row-cols-1 row-cols-md-2 g-md-2 ${styles.wrap}`}
        >
          {data && handleCards()}
        </section>
      </section>
    </>
  );
};

export default Home;
