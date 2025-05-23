import React from 'react';
import axios from 'axios';
import JSZip from 'jszip';
import Dark from './previews/Dark';
import Light from './previews/Light';
import { Box, Button } from '@mui/material';
import ReactDOMServer from 'react-dom/server';
import { useAuth } from '@crossmint/client-sdk-react-ui';
import { DomainContent, UploaderProps } from '@/types';
import { useFrameContext } from '@/providers/FarcasterContextProvider';

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

export default function Uploader({
  setActiveStep,
  selectedTheme,
  userName,
  bio,
  urlButtons,
  setDeploymentTaskId,
  setSnackbar,
  setLoading,
}: UploaderProps) {
  const { user } = useAuth();
  const { context } = useFrameContext();
  const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE_URL as string;
  const everlandHostingBase = process.env
    .NEXT_PUBLIC_4EVERLAND_HOSTING_BASE_URL as string;
  const everlandTokenId = process.env.NEXT_PUBLIC_TOKEN_ID as string;
  const everlandProjectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
  const frontendBaseUrl = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL as string;
  const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL as string;
  const shortIoUrl = process.env.NEXT_PUBLIC_SHORT_IO_BASE_URL as string;
  const domain = process.env.NEXT_PUBLIC_DOMAIN as string;
  const apiKey = process.env.NEXT_PUBLIC_SHORT_IO_API_KEY as string;

  const saveDeploymentData = async (
    content: DomainContent,
    farcasterId: string | number | undefined
  ) => {
    if (!farcasterId) {
      setSnackbar({
        open: true,
        message: 'Authentication Failed. Please try again.',
        severity: 'error',
      });
      setTimeout(() => (window.location.href = '/'), 1000);
      return;
    }
    try {
      const response = await axios.post(
        `${backendBase}/api/deploymentHistory/create`,
        {
          content,
          farcasterId,
        }
      );
      return response;
    } catch (error) {
      console.error('Error saving deployment data:', error);
    }
  };

  const generateCustomURL = async (taskId: string) => {
    if (!taskId) {
      return;
    }

    try {
      const response = await axios.post(
        shortIoUrl,
        {
          originalURL: `${frontendBaseUrl}/${taskId}`,
          domain,
        },
        {
          headers: {
            authorization: apiKey,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  const saveDomainData = async (
    taskId: string,
    latestLink: string,
    shortIoId: string
  ) => {
    if (!taskId || !latestLink || !shortIoId) {
      setSnackbar({
        open: true,
        message: 'Oops! Something went wrong. Please try again.',
        severity: 'error',
      });
      setTimeout(() => (window.location.href = '/'), 1000);
      return;
    }

    try {
      await axios.put(`${backendBaseUrl}/api/deploymentHistory/${taskId}`, {
        customUrl: latestLink,
        shortUrlId: shortIoId,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error saving domain data:', error);
      setSnackbar({
        open: true,
        message: 'Server Error. Please try again.',
        severity: 'error',
      });
      setTimeout(() => (window.location.href = '/'), 1000);
    }
  };

  const uploadHTMLFile = async (file: Blob) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', everlandProjectId);

    try {
      const uploadResponse = await axios.post(
        `${everlandHostingBase}/deploy`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: everlandTokenId,
          },
        }
      );

      const content = uploadResponse?.data?.content;
      const taskId = content?.taskId;
      setDeploymentTaskId(taskId);
      const farcasterId = user?.farcaster?.fid ?? context?.user?.fid;
      await saveDeploymentData(content, farcasterId);
      const customUrlData = await generateCustomURL(taskId);
      await saveDomainData(
        taskId,
        customUrlData?.shortURL,
        customUrlData?.idString
      );
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
            <meta name="viewport" content="width=device-width, initial-scale=1.0">         
            <style>
              body { width: 90%; margin-left:auto; margin-right:auto }
              @media (min-width: 768px) and (max-width: 1024px) {
                body {
                  width: 60%;
                }
              }
              @media (min-width: 1024px) {
                body {
                  width: 30%;
                }
              }
              div {
                box-sizing: border-box;
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

  const handleBack = () => setActiveStep(0);
  const handleMint = async () => {
    setLoading(true);
    await handleMintData();
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
        Next
      </Button>
    </Box>
  );
}
