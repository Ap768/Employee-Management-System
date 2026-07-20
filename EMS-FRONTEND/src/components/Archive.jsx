import { useEffect, useState } from "react";
import axios from "axios";

function Archive() {

    const [files, setFiles]
    = useState([]);

    useEffect(() => {

        fetchFiles();

    }, []);

    function fetchFiles() {

        axios
            .get("http://localhost:9090/api/archive")

            .then((response) => {

                setFiles(response.data);

            });

    }

    function deleteFile(id) {

        axios
            .delete(
                `http://localhost:9090/api/archive/${id}`
            )

            .then(() => {

                alert("File Deleted");

                fetchFiles();

            });

    }

    function downloadFile(id) {

        window.open(

            `http://localhost:9090/api/archive/download/${id}`

        );

    }

    return (

        <div className="archive-container">

            <h2>Archive Files</h2>

            <table className="table">

                <thead>

                    <tr>

                        <th>File Name</th>
                        <th>Uploaded At</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        files.map((file) => (

                            <tr key={file.id}>

                                <td>
                                    {file.fileName}
                                </td>

                                <td>
                                    {file.uploadedAt}
                                </td>

                                <td>

                                    <button
                                        className="btn btn-success me-2"
                                        onClick={() =>
                                            downloadFile(file.id)
                                        }
                                    >
                                        Download
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            deleteFile(file.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );
}

export default Archive;