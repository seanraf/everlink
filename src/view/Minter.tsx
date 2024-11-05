import React from 'react';
import axios from 'axios';
import JSZip from 'jszip';
import Dark from './previews/Dark';
import Light from './previews/Light';
import { Box, Button } from '@mui/material';
import ReactDOMServer from 'react-dom/server';
import { useAuth } from '@crossmint/client-sdk-react-ui';
import { DeploymentRecord, DomainContent, MinterProps } from '@/types';

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
  setDomain,
  setDeploymentLoading,
}: MinterProps) {
  const { user } = useAuth();

  const getHtmlPath = async (retrievedHash: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_TOKEN_ID}/${retrievedHash}`;
      const urlResponse = await axios.get(url);
      const indexHtmlId = urlResponse.data.paths?.['index.html']?.id;

      if (indexHtmlId) {
        return indexHtmlId;
      } else {
        console.error('Index HTML ID not found in response.');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving final URL:', error);
    }
  };

  const pollForDomain = async (
    taskId: string | undefined,
    interval = 8000,
    maxAttempts = 200
  ) => {
    let attempts = 0;
    const poll = setInterval(async () => {
      attempts++;

      try {
        const taskResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_4EVERLAND_HOSTING_BASE_URL}/tasks/${taskId}`,
          {
            headers: {
              token: process.env.NEXT_PUBLIC_TOKEN_ID as string,
            },
          }
        );
        const retrievedHash = taskResponse?.data?.content?.hash;

        if (retrievedHash) {
          clearInterval(poll);
          setDeploymentLoading(false);
          const htmlPath = await getHtmlPath(retrievedHash);
          setDomain(`${process.env.NEXT_PUBLIC_TOKEN_ID}/${htmlPath}`);
        } else if (attempts >= maxAttempts) {
          console.error('Domain not found after maximum attempts');
          clearInterval(poll);
          setDeploymentLoading(false);
        }
      } catch (error) {
        console.error('Error checking task status:', error);
        clearInterval(poll);
        setDeploymentLoading(false);
      }
    }, interval);
  };

  const saveDeploymentData = async (
    content: DomainContent,
    farcasterId: string | undefined
  ) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/deploymentHistory/create`,
        {
          content,
          farcasterId,
        }
      );
      console.log('Deployment data saved successfully');
    } catch (error) {
      console.error('Error saving deployment data:', error);
    }
  };

  const getDeploymentData = async (
    farcasterId: string | undefined
  ): Promise<DeploymentRecord | null> => {
    try {
      const response = await axios.get<{ records: DeploymentRecord[] }>(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/deploymentHistory/user/${farcasterId}`
      );

      const deploymentRecords = response.data.records;

      if (deploymentRecords && deploymentRecords.length > 0) {
        const latestDeployment = deploymentRecords.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0];
        return latestDeployment;
      } else {
        console.error('No deployment records found.');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving deployment data:', error);
      return null;
    }
  };

  const uploadHTMLFile = async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', process.env.NEXT_PUBLIC_PROJECT_ID as string);

    setDeploymentLoading(true);

    try {
      const uploadResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_4EVERLAND_HOSTING_BASE_URL}/deploy`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: process.env.NEXT_PUBLIC_TOKEN_ID as string,
          },
        }
      );

      const content = uploadResponse?.data?.content;
      const farcasterId = user?.farcaster?.fid;

      await saveDeploymentData(content, farcasterId);

      const latestDeployment = await getDeploymentData(farcasterId);
      const taskId = latestDeployment?.taskId;

      await pollForDomain(taskId);
    } catch (error) {
      console.error('Error uploading file:', error);
      setDeploymentLoading(false);
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
