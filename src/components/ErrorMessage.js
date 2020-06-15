import React from 'react';
import styled from 'styled-components';
import { FiAlertCircle } from 'react-icons/fi';

const ErrorContainer = styled.div`
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 10px;
  padding: 1.5rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  svg {
    color: #e53e3e;
    font-size: 1.5rem;
    flex-shrink: 0;
  }
`;

const ErrorText = styled.div`
  color: #742a2a;
  
  h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
  }
  
  p {
    margin: 0;
    font-size: 0.95rem;
    opacity: 0.9;
  }
`;

const ErrorMessage = ({ title = 'Error', message }) => {
  return (
    <ErrorContainer>
      <FiAlertCircle />
      <ErrorText>
        <h4>{title}</h4>
        <p>{message}</p>
      </ErrorText>
    </ErrorContainer>
  );
};

export default ErrorMessage;