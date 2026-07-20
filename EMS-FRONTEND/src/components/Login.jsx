import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({
    setIsLoggedIn,
    setRole
}) {

    const navigate = useNavigate();

    // USER STATE
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    // FORGOT PASSWORD STATE
    const [forgotPassword, setForgotPassword]
        = useState(false);

    const [resetEmail, setResetEmail]
        = useState("");

    // OTP STATE
    const [showOtpBox, setShowOtpBox]
        = useState(false);

    const [otp, setOtp]
        = useState("");

    // HANDLE INPUT CHANGE
    function handleChange(e) {

        setUser({

            ...user,

            [e.target.name]:
                e.target.value

        });

    }

    // LOGIN FUNCTION
    function login(e) {

        e.preventDefault();

        // VALIDATION
        if (
            !user.email ||
            !user.password
        ) {

            alert(
                "Please enter email and password"
            );

            return;

        }

        axios.post(

            "http://localhost:9090/api/users/login",

            user

        )

            .then((response) => {

                console.log(response.data);

                // OTP SENT
                if (response.data === "OTP_SENT") {

                    alert("OTP Sent To Your Email");

                    setShowOtpBox(true);

                }

            })

            .catch((error) => {

    console.log(error);

    if (error.response) {
        alert(error.response.data);
    } else {
        alert(error.message);
    }

});

    }

    // VERIFY OTP
    function verifyOtp() {

        if (!otp) {

            alert("Please enter OTP");

            return;

        }

        axios.post(

            "http://localhost:9090/api/users/verify-otp",

            {

                email: user.email,

                otp: otp

            }

        )

            .then((response) => {

                const loggedInUser =
                    response.data;

                // CONVERT ROLE TO UPPERCASE AND NORMALIZE
                const rawRole =
                    String(loggedInUser.role || "");
                const userRole = rawRole
                    .toUpperCase()
                    .replace(/^ROLE_/, "");

                // SAVE ROLE
                localStorage.setItem(
                    "role",
                    userRole
                );

                // SAVE EMAIL
                localStorage.setItem(
                    "email",
                    loggedInUser.email
                );

                // SET ROLE
                setRole(userRole);

                // LOGIN SUCCESS
                setIsLoggedIn(true);

                alert("Login Successful");

                navigate("/dashboard");

            })

            .catch((error) => {

                console.log(error);

                alert("Invalid OTP");

            });

    }

    // FORGOT PASSWORD
    function sendResetLink(e) {

        e.preventDefault();

        if (!resetEmail) {

            alert(
                "Please enter your email address"
            );

            return;

        }

        axios

            .post(

                "http://localhost:9090/api/users/forgot-password",

                {
                    email: resetEmail
                }

            )

            .then((response) => {

                alert(

                    response.data ||

                    "If your email exists, a recovery link has been sent."

                );

                setResetEmail("");

                setForgotPassword(false);

            })

            .catch((error) => {

                console.log(error);

                alert(

                    "Unable to send reset link right now."

                );

            });

    }

    return (

        <div className="login-card">

            <div className="login-brand">

                <div className="brand-eyebrow">
                    EMS
                </div>

                <h1 className="brand-title">
                    EMPLOYMENT MANAGEMENT SYSTEM
                </h1>

                <p className="brand-copy">
                    Secure employee management for HR, admin, and team workflows.
                </p>

            </div>

            <div className="login-panel text-start">

                <h2 className="section-title">

                    Welcome back

                </h2>

                <p className="section-copy mb-4">
                    Sign in with your workspace account to manage employees.
                </p>

                {

                    forgotPassword ? (

                        <form onSubmit={sendResetLink}>

                            <div className="mb-3">

                                <input

                                    id="resetEmail"

                                    type="email"

                                    name="resetEmail"

                                    placeholder="Email address"

                                    value={resetEmail}

                                    onChange={(e) =>

                                        setResetEmail(
                                            e.target.value
                                        )

                                    }

                                    className=
                                    "form-control form-control-lg"

                                />

                            </div>

                            <button

                                type="submit"

                                className=
                                "btn btn-primary btn-lg w-100"

                            >

                                Send reset link

                            </button>

                            <div className="mt-3 text-center">

                                <button

                                    type="button"

                                    className=
                                    "btn btn-link text-decoration-none"

                                    onClick={() =>

                                        setForgotPassword(false)

                                    }

                                >

                                    Back to login

                                </button>

                            </div>

                        </form>

                    ) : (

                        <form onSubmit={login}>

                            {/* EMAIL */}

                            <div className="mb-3">

                                <input

                                    id="loginEmail"

                                    type="email"

                                    name="email"

                                    placeholder="Email address"

                                    value={user.email}

                                    onChange={handleChange}

                                    className="form-control form-control-lg"

                                />

                            </div>

                            {/* PASSWORD */}

                            <div className="mb-3">

                                <input

                                    id="loginPassword"

                                    type="password"

                                    name="password"

                                    placeholder="Password"

                                    value={user.password}

                                    onChange={handleChange}

                                    className="form-control form-control-lg"

                                />

                            </div>

                            {/* OTP INPUT */}

                            {

                                showOtpBox && (

                                    <div className="mb-3">

                                        <input

                                            type="text"

                                            placeholder="Enter OTP"

                                            value={otp}

                                            onChange={(e) =>

                                                setOtp(e.target.value)

                                            }

                                            className="form-control form-control-lg"

                                        />

                                    </div>

                                )

                            }

                            {/* SIGN IN BUTTON */}

                            <button

                                type="submit"

                                className="btn btn-primary btn-lg w-100"

                            >

                                Sign in

                            </button>

                            {/* VERIFY OTP BUTTON */}

                            {

                                showOtpBox && (

                                    <button

                                        type="button"

                                        className="btn btn-success btn-lg w-100 mt-3"

                                        onClick={verifyOtp}

                                    >

                                        Verify OTP

                                    </button>

                                )

                            }

                            {/* FORGOT PASSWORD */}

                            <div className="mt-3 text-center">

                                <button

                                    type="button"

                                    className="btn btn-link text-decoration-none"

                                    onClick={() => setForgotPassword(true)}

                                >

                                    Forgot password?

                                </button>

                            </div>

                        </form>

                    )

                }

            </div>

        </div>

    );

}

export default Login;