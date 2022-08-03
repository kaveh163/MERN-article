import styles from "../login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
const Login = () => {
  const [errors, setErrors] = useState(null);
  const [auth, setAuth] = useState(null);

  const emailElement = useRef();
  const passwordElement = useRef();
  const handleLogin = (event) => {
    event.preventDefault();
    console.log("email", emailElement.current.value);
    console.log("password", passwordElement.current.value);
    const createLogin = async () => {
      try {
        const response = await fetch("/api/users/login", {
          method: "POST",
          body: JSON.stringify({
            email: emailElement.current.value,
            password: passwordElement.current.value,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const loginRes = await response.json();
        console.log("LoginRes", loginRes);
        if (loginRes.errors) {
          setErrors(loginRes.errors);
        } else if (loginRes.message) {
          setAuth(loginRes.message);
          setTimeout(() => {
            setAuth(null);
          }, 3000);
        } else {
          window.location.href = `/?success=${true}`;
        }

        
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
    };
    createLogin();
  };
  console.log("data", errors);
  return (
    <>
      <section className="container-fluid">
        <section className={`${styles.layout} col-12`}>
          {auth && <div className="alert alert-danger mt-3 mb-0">{auth}</div>}

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
                      ref={emailElement}
                      required
                    />

                    <div className="invalid-feedback">
                      {errors
                        ? errors.map((error, index) => {
                            if (error.param === "email") {
                              emailElement.current.value = "";
                              return error.msg;
                            } else {
                              return "";
                            }
                          })
                        : ""}
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
                      ref={passwordElement}
                      required
                    />

                    <div className="invalid-feedback">
                      {errors
                        ? errors.map((error, index) => {
                            if (error.param === "password") {
                              passwordElement.current.value = "";
                              return error.msg;
                            } else {
                              return "";
                            }
                          })
                        : ""}
                    </div>
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>
                </form>
                <div className={` ${styles.footer}`}>
                  <span>New? </span>
                  <span>
                    <a href="/register">Sign Up</a>
                  </span>
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
