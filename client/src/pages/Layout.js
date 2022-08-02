import { Link, Outlet } from "react-router-dom";
import styles from "../layout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
function Layout() {
  const [toggle, setToggle] = useState(true);
  const [show, setShow] = useState(false);

  const logoutHandler = async () => {
    const response = await fetch("/users/logout");
    const data = await response.json();
    if (data.success) {
      window.location.href = "/";
    } else if (data.error) {
      console.log(data.error);
    }
  };
  useEffect(() => {
    console.log(document.location.search);
    if (document.location.search) {
      const query = new URLSearchParams(document.location.search);
      console.log("Here");
      console.log("query", query);
      const success = query.get("success");
      console.log(success);
      if (success === "true") {
        setToggle(false);
        setShow(true);
      }
    }
  }, []);

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
        <Outlet />
      </div>
    </>
  );
}
export default Layout;
