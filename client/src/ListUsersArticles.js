import styles from "./articles.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ListUsersArticles({ articleData }) {
  const navigate = useNavigate();
  const handleUpdate = (article) => {
    console.log("handleupdateId", article._id);
    navigate(`/articles/update/${article._id}/?success=true`);
  };
  const userArticles = articleData.map((article, index) => {
    return (
      <div
        key={index}
        className={`list-group-item list-group-item-action ${styles.lWCh}`}
      >
        <div className="d-flex align-items-sm-center flex-column flex-sm-row">
          <div className="">
            {" "}
            <Link
              to={`/articles/list/${article._id}/?success=true`}
              className={`${styles.title}`}
            >
              {article.title}
            </Link>
          </div>
          <div className={`ms-auto ${styles.btns}`}>
            <button
              className={`btn ${styles.upd}`}
              style={{ color: "rgba(0,0,0,.55)" }}
              onClick={() => handleUpdate(article)}
            >
              Update
            </button>
            <button className={`btn ${styles.del}`} style={{ color: "red" }}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  });
  return <>{userArticles}</>;
}
export default ListUsersArticles;
