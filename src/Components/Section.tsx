import styled from '@emotion/styled';
import React, {FC} from 'react';
import * as Colors from '@/app/Theme/Colors';

export const MAX_CONTENT_WIDTH = 1200;
export const SECTION_PADDING = '80px 40px';
export const BREAKPOINTS = { sm: '600px', md: '900px', lg: '1000px', xl: '1200px' };

export const SectionBackground= styled.div({
    boxSizing: 'border-box',
    display: 'block',
    padding: SECTION_PADDING,
    backgroundColor: Colors.YELLOW,
});

export const SectionContent= styled.div({
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    padding: '40px',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 'fit-content',
    maxWidth: MAX_CONTENT_WIDTH,
    backgroundColor: 'white',
});

export const DivFlexRow = styled.div({
    display: 'flex',
    width: '100%',
    margin: 0
});