import React, {useState} from 'react';
import { FaFileAlt, FaDownload, FaSpinner } from 'react-icons/fa';
import './DocumentCard.css';

const DocumentCard = ({ file}) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const downloadDocument = () => {
        setIsDownloading(true);

        // Simulate a download delay for demonstration (can be replaced with actual download logic)
            if(file.st)
                return 
            const link = document.createElement('a');
            link.href = `http://localhost:3005/api/forum-file/${file.id}`;
            link.download = file.fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setIsDownloading(false);
        ; // Simulate a 1-second delay
    };

    return (
        <>
        <div key={file.fileName} className="bg-body-secondary py-2 document-card">
            <div className="document-content">
                <div className="doc-icon">
                    <FaFileAlt size={40} color="#4a90e2" />
                </div>
                <div className="doc-info">
                    <p className="doc-name overflow-hidden">{file.fileName}</p>
                    <p className="doc-size text-muted">{file.size} mb</p>
                </div>
                <div className="doc-action">
                    <button 
                        className="btn btn-link text-primary" 
                        onClick={downloadDocument}
                        disabled={isDownloading}
                    >
                        {isDownloading ? <FaSpinner className="spinner" /> : <FaDownload size={20} />}
                    </button>
                </div>
            </div>
        </div>
    </>
    );
};

export {DocumentCard};
