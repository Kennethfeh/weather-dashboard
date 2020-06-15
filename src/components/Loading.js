import React from 'react';
import styled, { keyframes } from 'styled-components';
import Loader from 'react-loader-spinner';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #667eea;
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  font-size: 1.1rem;
  color: #666;
`;

const Loading = ({ message = 'Loading weather data...' }) => {
  return (
    <LoadingContainer>
      <Loader
        type="TailSpin"
        color="#667eea"
        height={60}
        width={60}
      />
      <LoadingText>{message}</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;