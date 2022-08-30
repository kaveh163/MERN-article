import styles from "../register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faHandsAslInterpreting,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffec, useRef } from "react";

const Register = () => {
  const [eye, setEye] = useState(false);
  const [error, setError] = useState(null);

  const passwordElement = useRef();
  const fnameElement = useRef();
  const lnameElement = useRef();
  const cpasswordElement = useRef();
  const emailElement = useRef();
  const handleEye = () => {
    setEye(!eye);
    if (eye) {
      passwordElement.current.type = "password";
    } else {
      passwordElement.current.type = "text";
    }
  };
  const handleRegister = (e) => {
    e.preventDefault();
    const obj = {};
    obj["fname"] = fnameElement.current.value;
    obj["lname"] = lnameElement.current.value;
    obj["pass"] = passwordElement.current.value;
    obj["cpass"] = cpasswordElement.current.value;
    obj["email"] = emailElement.current.value;

    const createRegister = async () => {
      try {
        const response = await fetch("/api/users/register", {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await response.json();
        if (data.url === "home") {
          window.location.href = "/?display_flash=true";
        } else {
          // console.log(data.errors);
          setError(data.errors);
        }
      } catch (error) {
        console.log("Error posting data");
        process.exit(1);
      }
    };
    createRegister();
  };
  return (
    <>
      <section className="container-fluid">
        <section className={`${styles.wrapper}`}>
          <section className="">
            <section className={`was-validated ${styles.innerWrapper} mx-auto`}>
              <form action="/action_page.php" className={` ${styles.register}`}>
                <label htmlFor="fname" className="form-label">
                  firstname:
                </label>
                <div className="mb-2 mt-2">
                  <input
                    type="text"
                    className="form-control"
                    id="fname"
                    placeholder="Enter firstname"
                    name="fname"
                    ref={fnameElement}
                    required
                  />

                  <div className="invalid-feedback">
                    {error
                      ? error.map((item, index) => {
                          if (item.param === "fname") {
                            fnameElement.current.value = "";
                            return item.msg;
                          } else {
                            return "";
                          }
                        })
                      : ""}
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
                    placeholder="Enter lastname"
                    name="lname"
                    ref={lnameElement}
                    required
                  />

                  <div className="invalid-feedback">
                    {error
                      ? error.map((item, index) => {
                          if (item.param === "lname") {
                            lnameElement.current.value = "";
                            return item.msg;
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
                <div className="mb-2 mt-2 input-group has-validation">
                  <span className="input-group-text">
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

                  <div className="invalid-feedback">
                    {error
                      ? error.map((item, index) => {
                          if (item.param === "pass") {
                            passwordElement.current.value = "";
                            return item.msg;
                          } else {
                            return "";
                          }
                        })
                      : ""}
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
                    placeholder="confirm password"
                    name="cpwd"
                    ref={cpasswordElement}
                    required
                  />

                  <div className="invalid-feedback">
                    {error
                      ? error.map((item, index) => {
                          if (item.param === "cpass") {
                            cpasswordElement.current.value = "";
                            return item.msg;
                          } else {
                            return "";
                          }
                        })
                      : ""}
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
                    placeholder="Enter email"
                    name="email"
                    ref={emailElement}
                    required
                  />

                  <div className="invalid-feedback">
                    {error
                      ? error.map((item, index) => {
                          if (item.param === "email") {
                            emailElement.current.value = "";
                            return item.msg;
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
                    className={`btn btn-primary btn-block mb-2 mt-2 ${styles.rbtn}`}
                    onClick={(e) => handleRegister(e)}
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
