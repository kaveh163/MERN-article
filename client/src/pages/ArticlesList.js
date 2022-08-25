import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router";
import styles from "../articlesList.module.css";
import TimeStamp from "../TimeStamp";
import { useLocation } from "react-router-dom";
console.log('inside ArticlesList');
function ArticlesList(props) {
  const [data, setData] = useState("");
  const [shadow, setShadow] = useState(false);
  const [txt, setTxt] = useState(false);
  const { id } = useParams();
  console.log("afterState");
  // const location = useLocation();
  const articleParent = useRef('');
  const articleChild = useRef('');
  // const currentDate = location.state.currentDate;
  // console.log(id);

  useEffect(() => {
    const handleWidth = (x) => {
      if(x.matches) {
        console.log('articleChild',articleChild)
        // console.log('clientHeight', articleChild.current.clientHeight)
        if (articleChild.current.clientHeight &&
          articleChild.current.clientHeight > articleParent.current.clientHeight
        ) {
          setShadow(true);
        } else {
          // setShadow(false);
          articleChild.current.height = 'auto';

        }
      }
    }
    // console.log("inside effect at beginning");
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
        // console.log(data);
        // console.log("before setData");
        setData(data.data);
        // console.log("after setData");
      } catch (error) {
        console.log(error);
      }
    };
    if (data.length === 0) {
      fetchArticle();
    }
    const pageWidth = window.matchMedia("(max-width: 577px)");
    handleWidth(pageWidth);
    pageWidth.addListener(handleWidth);
    
    return () => pageWidth.removeListener(handleWidth);
    
    // console.log("inside effect after fetchArticle");
  }, [data, articleChild]);

  // console.log(data);
  console.log("before return");
  return (
    <section className="container-fluid">
      <section className="cntr">
        <section className={`row m-0 p-0 ${styles.wrapper}`}>
          <section
            className={`col-12 col-sm-10 offset-sm-1 mt-5 ${styles.colWrap}`}
          >
            <div className={`d-flex flex-column ${styles.wrap}`}>
              <h1 className={`${styles.header}`}>{data && data.title}</h1>
              <div>
                <span className="text-capitalize">
                  <small className={`${styles.userSize}`}>{`${
                    data && data.user.firstname
                  } ${data && data.user.lastname}`}</small>
                  <small className={`${styles.userSize} ${styles.dateColor}`}>
                    {" "}
                    |{" "}
                    {data && (
                      <TimeStamp
                        createdDate={data.createdAt}
                        updatedDate={data.updatedAt}
                      />
                    )}
                  </small>
                </span>
              </div>
              <div
                className={
                  shadow
                    ? txt
                      ? `${styles.articleParent} ${styles.hgt}`
                      : `${styles.articleParent} ${styles.shadow} ${styles.overflw}`
                    : `${styles.articleParent}`
                }
                ref={articleParent}
              >
                <div
                  className={`${styles.article} ${styles.articleChild} mt-3`}
                  ref={articleChild}
                >
                  {data && data.body}
                </div>
              </div>
            </div>
            {shadow && (
              <p className={`${styles.read}`} onClick={() => setTxt(!txt)}>
                {" "}
                <span>
                  <FontAwesomeIcon icon={txt ? faAngleUp : faAngleDown} />
                </span>{" "}
                {shadow && (txt ? "Read less" : "Read more")}
              </p>
            )}
          </section>
        </section>
      </section>
    </section>
  );
}
export default ArticlesList;
