import styled from 'styled-components';

export const Container = styled.div`
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

export const WelcomeText = styled.h1``;

export const WelcomeButton = styled.button`
    margin-top: 24px;
    background-color: #6f96ff;
    color: white;
    border: none;
    height: 48px;
    width: 220px;
    border-radius: 4px;

    &:hover {
        background-color: #5d88fe;
    }
`;
