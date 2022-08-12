import styles from "./articles.module.css";

function ListUsersArticles({ articleData }) {
  const userArticles = articleData.map((article, index) => {
    return (
      <div key={index} className={`list-group-item list-group-item-action ${styles.lWCh}`}>
        <div className="d-flex align-items-sm-center flex-column flex-sm-row">
          <div className="">{article.title}</div>
          <div className={`ms-auto ${styles.btns}`}>
            <button
              className={`btn ${styles.upd}`}
              style={{ color: "rgba(0,0,0,.55)" }}
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
