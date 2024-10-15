'use client';
import React, { useState } from 'react';
import { Box, Grid2 } from '@mui/material';
import LinearStepper from '@/components/LinearStepper';

export default function EverlinkPages() {
  const [activeStep, setActiveStep] = useState(0);
  const [userName, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [analyticsTag, setAnalyticsTag] = useState('');
  const stepFirst = activeStep === 0;
  return (
    <>
      <Grid2
        container
        mx={'auto'}
        width={{ md: '85%', xs: '100%' }}
        bgcolor={'#F9FAFB'}
      >
        <Grid2
          size={{ md: activeStep === 0 ? 12 : 7, xs: 12 }}
          mx={activeStep === 0 ? 'auto' : 'unset'}
        >
          <Box
            sx={{
              width: {
                md: activeStep === 0 ? '50%' : '85%',
                sm: '70%',
                xs: '85%',
              },
              display: 'flex',
              flexDirection: 'column',
              mx: 'auto',
              bgcolor: 'primary.contrastText',
              p: { md: '40px 24px', xs: '24px 16px' },
              borderRadius: 3,
              boxShadow: '0px 4.03px 12.89px 0px #080F340F',
            }}
          >
            {' '}
            <Box sx={{ borderBottom: '1px solid #D9DBE9', pb: 2, mb: 3 }}>
              <LinearStepper activeStep={activeStep} />
            </Box>
            {activeStep === 0 ? (
              <>
                <h1>Form</h1>
              </>
            ) : (
              <h1>Select Theme</h1>
            )}
          </Box>
        </Grid2>
        <Grid2
          size={{ md: 5, xs: 12 }}
          sx={{ display: activeStep === 0 ? 'none' : 'flex', p: 3 }}
        >
          <Box>
            <h1>Preview</h1>
            <h2>{userName}</h2>
            <h2>{bio}</h2>
            <h2>{analyticsTag}</h2>
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
}
