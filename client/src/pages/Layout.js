import { Link, Outlet } from "react-router-dom";
import styles from "../layout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
function Layout() {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <nav className={`${styles.font} ${styles.navColor}`}>
        <ul className="d-flex list-unstyled align-items-center">
          <li className="p-3 flex-fill">
            <Link className={styles.link} to="/">
              Home
            </Link>
          </li>
          <li className="p-3 flex-fill">
            <Link className={styles.link} to="/article">
              Add Article
            </Link>
          </li>
          <li className={`p-3 flex-fill ${styles.list}`}>
            <button
              className="d-flex justify-content-between"
              onClick={() => setToggle(!toggle)}
            >
              <span>Articles</span>
              <span>
                <FontAwesomeIcon icon={faCaretDown} />
              </span>
            </button>
            {toggle && (
              <ul className= {`list-group ${styles.fillItems}`}>
                <li className="list-group-item">First item</li>
                <li className="list-group-item">Second item</li>
                <li className="list-group-item">Third item</li>
              </ul>
            )}
          </li>
          <li className="p-3 flex-fill">
            <Link className={styles.link} to="/register">
              Register
            </Link>
          </li>
          <li className="p-3 flex-fill">
            <Link className={styles.link} to="/login">
              Login
            </Link>
          </li>
          <li className="p-3 flex-fill">
            <a className={styles.link}>Logout</a>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
export default Layout;
