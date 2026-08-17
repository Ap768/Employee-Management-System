import { useState } from "react";
import { toast } from "react-toastify";

const SETTINGS_STORAGE_KEY = "ems-settings";

function getInitialSettings() {

    const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);

    if (savedSettings) {

        try {

            return JSON.parse(savedSettings);

        } catch (error) {

            console.error("Unable to read saved settings.", error);

        }

    }

    return {

        username: "",
        email: localStorage.getItem("email") || "",
        theme: "dark",
        notifications: true

    };

}

function Settings() {

    const [settings, setSettings]
    = useState(getInitialSettings);

    // HANDLE INPUT
    function handleChange(e) {

        const { name, value, type, checked } = e.target;

        setSettings((prevSettings) => ({
            ...prevSettings,
            [name]: type === "checkbox" ? checked : value
        }));

    }

    function saveSettings(e) {

        e.preventDefault();

        try {
            localStorage.setItem(
                SETTINGS_STORAGE_KEY,
                JSON.stringify(settings)
            );

            toast.success("Settings saved successfully");
        } catch (error) {
            console.error("Unable to save settings.", error);
            toast.error("Unable to save settings.");
        }

    }

    return(

        <div className="container mt-5">

            <h2>Settings</h2>

            <form onSubmit={saveSettings}>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={settings.username}
                    onChange={handleChange}
                    className="form-control mb-3"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={settings.email}
                    onChange={handleChange}
                    className="form-control mb-3"
                />

                <select
                    name="theme"
                    value={settings.theme}
                    onChange={handleChange}
                    className="form-control mb-3"
                >

                    <option value="dark">
                        Dark
                    </option>

                    <option value="light">
                        Light
                    </option>

                </select>

                <div className="mb-3">

                    <input
                        type="checkbox"
                        name="notifications"
                        checked={
                            settings.notifications
                        }
                        onChange={handleChange}
                    />

                    Notifications

                </div>

                <button
                    className="btn btn-primary"
                    type="submit"
                >

                    Save Settings

                </button>

            </form>

        </div>

    );

}

export default Settings;