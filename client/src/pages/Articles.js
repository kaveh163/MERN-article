import { useEffect, useState } from "react";
import styles from "../articles.module.css";
import ListUsersArticles from "../ListUsersArticles";

const Articles = () => {
  const [data, setData] = useState(null);
  const [limit, setLimit] = useState(false);
  const [isExpired, setIsExpired] = useState(null);

  useEffect(() => {
    const fetchUserArticles = async () => {
      try {
        const response = await fetch("/api/articles/user");
        const data = await response.json();
        let timeLimitInMs;
        let currentTime;

        if (data.data) {
          setData(data.data);
          currentTime = Date.now();
        }
        if (data.user === "invalid") {
          setIsExpired(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserArticles();
  }, []);

  return (
    <>
      <section className="container-fluid">
        {isExpired && (
          <h4 style={{ color: "red", textAlign: "center" }}>Unauthorized</h4>
        )}
        <section
          className={`list-group list-group-flush m-5 ${styles.listWrap}`}
        >
          {data && <ListUsersArticles articleData={data} />}
        </section>
      </section>
    </>
  );
};
export default Articles;
