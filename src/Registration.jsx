import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import KeyIcon from "@mui/icons-material/Key";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { NavLink, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Autocomplete } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";



function Registration() {
  const Url = "https://user.rightfx.com";
  const [infoErrors, setInfoErrors] = useState({});
  const [regData, setregData] = useState({
    username: "",
    e_mail: "",
    psd: "",
    p_number: "",
    Country: "",
  });
  const [countryData, setCountryData] = useState({
    data: [],
  });

  const regInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setregData((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const register = (e) => {
    e.preventDefault();
    setInfoErrors(regData);
    axios
      .post(Url + "/ajaxfiles/registration.php", {
        user_full_name: regData.username,
        user_email_address: regData.e_mail,
        user_password: regData.psd,
        user_phone: regData.p_number,
        user_country_code: regData.Country,
        send_otp:""
      })
      .then((res) => {
        if (res.data.status == "error") {
          toast(res.data.message);
          if (res.data.message == "Email address already used") {
            Navigate("/");
          }
        } else {
          Navigate("/");
          setregData({
            user_full_name: "",
            user_email_address: "",
            user_password: "",
            user_phone: "",
          });
          toast(res.data.message);
        }
      });
  };

  useEffect(() => {
    const param = new FormData();
    axios.post(Url + "/datatable/get_countries.php", param).then((res) => {
      if (res.data.status == "error") {
        toast(res.data.message);
      } else {
        countryData.data = res.data.aaData;
        setCountryData({ ...countryData });
        regData.india = res.data.user_country;
        setregData({ ...regData });
      }
      console.log(regData.india);
    });
  }, []);

  return (
    <div>
      <div className="body">
        <ToastContainer />
        <div className="login-wrap">
          <div className="login-html" style={{ padding: "70px 50px" }}>
            <div className="text-center mb-3">
              <div>
                <span className="text_format"> REGISTRATION </span>
              </div>
              <hr />
            </div>
            <div className="login-form">
              <div className="sign-up-htm">
                <div className="group">
                  <label for="user" className="label">
                    Name
                  </label>

                  <Box
                    className="input"
                    sx={{ display: "flex", alignItems: "flex-end" }}
                  >
                    <AccountCircle
                      sx={{ color: "#666", my: 0.5, mb: "8px " }}
                    />
                    <FormControl fullWidth sx={{ mr: "6%" }}>
                      <TextField
                        sx={{
                          border: "none",
                          "& fieldset": { border: "none" },
                        }}
                        id="user"
                        type="text"
                        className="Text_field"
                        name="username"
                        value={regData.username}
                        onChange={regInput}
                      />
                    </FormControl>
                  </Box>
                </div>
                <div className="group">
                  <div className="flex_tags">
                    <label className="label">Phone No</label>
                    <label className="label">Country</label>
                  </div>
                  <Box
                    className="input"
                    sx={{ display: "flex", alignItems: "flex-end" }}
                  >
                    <PhoneIphoneIcon
                      sx={{ color: "#666", my: 0.5, mb: "8px " }}
                    />
                    <FormControl fullWidth sx={{ mr: "6%" }}>
                      <TextField
                        sx={{
                          border: "none",
                          "& fieldset": { border: "none" },
                        }}
                        id="pass"
                        type="number"
                        className="Text_field"
                        name="p_number"
                        value={regData.p_number}
                        onChange={regInput}
                      />
                    </FormControl>
                    <PublicIcon sx={{ color: "#666", my: 0.5, mb: "8px " }} />
                    <FormControl
                      fullWidth
                      size="small"
                      className="country_field"
                    >
                      <Autocomplete
                        onChange={(e, value) => {
                          if (value == null || value == undefined) {
                            regData.Country = "";
                          } else {
                            regData.Country = value;
                          }
                          setregData({ ...regData });
                        }}
                        value={regData.Country}
                        name="Country"
                        disablePortal
                        options={countryData.data}
                        getOptionLabel={(option) => (option ? option.name : "")}
                        renderInput={(params) => (
                          <TextField
                            sx={{
                              border: "none",
                              "& fieldset": { border: "none" },
                              color: "#666",
                              my: 0.5,
                              mb: "6px ",
                              ml: "10px",
                            }}
                            {...params}
                            size="small"
                          />
                        )}
                      />
                    </FormControl>
                  </Box>
                </div>
                <div className="group">
                  <label for="pass" className="label">
                    Email Address
                  </label>
                  <Box
                    className="input"
                    sx={{ display: "flex", alignItems: "flex-end" }}
                  >
                    <EmailIcon sx={{ color: "#666", my: 0.5, mb: "8px " }} />
                    <FormControl fullWidth sx={{ mr: "6%" }}>
                      <TextField
                        sx={{
                          border: "none",
                          "& fieldset": { border: "none" },
                        }}
                        id="pass"
                        type="email"
                        className="Text_field"
                        name="e_mail"
                        value={regData.e_mail}
                        onChange={regInput}
                      />
                    </FormControl>
                  </Box>
                </div>

                <div className="group">
                  <label for="pass" className="label">
                    Password
                  </label>
                  <Box
                    className="input"
                    sx={{ display: "flex", alignItems: "flex-end" }}
                  >
                    <KeyIcon sx={{ color: "#666", my: 0.5, mb: "8px " }} />
                    <FormControl fullWidth sx={{ mr: "6%" }}>
                      <TextField
                        sx={{
                          border: "none",
                          "& fieldset": { border: "none" },
                        }}
                        id="pass"
                        type="password"
                        className="Text_field"
                        data-type="password"
                        name="psd"
                        value={regData.psd}
                        onChange={regInput}
                      />
                    </FormControl>
                  </Box>
                </div>

                <div className="group">
                  <button
                    type="submit"
                    className="button"
                    onClick={(e) => register(e)}
                  >
                    Sign Up
                  </button>
                </div>

                <div className="foot-lnk text-center mt-4">
                  <NavLink to="/">Already Member?</NavLink>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
