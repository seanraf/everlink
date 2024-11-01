import React from 'react';
import Dark from './previews/Dark';
import Light from './previews/Light';
import { Box, Button } from '@mui/material';
import ReactDOMServer from 'react-dom/server';
import { MinterProps } from '@/types';
import axios from 'axios';
import JSZip from 'jszip';

const styles = {
  title: {
    fontSize: { md: 18, xs: 16 },
    fontWeight: 700,
    color: 'text.primary',
  },
  tagline: {
    fontSize: { md: 14, xs: 13 },
    color: 'secondary.contrastText',
    fontWeight: 500,
  },
  themeName: {
    fontWeight: 500,
    mb: 1,
    fontSize: { md: '16px', xs: '14px' },
  },
  buttonsBox: { display: 'flex', gap: 3, mt: 4 },
  buttons: {
    flex: 1,
    borderColor: 'secondary.main',
    borderRadius: '8px',
    fontWeight: 'bold',
    py: { md: 1.75, xs: 1 },
  },
};

export default function Minter({
  setActiveStep,
  selectedTheme,
  userName,
  bio,
  urlButtons,
}: MinterProps) {
  const uploadHTMLFile = async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', process.env.NEXT_PUBLIC_PROJECT_ID as string);

    try {
      const uploadResponse = await axios.post(
        'https://hosting.api.4everland.org/deploy',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: process.env.NEXT_PUBLIC_TOKEN_ID as string,
          },
        }
      );
      console.log('Response:', uploadResponse);

      const taskId = uploadResponse?.data?.content?.taskId;

      if (taskId) {
        const taskResponse = await axios.get(
          `https://hosting.api.4everland.org/tasks/${taskId}`,
          {
            headers: {
              token: process.env.NEXT_PUBLIC_TOKEN_ID as string,
            },
          }
        );
        console.log('taskResponse', taskResponse);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleMintData = async () => {
    let themeComponent;

    switch (selectedTheme) {
      case 'Dark Theme':
        themeComponent = (
          <Dark userName={userName} bio={bio} urlButtons={urlButtons} />
        );
        break;
      case 'Light Theme':
        themeComponent = (
          <Light userName={userName} bio={bio} urlButtons={urlButtons} />
        );
        break;
      default:
        return null;
    }

    const themeHTML = ReactDOMServer.renderToString(themeComponent);

    const fullHtml = `
        <!DOCTYPE html>
        <html>
          <head>      
            <style>
              body { width: 90%; margin-left:auto; margin-right:auto }
                @media (min-width: 768px) {
                  body { width: 50%; }
                }
            </style>
          </head>
          <body>
            <div>${themeHTML}</div>
          </body>
        </html>`;

    const blob = new Blob([fullHtml], { type: 'text/html' });

    const zip = new JSZip();
    zip.file('index.html', blob);

    const zipBlob = await zip.generateAsync({ type: 'blob' });

    uploadHTMLFile(zipBlob);
  };

  const handleBack = () => {
    setActiveStep(0);
  };

  const handleMint = () => {
    handleMintData();
    setActiveStep(2);
  };

  return (
    <Box sx={styles.buttonsBox}>
      <Button
        sx={{
          ...styles.buttons,
          color: 'secondary.main',
        }}
        variant='outlined'
        onClick={handleBack}
      >
        Back
      </Button>
      <Button
        sx={{
          ...styles.buttons,
          bgcolor: 'secondary.main',
          color: 'primary.contrastText',
        }}
        variant='outlined'
        onClick={handleMint}
      >
        Mint
      </Button>
    </Box>
  );
}
