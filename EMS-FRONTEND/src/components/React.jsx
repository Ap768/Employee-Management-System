import { useEffect, useState } from "react";
import axios from "axios";

function Settings() {

    const [settings, setSettings]
    = useState({

        username: "",
        email: "",
        theme: "dark",
        notifications: true

    });

    // LOAD SETTINGS
    useEffect(() => {

        axios
            .get(
                "http://localhost:9090/api/settings/1"
            )

            .then((response) => {

                if(response.data){

                    setSettings(response.data);

                }

            })

            .catch((error) => {

                console.log(error);

            });

    }, []);

    // HANDLE INPUT
    function handleChange(e){

        const { name, value, type, checked }
        = e.target;

        setSettings({

            ...settings,

            [name]:
                type === "checkbox"
                ? checked
                : value

        });

    }

    // SAVE SETTINGS
    function saveSettings(e){

        e.preventDefault();

        axios
            .post(
                "http://localhost:9090/api/settings",
                settings
            )

            .then(() => {

                alert(
                    "Settings Saved Successfully"
                );

            })

            .catch((error) => {

                console.log(error);

            });

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