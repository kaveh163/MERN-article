import { Link, Outlet } from "react-router-dom";
import styles from "../layout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";

function Layout() {
  const [toggle, setToggle] = useState(true);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState("");
  const [isCount, setIsCount] = useState(true);

  const time = useRef("");

  const timer = () => {
    if (count > 0) {
      setCount(count - 1000);
    } else {
      window.location.href = "/";
    }
  };
  const fetchExp = async () => {
    try {
      if (isCount) {
        const res = await fetch("/api/articles/expire");
        const exptime = await res.json();

        setCount(exptime.exp);
        setIsCount(false);
      }

      time.current = setInterval(timer, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  const logoutHandler = async () => {
    const response = await fetch("/api/users/logout");
    const data = await response.json();
    if (data.success) {
      window.location.href = "/";
    } else if (data.error) {
      console.log(data.error);
    }
  };
  if (performance.getEntriesByType("navigation")[0].type == "reload") {
    logoutHandler();
  }
  useEffect(() => {
    if (document.location.search) {
      const query = new URLSearchParams(document.location.search);
      const success = query.get("success");
      if (success === "true") {
        setToggle(false);
        setShow(true);
        fetchExp();
        return () => clearInterval(time.current);
      }
    }
  }, [count]);
  const handleTime = (count) => {
    let milliseconds = count;
    let oneMinuteToMilliSeconds = 60000;
    let oneHourToMilliSeconds = oneMinuteToMilliSeconds * 60;
    let hours = Math.floor(milliseconds / oneHourToMilliSeconds);
    let minutes = Math.floor(
      (milliseconds % oneHourToMilliSeconds) / oneMinuteToMilliSeconds
    );
    let seconds = Math.floor(
      ((milliseconds % oneHourToMilliSeconds) % oneMinuteToMilliSeconds) / 1000
    );
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
  };
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
                <li className={`nav-item`}>
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={show ? "/?success=true" : "/"}
                    tabIndex="1"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  {show && (
                    <Link
                      className={`nav-link ${styles.menuChild}`}
                      to="/article/?success=true"
                      tabIndex="1"
                    >
                      Add Article
                    </Link>
                  )}
                </li>
                <li className="nav-item">
                  {show && (
                    <Link
                      className={`nav-link ${styles.menuChild}`}
                      to="/articles/?success=true"
                      tabIndex="1"
                    >
                      My Articles
                    </Link>
                  )}
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  {toggle && (
                    <Link
                      className={`nav-link ${styles.menuChild}`}
                      to="/login"
                      tabIndex="1"
                    >
                      Login
                    </Link>
                  )}
                </li>
                <li className="nav-item">
                  {show && (
                    <a
                      className={`nav-link ${styles.cursor}`}
                      onClick={logoutHandler}
                      tabIndex="1"
                    >
                      Logout
                    </a>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className={`container-fluid ${styles.alignLayout}`}>
          {show && handleTime(count)}
        </div>

        <Outlet />
      </div>
    </>
  );
}
export default Layout;
