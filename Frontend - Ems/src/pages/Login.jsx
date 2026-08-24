import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { AUTH_TOKEN_KEY } from "../api/axios";
import { normalizeRole } from "../utils/roleUtils";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

function Login({
    setIsLoggedIn,
    setRole
}) {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [forgotPassword, setForgotPassword]
        = useState(false);

    const [resetEmail, setResetEmail]
        = useState("");

    const [showOtpBox, setShowOtpBox]
        = useState(false);

    const [otp, setOtp]
        = useState("");

    const [isSubmitting, setIsSubmitting]
        = useState(false);

    function getErrorMessage(error, fallback) {
        const status = error.response?.status;
        const responseMessage = error.response?.data?.message;

        if (responseMessage) return responseMessage;
        if (typeof error.response?.data === "string") return error.response.data;
        if (status === 400) return "The email, password, or OTP format is invalid.";
        if (status === 401) return "The credentials or OTP are incorrect.";
        if (status === 403) return "You are not allowed to perform this action.";
        if (status === 404) return "The authentication service endpoint was not found.";
        if (status >= 500) return "The server could not process the request. Try again later.";
        if (!error.response) return "The server is unavailable. Check that the backend is running.";
        return fallback;
    }

    function handleChange(e) {

        setUser({

            ...user,

            [e.target.name]:
                e.target.value

        });

    }

    function login(e) {

        e.preventDefault();

        if (showOtpBox || isSubmitting) return;

        const email = user.email.trim();

        if (
            !email ||
            !user.password
        ) {

            alert(
                "Please enter email and password"
            );

            return;

        }

        setIsSubmitting(true);

        api.post("/users/login", {
            email,
            password: user.password
        }, {
            headers: { "Content-Type": "application/json" }
        })

            .then((response) => {

                // OTP SENT
                if (response.data === "OTP_SENT") {

                    alert("OTP Sent To Your Email");

                    setShowOtpBox(true);

                } else {
                    alert("Login was not completed. The server did not request OTP verification.");

                }

            })

            .catch((error) => {

                alert(getErrorMessage(error, "Login failed."));

            })
            .finally(() => setIsSubmitting(false));

    }

    // VERIFY OTP
   function verifyOtp() {

    if (!otp) {

        alert("Please enter OTP");

        return;

    }

    setIsSubmitting(true);

    api.post("/users/verify-otp", {
        email: user.email.trim(),
        otp: otp.trim()
    }, {
        headers: { "Content-Type": "application/json" }
    })

    .then((response) => {

        const loggedInUser = response.data;
        const token = loggedInUser?.token || loggedInUser?.jwt || loggedInUser?.accessToken;

        if (!token) {
            throw new Error("The server did not return a JWT token.");
        }

        // Normalize role
        const userRole = normalizeRole(loggedInUser.role);

        if (!["ADMIN", "HR", "EMPLOYEE"].includes(userRole)) {
            throw new Error("The server returned an unsupported user role.");
        }

        localStorage.setItem(AUTH_TOKEN_KEY, token);
        localStorage.setItem("role", userRole);

        // Save email
        // If backend doesn't return email, use the email entered in the login form
        localStorage.setItem(
            "email",
            loggedInUser.email || user.email
        );

        setRole(userRole);
        setIsLoggedIn(true);

        alert("Login Successful");

        navigate("/dashboard");

    })

    .catch((error) => {

        alert(error.message === "The server did not return a JWT token."
            ? "OTP was accepted, but the server did not return a JWT token."
            : getErrorMessage(error, "OTP verification failed."));

    })
    .finally(() => setIsSubmitting(false));

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

        api

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

                alert(getErrorMessage(error, "Unable to send reset link right now."));

            });

    }

    return (

        <div className="login-page">

            <section className="login-aside">
                <div className="login-aside-mark">EMS</div>
                <p className="eyebrow">People operations, simplified</p>
                <h1>Everything your team needs to move work forward.</h1>
                <p>Bring people, attendance, leave, and workforce decisions into one focused workspace.</p>
                <div className="login-aside-note">
                    <ShieldCheck size={18} aria-hidden="true" />
                    <span>Secure access for every role and workflow</span>
                    <ArrowUpRight size={17} aria-hidden="true" />
                </div>
            </section>

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

                                    className="form-control form-control-lg"

                                />

                            </div>

                            <button

                                type="submit"

                                className="btn btn-primary btn-lg w-100"

                            >

                                Send reset link

                            </button>

                            <div className="mt-3 text-center">

                                <button

                                    type="button"

                                    className="btn btn-link text-decoration-none"

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

    </div>

    );

}

export default Login;