import styles from "../updateArticle.module.css";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";

function UpdateArticle() {
  const [inp, setInp] = useState("");
  const [txt, setTxt] = useState("");
  const { id } = useParams();
  console.log("id", id);
  const handleTextArea = (e) => {
    e.target.style.height = e.target.scrollHeight + "px";
    setTxt(e.target.value);

  };
  // const updateTitle = useRef("");
  // const updateBody = useRef("");

  // const handleArticle = async (e) => {
  //   e.preventDefault();
  //   const updateTitleVal = updateTitle.current.value;
  //   const updateBodyVal = updateBody.current.value;
  //   console.log('title', updateTitleVal);
  //   console.log('Body', updateBodyVal);
  //   try {
  //     const response = await fetch(`/api/articles/update/article/${id}`, )
  //   } catch (error) {
      
  //   }
  // }
  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await fetch(`/api/articles/update/article/${id}`);
        const articleData = await response.json();
        console.log(articleData);
        setInp(articleData.data.title);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTitle();
  }, []);
  return (
    <>
      <section className="container-fluid">
        <section className="row m-0 p-0 mt-5">
          <section className={`col-12 col-md-6 offset-md-3 ${styles.grid}`}>
            <div className={`${styles.body}`}>
              <div className={`${styles.frmWrapper}`}>
                <form action={`/api/articles/update/article/${id}`} className={`${styles.frm}`} method="POST">
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
                      onChange= {(e) => setInp(e.target.value)}
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
      </section>
    </>
  );
}
export default UpdateArticle;
