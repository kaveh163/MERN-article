import styles from "../updateArticle.module.css";

function UpdateArticle() {
  const handleTextArea = (e) => {
    e.target.style.height = e.target.scrollHeight + "px";
  };
  return (
    <>
      <section className="container-fluid">
        <section className="row m-0 p-0 mt-5">
          <section className={`col-12 col-md-6 offset-md-3 ${styles.grid}`}>
            <div className={`${styles.body}`}>
              <div className={`${styles.frmWrapper}`}>
                <form action="/action_page.php" className={`${styles.frm}`}>
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
                      required
                    ></textarea>
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className={`btn ${styles.btnBg} btn-block`}
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </section>
      </section>
    </>
  );
}
export default UpdateArticle;
