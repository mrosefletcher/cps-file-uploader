import React, { useRef, useState } from 'react';
import './borrowedcss.css';



const DropFileInput = () => {

    const wrapperRef = useRef<HTMLInputElement | null>(null);

    const [fileList, setFileList] = useState([] as File[]);

    const onDragEnter = () => {
        if (wrapperRef && wrapperRef.current){
            wrapperRef.current.classList.add('dragover');
        }
    };
    const onDragLeave = () => {
        if (wrapperRef && wrapperRef.current){
            wrapperRef.current.classList.remove('dragover');
        }
    };
    const onDrop = () => {
        if (wrapperRef && wrapperRef.current){
            wrapperRef.current.classList.remove('dragover');
        }
    };

    const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
            const updatedList = [...fileList, files[0]];
            setFileList(updatedList);
            console.log(updatedList);
    }

    const fileRemove = (file: File) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
    }

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={"https://media.geeksforgeeks.org/wp-content/uploads/20240308113922/Drag-.png"}
                        alt="" />
                    <p>Drag & Drop your files here</p>
                </div>
                <input type="file" value="" onChange={onFileDrop} />
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Ready to upload
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    
                                    <div className="drop-file-preview__item__info">
                                        <p>{item.name}</p>
                                        <p>{item.size}B</p>
                                    </div>
                                    <span className="drop-file-preview__item__del"
                                        onClick={() => fileRemove(item)}>
                                        x
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </>
    );
}

export default DropFileInput;