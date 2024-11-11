import {Check, Clear, FilePresent, DeleteForever} from '@mui/icons-material';
import styled from '@emotion/styled';
import React, {useState} from 'react';
import { ERROR, SUCCESS, GREYED } from '@/app/Theme/Colors';
import { DivFlexRow } from './Section';
import {FileStatus} from './FileSelector'


export const StyledFilename = styled.div({
    display: 'flex',
    fontSize: '17px',
    backgroundColor: 'white',
    padding: '0 10px ',
    width: 'fit-content'
})

export const SizeDisplay = styled.div({
    fontSize: '17px',
    padding: '0 5px',
    color: GREYED
});

export const StyledX = styled(Clear)({
    color: ERROR, 
    
})


export const StyledCheck = styled(Check)({
    color: SUCCESS, 
    alignSelf: 'center',
    justifySelf: 'right'
});

const StatusIcon: React.FC<{toggle: FileStatus}> = ({toggle}) => {
    const commonStyles = {};
    if (toggle === FileStatus.uploadFail) {
        return <StyledX style={{marginLeft: 'auto'}}/>;
    } else if (toggle === FileStatus.uploadSuccess) {
        return <StyledCheck style={{marginLeft: 'auto'}}/>;
    } else {
        return <></>
    };
}

const TooltipSlotProps = {
    popper: { 
        modifiers: [{
            name: 'offset',
            options: {
                offset: [0, -14],
                Margin:  3,
            },
        },],
    }
}

interface ButtonProps {
    children?: React.ReactNode;
    onClick: () => void;
    active: boolean;
    size: string;
  }
  
export const FileRemoveButton: React.FC<ButtonProps> = ({ 
      children,
      onClick, 
      active,
      size
    }) => { 
    const [bg, setBg] = useState('transparent');
    const baseButtonStyle = {
        minWidth: '5px', width: size, 
        minHeight: '5px', height: size, 
        padding:'0px', 
        alignSelf: 'flex-start',
        border: 'none',
        backgroundColor: bg,
    };
    return (
            <button 
                onClick={onClick}
                onMouseOver={() => setBg('lightgrey')}
                onMouseOut={() => setBg('transparent')}
                style={baseButtonStyle}>
                <DeleteForever style={{color: ERROR, height: '100%',width: '100%',}}/>
            </button>
    )
};

interface StyledFileProps {
    children?: React.ReactNode;
    filename: string;
    fileSize: number;
    status: FileStatus;
  }

export const StyledFile: React.FC<StyledFileProps> = ({ 
    children,
    filename,
    fileSize, 
    status, 
    }) => {  

        return (
            <>
            <DivFlexRow>
                {children}
                <FilePresent/>
                <StyledFilename> {filename} </StyledFilename>
                <SizeDisplay> {fileSize} Bytes</SizeDisplay>
                <StatusIcon toggle = {status}/>
            </DivFlexRow>
            </>

        );
    }
