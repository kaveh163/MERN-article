import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "../articlesList.module.css";

function ArticlesList() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch("/api/articles/article", {
          method: "POST",
          body: JSON.stringify({
            articleId: id,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await response.json();
        console.log(data);
        setData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArticle();
  }, []);
  console.log(data);
  return (
    <section className="container-fluid">
      <section className="cntr">
        <section className={`row m-0 p-0 ${styles.wrapper}`}>
          <section className={`col-12 col-sm-10 offset-sm-1 mt-5 ${styles.colWrap}`}>
            <div className={`d-flex flex-column ${styles.wrap}`}>
              <h1 className={`${styles.header}`}>
                {data && data.title}
              </h1>
              <div>
                <span className="text-capitalize">
                  <small className={`${styles.userSize}`}>{`${data && data.user.firstname} ${data && data.user.lastname}`}</small>
                  <small className={`${styles.userSize} ${styles.dateColor}`}>
                    {" "}
                    | 1 Minute Ago
                  </small>
                </span>
              </div>
              <div className={`${styles.article} mt-3`}>
                {data && data.body}
              </div>
            </div>
          </section>
        </section>
      </section>
    </section>
  );
}
export default ArticlesList;
