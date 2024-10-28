'use client';
import React, { useState } from 'react';
import { Box, Grid2, Typography } from '@mui/material';
import LinearStepper from '@/components/LinearStepper';
import Form from './Form';
import { UrlButton } from '@/types';
import SelectTheme from './SelectTheme';
import Dark from './previews/Dark';
import Light from './previews/Light';
import ThankYou from './ThankYou';

const styles = {
  mainBox: {
    display: 'flex',
    flexDirection: 'column',
    mx: 'auto',
    mt: '74px',
    bgcolor: 'primary.contrastText',
    p: { md: '40px 24px', xs: '24px 16px' },
    borderRadius: 3,
    boxShadow: '0px 4.03px 12.89px 0px #080F340F',
  },
  stepperBox: { borderBottom: '1px solid #D9DBE9', pb: 2, mb: 3 },
  previewBox: {
    width: { md: '90%', sm: '75%', xs: '90%' },
    mx: 'auto',
    display: 'flex',
  },
};

export default function EverlinkPages() {
  const [activeStep, setActiveStep] = useState(0);
  const [userName, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [analyticsTag, setAnalyticsTag] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [urlButtons, setUrlButtons] = useState<UrlButton[]>([
    { id: '1', title: '', url: '' },
  ]);

  const renderThemePreview = () => {
    switch (selectedTheme) {
      case 'Dark Theme':
        return <Dark userName={userName} bio={bio} urlButtons={urlButtons} />;
      case 'Light Theme':
        return <Light userName={userName} bio={bio} urlButtons={urlButtons} />;
      default:
        return (
          <Typography m={'auto'} color='secondary.contrastText'>
            No Template Selected For Preview
          </Typography>
        );
    }
  };

  return (
    <Box bgcolor={'#F9FAFB'}>
      <Grid2
        container
        mx={'auto'}
        width={{ md: '85%', xs: '100%' }}
        display={activeStep === 0 || activeStep === 1 ? 'flex' : 'none'}
      >
        <Grid2
          size={{ md: activeStep === 0 ? 12 : 7.5, xs: 12 }}
          mx={activeStep === 0 ? 'auto' : 'unset'}
        >
          <Box
            sx={{
              width: {
                md: activeStep === 0 ? '50%' : '85%',
                sm: '70%',
                xs: '85%',
              },
              ...styles.mainBox,
            }}
          >
            {' '}
            <Box sx={styles.stepperBox}>
              <LinearStepper activeStep={activeStep} />
            </Box>
            {(() => {
              switch (activeStep) {
                case 0:
                  return (
                    <Form
                      userName={userName}
                      setUserName={setUserName}
                      bio={bio}
                      setBio={setBio}
                      setActiveStep={setActiveStep}
                      analyticsTag={analyticsTag}
                      setAnalyticsTag={setAnalyticsTag}
                      urlButtons={urlButtons}
                      setUrlButtons={setUrlButtons}
                    />
                  );
                case 1:
                  return (
                    <SelectTheme
                      setSelectedTheme={setSelectedTheme}
                      selectedTheme={selectedTheme}
                      setActiveStep={setActiveStep}
                    />
                  );
                default:
                  return null;
              }
            })()}
          </Box>
        </Grid2>
        <Grid2
          size={{ md: 4.5, xs: 12 }}
          sx={{
            display: activeStep === 0 ? 'none' : 'flex',
            px: { md: 3, xs: 'unset' },
            py: '74px',

            justifyContent: 'center',
          }}
        >
          <Box sx={styles.previewBox}>{renderThemePreview()}</Box>
        </Grid2>
      </Grid2>
      <Box display={activeStep === 2 ? 'flex' : 'none'}>
        <ThankYou />
      </Box>
    </Box>
  );
}
