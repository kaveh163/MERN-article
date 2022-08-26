import { useEffect, useRef, useState } from "react";
import styles from "../article.module.css";

const Article = () => {
  const [limit, setLimit] = useState(false);
  const [isExpired, setIsExpired] = useState(null);
  const [showForm, setShowForm] = useState(true);
  // const textareaElement = useRef();
  const handleTextarea = (event) => {
    event.target.style.height = event.target.scrollHeight + "px";
  }
  const fetchState = async () => {
    try {
      const response = await fetch('/api/articles/protected');
      const state = await response.json();
      let timeLimitInMs;
      let currentTime = Date.now();
      // if(currentTime <= state.limit) {
      //   timeLimitInMs = state.limit - currentTime;
      // }
      // setTimeout(() => {
      //   setLimit(true);
      //   console.log('after limit');
      // }, timeLimitInMs)
      // if(state.user === "invalid") {
      //   window.location.href = '/';
      // }
      if(state.user === 'invalid') {
        setIsExpired(true);
        setShowForm(false);
      }
      console.log('last try statement');
    } catch (error) {
      console.log(error);
    }
    
  }
  useEffect(() => {
    fetchState();
  }, [])
  return (
    <>
      <section className="container-fluid">
        {isExpired && <h4 style={{color: "red", textAlign: "center"}}>Unauthorized</h4> }
        { showForm && 
        <div className={`${styles.layout}`}>
          <div className={`${styles.article}`}>Add Your Article</div>
          <div className={`row m-0 p-0 ${styles.lyt}`}>
            <div className={`col-12 col-md-6 offset-md-3 ${styles.frm}`}>
              <form action="/api/articles/protected" method="POST">
                <div className={`${styles.formWrapper}`}>
                  <label htmlFor="title" className={`form-label ${styles.lbl}`}>
                    Title:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${styles.title}`}
                    id="title"
                    name="title"
                    minLength='44'
                    maxLength='109'
                    required
                  />
                </div>
                <div>
                  <label htmlFor="body" className={`form-label ${styles.lbl}`}>
                    Body:
                  </label>
                  <textarea
                    name="body"
                    id="body"
                    // cols="30"
                    // rows="10"
                    className={`form-control ${styles.body}`}
                    onChange= {(event)=> handleTextarea(event)}
                    minLength='200'
                    required
                  ></textarea>
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    className={`btn btn-primary btn-block mt-3 ${styles.sub}`}
                  >
                    Add Article
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
}
      </section>
    </>
  );
};
export default Article;

//Woman says she fully co-operated with alleged sex assault investigation involving World Junior hockey players.....

