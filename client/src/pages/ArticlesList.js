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
                Out-of-control fires have Newfoundland towns on edge as crisis
                moves into 3rd week Social Sharing
              </h1>
              <div>
                <span className="text-capitalize">
                  <small className={`${styles.userSize}`}>John Due</small>
                  <small className={`${styles.userSize} ${styles.dateColor}`}>
                    {" "}
                    | 1 Minute Ago
                  </small>
                </span>
              </div>
              <div className={`${styles.article} mt-3`}>
                A young woman from Saguenay, Que., says she left a local
                pharmacy feeling shamed after a pharmacist refused to sell her
                emergency oral contraception, better known as the morning-after
                pill, because it went against his religious beliefs. 
                "I felt bad, I felt really judged," said the
                24-year-old woman, who asked to remain anonymous for fear of
                reprisal.
              </div>
            </div>
          </section>
        </section>
      </section>
    </section>
  );
}
export default ArticlesList;
