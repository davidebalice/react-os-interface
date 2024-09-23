import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import config from "../config";
import { useOsContext } from "../context/Context";
import api from "../utils/api";

const Profile = () => {
  const [file, setFile] = useState(null);
  const { user, setUser } = useOsContext();
  const token = localStorage.getItem("authToken");
  const [showDemo, setShowDemo] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    password: "",
    passwordConfirm: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputPassword = (event) => {
    const { name, value } = event.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleClose = (e) => {
    setShowDemo(false);
  };

  useEffect(() => {
    api
      .get(`/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setFormData(response.data.user);
        setUser(response.data.user);
        console.log(response.data.user);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    if (config.demoMode) {
      setShowDemo(true);
    } else {
      api
        .post(`$/api/profile/update`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log("response.data");
          console.log(response.data);
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const submitPassword = (e) => {
    e.preventDefault();
    if (config.demoMode) {
      setShowDemo(true);
    } else {
      api
        .post(`/api/profile/password`, passwordData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          if (response.data.message === "success") {
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const submitPhoto = (e) => {
    e.preventDefault();
    if (config.demoMode) {
      setShowDemo(true);
    } else {
      const formPhoto2 = new FormData();
      formPhoto2.append("photo", file);

      api
        .post(`/api/profile/photo`, formPhoto2, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setFormData({ photo: response.data.photo });
          setUser({ photo: response.data.photo });
          if (response.data.message === "success") {
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
      {showDemo && (
        <motion.div
          className="demo-modal"
          initial={{
            y: -200,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: -200,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          layout
        >
          <div className="demo-modal-header">
            <button onClick={handleClose} className="demo-modal-button">
              <IoClose className="demo-modal-icon-close" />
            </button>
          </div>
          DEMO
        </motion.div>
      )}

      <div className="formContainer">
        <div className="row ">
          <h4>Personal data</h4>
          <br />
          <br />
          <div className="col-md-6 mt-3">
            <label htmlFor="name">
              <b>Surname</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="surname"
              required
              value={formData.surname}
              onChange={handleInput}
            />
          </div>
          <div className="col-md-6 mt-3">
            <label htmlFor="name">
              <b>Name</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              required
              value={formData.name}
              onChange={handleInput}
            />
          </div>
          <div className="col-md-6 mt-3">
            <label htmlFor="priority">
              <b>Email</b>
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              required
              value={formData.email}
              onChange={handleInput}
            />
          </div>
        </div>
        <button onClick={submitForm} className="btn saveButton btn-sm mt-3">
          <FontAwesomeIcon icon={faFloppyDisk} className="saveButtonIcon" />{" "}
          Save
        </button>

        <ul />

        <h4>Update password</h4>
        <br />
        <div className="row ">
          <div className="col-md-6 mt-3">
            <label htmlFor="name">
              <b>Password</b>
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              required
              value={passwordData.password}
              onChange={handleInputPassword}
            />
          </div>
          <div className="col-md-6 mt-3">
            <label htmlFor="name">
              <b>Confirm password</b>
            </label>
            <input
              type="password"
              className="form-control"
              name="passwordConfirm"
              required
              value={passwordData.passwordConfirm}
              onChange={handleInputPassword}
            />
          </div>
        </div>

        <button onClick={submitPassword} className="btn saveButton btn-sm mt-3">
          <FontAwesomeIcon icon={faFloppyDisk} className="saveButtonIcon" />{" "}
          Save
        </button>

        <ul />

        <div className="row ">
          <div className="mt-3">
            <h4>Profile photo</h4>
            <br /> <br />
            <img
              src={`${config.apiUrl}/api/user/img/${
                formData && formData.photo
              }`}
              className="userImg"
              alt=""
            />
          </div>
          <div className="col-md-6 mt-3">
            <label htmlFor="photo">
              <b>Select file</b>
            </label>
            <input
              type="file"
              className="form-control"
              name="photo"
              required
              onChange={handleFile}
            />
          </div>
        </div>

        <button onClick={submitPhoto} className="btn saveButton btn-sm mt-3">
          <FontAwesomeIcon icon={faFloppyDisk} className="saveButtonIcon" />{" "}
          Save
        </button>
      </div>
    </>
  );
};
export default Profile;
