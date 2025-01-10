'use client';
import React, { useEffect, useState } from 'react';
import ThankYou from '@/view/ThankYou';
import axios from 'axios';
import { useAuth } from '@crossmint/client-sdk-react-ui';

export default function Page() {
  const { user } = useAuth();
  const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL as string;
  const frontendBaseUrl = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL as string;
  const shortIoUrl = process.env.NEXT_PUBLIC_SHORT_IO_BASE_URL as string;
  const domain = process.env.NEXT_PUBLIC_DOMAIN as string;
  const apiKey = process.env.NEXT_PUBLIC_SHORT_IO_API_KEY as string;
  const farcasterId = user?.farcaster?.fid;
  const [customURL, setCustomURL] = useState('');
  const [loading, setLoading] = useState(true);

  const generateCustomURL = async (originalURL: string) => {
    try {
      const response = await axios.post(
        shortIoUrl,
        {
          originalURL,
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
      throw error;
    }
  };

  const saveDomainData = async (
    taskId: string,
    latestLink: string,
    shortIoId: string
  ) => {
    try {
      const response = await axios.put(
        `${backendBaseUrl}/api/deploymentHistory/${taskId}`,
        {
          customUrl: latestLink,
          shortUrlId: shortIoId,
        }
      );
      setLoading(false);
    } catch (error) {
      console.error('Error saving domain data:', error);
    }
  };

  const fetchDeploymentData = async () => {
    try {
      const response = await axios.get(
        `${backendBaseUrl}/api/deploymentHistory/user/${farcasterId}`
      );
      const deploymentRecords = response.data.records;

      if (deploymentRecords && deploymentRecords.length > 0) {
        const latest = deploymentRecords.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0];

        const latestLink = `${frontendBaseUrl}/${latest?.taskId}`;
        if (latest?.taskId) {
          try {
            const customUrlData = await generateCustomURL(latestLink);
            saveDomainData(
              latest?.taskId,
              customUrlData?.shortURL,
              customUrlData?.idString
            );
            setCustomURL(customUrlData?.shortURL);
            setLoading(false);
          } catch (error) {
            console.error('Error generating custom URL:', error);
          }
        }
      } else {
        console.error('No deployment records found.');
        setCustomURL('');
      }
    } catch (error) {
      console.error('Error retrieving deployment data:', error);
      setCustomURL('');
    }
  };

  useEffect(() => {
    if (farcasterId) {
      fetchDeploymentData();
    }
  }, [farcasterId]);
  return <ThankYou customURL={customURL} loading={loading} />;
}
