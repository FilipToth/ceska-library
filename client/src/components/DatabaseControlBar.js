import { useRef } from 'react';
import 'assets/DatabaseControlBar.css'
import backend from "services/backend";
import CustomButton from './CustomButton';
import { useAuthHeader } from "react-auth-kit";

const DatabaseControlBar = ({ databaseName, popupFunction }) => {
    const authHeader = useAuthHeader();
    const header = authHeader();
    const token = header.split(' ')[1];

    const downloadFrameRef = useRef();
    const fileInputRef = useRef();

    const exportDB = async () => {
        const resp = await backend.exportDB(token, databaseName);
        console.log(resp);

        if (!resp.success) {
            popupFunction('Failed', 2000, true);
            return;
        }

        const path = resp.path;
        downloadFrameRef.current.src = path;
    };

    const importButtonClick = async () => {
        fileInputRef.current.click();
    };

    const importDBHandleFile = async (e) => {
        const file = e.target.files[0];
        if (file == undefined) {
            popupFunction('No file selected.', 2000, true);
            return;
        }
        
        // TODO: JWT and security
        backend.uploadDBFile(token, file);
    };

    return (
        <div class='Database-Control-Wrapper'>
            <iframe style={{ display: 'none' }} ref={downloadFrameRef}></iframe>
            <CustomButton msg={'Export CSV'} onClick={exportDB} />
            <CustomButton msg={'Import CSV'} onClick={importButtonClick} />
            <input type='file' onChange={importDBHandleFile} style={{ display: 'none' }} ref={fileInputRef} />
        </div>
    )
};

export default DatabaseControlBar;