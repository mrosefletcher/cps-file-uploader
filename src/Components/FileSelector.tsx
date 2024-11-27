'use client';

import React, { FC, useRef, useState } from 'react';
import { Box, Button, Divider } from "@mui/material";
import UploadToS3 from '../app/S3Uploader';
import { Upload } from '@mui/icons-material';
import * as FileDisplay from './FileDisplay';
import { Header4, Header5 } from '@/app/Theme/Typography';
import * as Colors from '@/app/Theme/Colors';
import * as Section from './Section';
import * as S3Handler from '@/app/get-signed-url'


const USERNAME: string = "1022Demo";

interface Dictionary<T> {
    [key: string]: T
  }

export enum FileStatus {
    staged,
    uploadSuccess,
    uploadFail,
}

interface FileAndStatus {
    file: File;
    status: FileStatus;
}

type FileAndStatusDict =  { [key: string]: FileAndStatus };



const FileSelector: FC = () => {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [reRender, toggleReRender] = useState(true); //use to force a rerender by toggling true/false
    const [fileSet, setFileList]                   = useState<FileAndStatusDict>({} as FileAndStatusDict); 
    const [submitColor, setSubmit]                 = useState(fileSet.size? Colors.BLUE: Colors.GREYED);
    const [fileSelected, setFileSelected]           = useState(false); //use for a 'no file selected' message

    function updateSubmit(){
        console.log(`in update submit: fileList length = ${Object.keys(fileSet).length}`);
        Object.keys(fileSet).length ? (setSubmit(Colors.SUCCESS), setFileSelected(true)) : (setSubmit(Colors.GREYED), setFileSelected(false));
        console.log(`fileSelected==${fileSelected}`);
        toggleReRender(!reRender);
    };

    function handleBrowse(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!inputRef || !inputRef.current) return;
        inputRef.current.click();
    };

    function clearInputValue(e: React.MouseEvent<HTMLInputElement>){
        document.getElementsByTagName('input')[0].value = ""
        updateSubmit();
    }
    function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) { 
        console.log("in fileSelect:");
        const files = e.target.files;
        if (!files) return;
        console.log(files);
        setFileSelected(true);
        for (let i = 0; i < files.length; i++) { //for some reason there are extra values in "files" that aren't included in the length
            let uploadedFile = files[i];
            if (uploadedFile.size >= 5120) { break };
            if (uploadedFile.name in fileSet) { console.log('name already in fileSet'); break }; //file already in set
            fileSet[uploadedFile.name] = {file: uploadedFile, status: FileStatus.staged};
            console.log(`adding ${uploadedFile.name} to fileSet as staged`);
            updateSubmit();
        }
    };


    // function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {

    //     e.preventDefault();
    //     if (!inputRef || !inputRef.current) return;
    //     Object.values(fileSet).forEach((value) => {
    //         UploadToS3(value.file, USERNAME ).then(() => {
    //             value.status = FileStatus.uploadSuccess;
    //             updateSubmit();
    //             }, () => {
    //             console.log(`${value.file.name} failed to upload`);
    //             value.status = FileStatus.uploadFail;
    //             updateSubmit();
    //         }
    //         );
    //     })
    // };

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const {url, fields} = await fetch("http://localhost:8080/get-signed-url").then(response => response.json())
        
        if (!inputRef || !inputRef.current) return;
            Object.values(fileSet).forEach((value) => {  
                //for each file in the upload list:
                value.file, USERNAME

        );       
    }

    function handleRemoveFile(file: File) {
        console.log(`removing ${file.name}`);
        delete fileSet[file.name];
        updateSubmit();
    };

    return (
            <Section.SectionBackground>
                <Section.SectionContent style={{padding: '40px 80px', border: '1px solid black', borderRadius: '3px', height: 'fit-content'}}>
                    <Box style={{display: 'flex', justifyContent: 'center',  width: '100%'}}>
                    <Header4 style={{color: Colors.TEXT.grey, justifySelf: 'center'}}>Upload Files</Header4>
                    </Box>
                    <Box sx={{ mt: 1, display: 'flex' }}> {/* put the buttons in a row*/}
                        <Button variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: Colors.BLUE}} onClick={handleBrowse}>
                            Browse Files
                        </Button>
                        <Button variant="contained" sx={{ mt: 3, mb: 2, ml: 3 }} style={{ backgroundColor: submitColor }} onClick={handleSubmit}>
                            Submit
                            <Upload sx={{paddingLeft: 1}}/>
                        </Button>
                        <input multiple ref={inputRef} type='file' hidden onChange={handleFileSelect} onClick={clearInputValue}/>  
                    </Box>
                    <Divider sx={{width: '100%', margin: '15px 0', borderColor: 'black'}}/>
                    <Header5 style={{color: Colors.TEXT.grey, marginTop: 10, marginBottom: 12, fontStyle: 'italic', display: fileSelected? 'none' : 'block'}}>No files selected</Header5>
                    <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', height: 'fit-content'}}>
                        {Array.from(Object.values(fileSet)).map((item) => ( 
                            <Box key={item.file.name} sx={{display: 'flex', flexDirection: 'column'}}>
                                <FileDisplay.StyledFile status={item.status} filename = {item.file.name} fileSize = {item.file.size}>
                                    <FileDisplay.FileRemoveButton active={item.status === FileStatus.staged} size='16px' onClick={() => handleRemoveFile(item.file)}/>
                                </FileDisplay.StyledFile>                                
                                <p style={{display: item.status===FileStatus.uploadFail? 'block':'none', color: Colors.ERROR, margin: '0 0 0 16px', padding: 0, }}>upload failed: internal server error</p>
                                <Divider sx={{width: '100%', margin: '0'}}/>
                            </Box>
                        ))}
                    </Box>
                </Section.SectionContent>
            </Section.SectionBackground>

    )
};

export default FileSelector;

