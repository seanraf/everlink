'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import styled from '@emotion/styled';
import { StepConnector } from '@mui/material';

const steps = ['1', '2', '3'];

export default function LinearStepper({ activeStep }: { activeStep: number }) {
  const CustomConnector = styled(StepConnector)(({ theme }) => ({
    [`& .MuiStepConnector-line`]: {
      transition: 'border-color 0.3s ease',
      borderColor: 'grey',
    },
  }));

  const getConnectorStyles = (index: number) => {
    if (index === 0) {
      return { borderColor: 'blue' };
    }
    if (index === 1) {
      return { borderColor: 'green' };
    }
    return {};
  };
  return (
    <Box sx={{ width: '60%', mx: 'auto' }}>
      <Stepper activeStep={activeStep} connector={<CustomConnector />}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel
                {...labelProps}
                sx={{
                  '& .MuiStepIcon-root': {
                    color: index === activeStep ? 'blue' : 'grey',
                    '&.Mui-completed': {
                      color: 'green',
                    },
                    '&.Mui-active': {
                      color: 'blue',
                    },
                  },
                }}
                StepIconProps={{
                  style: getConnectorStyles(index),
                }}
              ></StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
