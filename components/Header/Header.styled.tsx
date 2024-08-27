import styled, { css } from 'styled-components';

import { Container, Typography } from '@mui/material';

export const Box = styled(Container)`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFF;
    paddng: 0 20px;
    height: 64px;
  `}
`;

export const MenuWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: #FFF;
  `}
`;

export const Title = styled(Typography)`
  ${({ theme }) => css`
    font-size: 24px;
    font-weight: bold;
    color: #005A9C;
  `}
`;