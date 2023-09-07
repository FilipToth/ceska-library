import { useRef } from 'react';
import 'assets/DatabaseControlBar.css'
import backend from "services/backend";
import CustomButton from './CustomButton';
import { useAuthHeader } from "react-auth-kit";

const DatabaseControlBar = ({ databaseName }) => {
    const authHeader = useAuthHeader();
    const header = authHeader();
    const token = header.split(' ')[1];

    const downloadFrameRef = useRef();

    const exportDB = async () => {
        const resp = await backend.exportDB(token, 'Books');
        console.log(resp);

        if (!resp.success) {
            return;
        }

        const path = resp.path;
        downloadFrameRef.current.src = path;
    };

    const importDB = async () => {

    };

    return (
        <div class='Database-Control-Wrapper'>
            <iframe style={{ display: 'none' }} ref={downloadFrameRef}></iframe>
            <CustomButton msg={'Export CSV'} onClick={exportDB} />
            <CustomButton msg={'Import CSV'} onClick={importDB} />
        </div>
    )
};

export default DatabaseControlBar;