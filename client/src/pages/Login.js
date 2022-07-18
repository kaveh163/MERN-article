import styles from "../login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
const Login = () => {
  return (
    <>
      <section className="container-fluid">
        <section className={`${styles.layout} col-12`}>
          <section className={`${styles.wrapper}`}>
            <section className="d-flex justify-content-center align-items-center">
              <section className={`${styles.innerWrapper}`}>
                <h2 className={`h3 ${styles.header}`}>
                  Log in to your account
                </h2>
                <form className={`${styles.login} was-validated`}>
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <div className="mb-3 mt-2 input-group">
                    <span className="input-group-text" id="inputGroupPrepend">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                      type="text"
                      className={`form-control ${styles.email}`}
                      id="email"
                      placeholder="Enter email"
                      name="email"
                      required
                    />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">
                      Please fill out this field.
                    </div>
                  </div>
                  <label htmlFor="pwd" className="form-label">
                    Password:
                  </label>
                  <div className="mb-3 mt-2 input-group">
                    <span className="input-group-text" id="inputGroupPrepend">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                      type="password"
                      className={`form-control ${styles.pwd}`}
                      id="pwd"
                      placeholder="Enter password"
                      name="pswd"
                      required
                    />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">
                      Please fill out this field.
                    </div>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-block">
                      Login
                    </button>
                  </div>
                </form>
                <div className={` ${styles.footer}`}>
                  <span>New? </span>
                  <span><a href="/register">Sign Up</a></span>
                </div>
              </section>
            </section>
          </section>
        </section>
      </section>
    </>
  );
};
export default Login;
