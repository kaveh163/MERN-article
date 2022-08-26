import { useEffect, useState } from "react";
import styles from '../articles.module.css';
import ListUsersArticles from '../ListUsersArticles'

console.log('inside articles');
const Articles = () => {
  const [data, setData] = useState(null);
  const [limit, setLimit] = useState(false);
  const [isExpired, setIsExpired] = useState(null);
  console.log('after state');
  useEffect(() => {
    
    const fetchUserArticles = async () => {
      console.log('inside fetch function')
      try {
        const response = await fetch("/api/articles/user");
        const data = await response.json();
        console.log(data);
        let timeLimitInMs;
        let currentTime;
        
        if(data.data) {
          setData(data.data);
          console.log('setData');
          
          currentTime= Date.now();
        }
        if(data.user === "invalid") {
          setIsExpired(true);
        }
        
        // if(currentTime <= data.limit) {
        //   timeLimitInMs = data.limit - currentTime;
        // }
        // setTimeout(() => {
        //   setLimit(true);
        //   console.log('after limit');
        // }, timeLimitInMs);
        
        // if (data.user === "invalid") {
        //   console.log('inside invalid');
          
        //   window.location.href = "/";
        // }
       
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserArticles();
    console.log('after fetch function');
  }, []);
  // console.log("Users Articles", data);
  console.log('return');
  return (
    <>
      <section className="container-fluid">
      {isExpired && <h4 style={{color: "red", textAlign: "center"}}>Unauthorized</h4> }
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
