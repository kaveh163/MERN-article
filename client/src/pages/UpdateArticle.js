import styles from "../updateArticle.module.css";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";

function UpdateArticle() {
  const [inp, setInp] = useState("");
  const [txt, setTxt] = useState("");
  const [limit, setLimit] = useState(false);
  const [isExpired, setIsExpired] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const { id } = useParams();

  const handleTextArea = (e) => {
    if (e.target.value === "") {
      e.target.style.height = "200px";
    } else {
      e.target.style.height = e.target.scrollHeight + "px";
    }
    setTxt(e.target.value);
  };

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await fetch(`/api/articles/update/article/${id}`);
        const articleData = await response.json();
        if (articleData.data) {
          setInp(articleData.data.title);
        }
        let timeLimitInMs;
        let currentTime = Date.now();
        if (articleData.user === "invalid") {
          setIsExpired(true);
          setShowForm(null);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTitle();
  }, []);
  return (
    <>
      <section className="container-fluid">
        {isExpired && (
          <h4 style={{ color: "red", textAlign: "center" }}>Unauthorized</h4>
        )}
        {showForm && (
          <section className="row m-0 p-0 mt-5">
            <section className={`col-12 col-md-6 offset-md-3 ${styles.grid}`}>
              <div className={`${styles.body}`}>
                <div className={`${styles.frmWrapper}`}>
                  <form
                    action={`/api/articles/update/article/${id}`}
                    className={`${styles.frm}`}
                    method="POST"
                  >
                    <div className={`mb-3 mt-3 ${styles.innerfrm}`}>
                      <label htmlFor="title" className="form-label mb-2">
                        Title:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter email"
                        name="title"
                        minLength="44"
                        maxLength="109"
                        value={inp}
                        onChange={(e) => setInp(e.target.value)}
                        // ref={updateTitle}
                        required
                      />
                    </div>
                    <div className="mb-3 mt-3">
                      <label htmlFor="body" className="mb-2">
                        Body:
                      </label>
                      <textarea
                        className={`form-control ${styles.txtArea}`}
                        // rows="10"
                        id="body"
                        name="body"
                        onChange={(event) => handleTextArea(event)}
                        minLength="200"
                        value={txt}
                        // ref={updateBody}
                        required
                      ></textarea>
                    </div>
                    <div className="d-grid">
                      <button
                        type="submit"
                        className={`btn ${styles.btnBg} btn-block`}
                        // onClick={(event) => handleArticle(event)}
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </section>
        )}
      </section>
    </>
  );
}
export default UpdateArticle;
