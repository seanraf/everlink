'use client';
import React, { useEffect, useState } from 'react';
import ThankYou from '@/view/ThankYou';
import axios from 'axios';
import { useAuth } from '@crossmint/client-sdk-react-ui';
import { useFrameContext } from '@/providers/FarcasterContextProvider';

export default function Page() {
  const { user } = useAuth();
  const { context } = useFrameContext();
  const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL as string;
  const farcasterId = user?.farcaster?.fid ?? context?.user?.fid;
  const [customURL, setCustomURL] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDeploymentData = async () => {
    try {
      const response = await axios.get(
        `${backendBaseUrl}/api/deploymentHistory/user/${farcasterId}`
      );
      const deploymentRecords = response.data.records;

      if (deploymentRecords && deploymentRecords.length > 0) {
        const latestDeploymentData = deploymentRecords.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0];
        if (latestDeploymentData?.taskId) {
          setCustomURL(latestDeploymentData?.customUrl);
          setLoading(false);
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
