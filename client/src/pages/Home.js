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
  console.log("after state");
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

        // setTimeout(() => {
        //   window.location.href = "/";
        // }, 3000);
      } else if (success == "true") {
        setShow(true);
        const protectedArticles = async () => {
          try {
            const response = await fetch('api/articles/list/protected');
            const data = await response.json();
            setData(data);
            let currentTime = Date.now();
            let timeLimitInMs;
            if (currentTime <= data.limit) {
              timeLimitInMs = data.limit - currentTime;
            }
            setTimeout(()=> {
              setLimit(true);
            }, timeLimitInMs);
            if(data.user === "invalid") {
              window.location.href = '/';
            }
          } catch (error) {
            console.log(error);
          }
        }
        protectedArticles();
      } 
        
      
    } else {
      const articles = async () => {
        try {
          const response = await fetch("/api/articles/list");
          const data = await response.json();
          // console.log("fetchData", data);
          setData(data);

          // console.log("setData");
        } catch (error) {
          console.log("error occured");
        }
      };
      articles();
    }
    // console.log("Hello");
    // const articles = async () => {
    //   try {
    //     const response = await fetch("/api/articles/list");
    //     const data = await response.json();
    //     console.log("fetchData", data);
    //     setData(data);

    //     console.log("setData");
    //   } catch (error) {
    //     console.log("error occured");
    //   }
    // };
    // articles();
    // console.log("after articles method");
    // console.log(document.location.search);
    // if (document.location.search) {
    //   const query = new URLSearchParams(document.location.search);

    //   const success = query.get("success");
    //   console.log("before success");
    //   if (success === "true") {
    //     setShow(true);
    //     console.log("after setShow");

    //     console.log("after success");

    //     console.log("after fetch");
    //   }
    // }
  }, [limit]);
  const handleCards = () => {
    // const currentDate = new Date();

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
        {/* <h1>Home</h1> */}
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
