import { Link, Outlet } from "react-router-dom";
import styles from "../layout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
function Layout() {
  const [toggle, setToggle] = useState(true);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(1);
  const [isCount, setIsCount] = useState(true);

  const time = useRef('');

  const timer= () => {
    console.log('timer', count);
    setCount(count - 1000);
  };
  const fetchExp= ()=> {
    try {
      // const res = await fetch('/api/articles/expire');
      // const exptime = await res.json();
      // console.log('exptime', exptime);
      // setCount(exptime.exp);
      // setCount(60000);
      if(isCount) {
        if(60000) {
          setCount(60000);
          setIsCount(false);
        }
      }
      if(count > 0) {
        time.current =  setInterval(timer, 1000);
      } else {
       
        window.location.href = '/';
      }
     

    } catch (error) {
      console.log(error);
    }
  }
  const logoutHandler = async () => {
    const response = await fetch("/api/users/logout");
    const data = await response.json();
    if (data.success) {
      window.location.href = "/";
    } else if (data.error) {
      console.log(data.error);
    }
  };
  useEffect(() => {
    
    // console.log(document.location.search);
    if (document.location.search) {
      const query = new URLSearchParams(document.location.search);
      // console.log("Here");
      // console.log("query", query);
      const success = query.get("success");
      // console.log(success);
      if (success === "true") {
        setToggle(false);
        setShow(true);
        fetchExp();
        return () => clearInterval(time.current)
      }
    }
    
  }, [count]);

  return (
    <>
      <div className={`${styles.align}`}>
        <nav
          className={`navbar navbar-expand-sm navbar-light justify-content-center ${styles.navColor} ${styles.font}`}
        >
          <div className={`container-fluid ${styles.cont}`}>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`collapse navbar-collapse ${styles.menu}`}
              id="collapsibleNavbar"
            >
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={show ? "/?success=true" : "/"}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  {show && (
                    <Link className="nav-link" to="/article/?success=true">
                      Add Article
                    </Link>
                  )}
                </li>
                <li className="nav-item">
                  {show && (
                    <Link className="nav-link" to="/articles/?success=true">
                      Articles
                    </Link>
                  )}
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  {toggle && (
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  )}
                </li>
                <li className="nav-item">
                  {show && (
                    <a
                      className={`nav-link ${styles.cursor}`}
                      onClick={logoutHandler}
                    >
                      Logout
                    </a>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {show && count}
        <Outlet />
      </div>
    </>
  );
}
export default Layout;
