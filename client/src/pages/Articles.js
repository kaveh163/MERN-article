import { useEffect, useState } from "react";
import styles from '../articles.module.css';
import ListUsersArticles from '../ListUsersArticles'


const Articles = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchUserArticles = async () => {
      try {
        const response = await fetch("/api/articles/user");
        const data = await response.json();
        console.log(data);
        setData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserArticles();
  }, []);
  console.log("Users Articles", data);
  return (
    <>
      <section className="container-fluid">
        <section className={`list-group list-group-flush m-5 ${styles.listWrap}`}>
          {data && <ListUsersArticles articleData= {data}/>}
          
          
          {/* <div className={`list-group-item list-group-item-action ${styles.lWCh}`}>
            <div className="d-flex align-items-sm-center flex-column flex-sm-row">
              <div className="">Woman says she fully co-operated with alleged sex assault investigation involving World Junior hockey players</div>
              <div className={`ms-auto ${styles.btns}`}>
                <button className={`btn ${styles.upd}`} style={{color: 'rgba(0,0,0,.55)'}}>Update</button>
                <button className={`btn ${styles.del}`} style={{color: 'red'}}>Delete</button>
              </div>
            </div>
          </div>
          <div className={`list-group-item list-group-item-action ${styles.lWCh}`}>
            <div className="d-flex align-items-sm-center flex-column flex-sm-row">
              <div className="">Woman says she fully co-operated with alleged sex assault investigation involving World Junior hockey players</div>
              <div className={`ms-auto ${styles.btns}`}>
                <button className={`btn ${styles.upd}`} style={{color: 'rgba(0,0,0,.55)'}}>Update</button>
                <button className={`btn ${styles.del}`} style={{color: 'red'}}>Delete</button>
              </div>
            </div>
          </div> */}

          
        </section>
      </section>
    </>
  );
};
export default Articles;
