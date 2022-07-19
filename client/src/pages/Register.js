import styles from "../register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffec, useRef } from "react";

const Register = () => {
  const [eye, setEye] = useState(false);

  const passwordElement = useRef();
  const handleEye = () => {
    setEye(!eye);
    if (eye) {
      passwordElement.current.type = "password";
    } else {
      passwordElement.current.type = "text";
    }
  };
  return (
    <>
      <section className="container-fluid">
        <section className={`${styles.wrapper}`}>
          <section className="">
            <section className={`${styles.innerWrapper} mx-auto`}>
              <form
                action="/action_page.php"
                className={`was-validated ${styles.register}`}
              >
                <label htmlFor="fname" className="form-label">
                  firstname:
                </label>
                <div className="mb-2 mt-2">
                  <input
                    type="text"
                    className="form-control"
                    id="fname"
                    placeholder="Enter username"
                    name="fname"
                    required
                  />
                  <div className="valid-feedback">Valid.</div>
                  <div className="invalid-feedback">
                    Please fill out this field.
                  </div>
                </div>
                <label htmlFor="lname" className="form-label">
                  lastname:
                </label>
                <div className="mb-2 mt-2">
                  <input
                    type="text"
                    className="form-control"
                    id="lname"
                    placeholder="Enter username"
                    name="lname"
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
                <div className="mb-2 mt-2 input-group">
                  <span class="input-group-text">
                    <FontAwesomeIcon
                      icon={eye ? faEye : faEyeSlash}
                      onClick={handleEye}
                    />
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    id="pwd"
                    placeholder="Enter password"
                    name="pswd"
                    ref={passwordElement}
                    required
                  />
                  <div className="valid-feedback">Valid.</div>
                  <div className="invalid-feedback">
                    Please fill out this field.
                  </div>
                </div>
                <label htmlFor="cpwd" className="form-label">
                  Confirm Password:
                </label>
                <div className="mb-2 mt-2">
                  <input
                    type="password"
                    className="form-control"
                    id="cpwd"
                    placeholder="Enter password"
                    name="cpwd"
                    required
                  />
                  <div className="valid-feedback">Valid.</div>
                  <div className="invalid-feedback">
                    Please fill out this field.
                  </div>
                </div>
                <label htmlFor="email" className="form-label">
                  email:
                </label>
                <div className="mb-2 mt-2">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter password"
                    name="email"
                    required
                  />
                  <div className="valid-feedback">Valid.</div>
                  <div className="invalid-feedback">
                    Please fill out this field.
                  </div>
                </div>
                <div class="d-grid">
                  <button
                    type="submit"
                    className={`btn btn-primary btn-block mb-2 mt-2 ${styles.rbtn}`}
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </section>
          </section>
        </section>
      </section>
    </>
  );
};
export default Register;
