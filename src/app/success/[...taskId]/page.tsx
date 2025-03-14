'use client';
import React, { useEffect, useState } from 'react';
import ThankYou from '@/view/ThankYou';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { Box } from '@mui/material';
import Image from 'next/image';

export default function Page() {
  const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL as string;
  const [taskId, setTaskId] = useState<string | undefined>(undefined);
  const [deploymentRecord, setDeploymentRecord] = useState<any>({});
  const [customURL, setCustomURL] = useState('');
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  const fetchDeploymentData = async () => {
    try {
      const response = await axios.get(
        `${backendBaseUrl}/api/deploymentHistory/${taskId}`
      );
      const deploymentRecords = response.data.records;
      if (deploymentRecords) {
        setDeploymentRecord(deploymentRecords);
        setCustomURL(deploymentRecords?.customUrl);
      } else {
        console.error('No deployment records found.');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error retrieving deployment data:', error);
      setCustomURL('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pathname) {
      const pathSegments = pathname.split('/');
      const successIndex = pathSegments.indexOf('success');
      if (successIndex !== -1 && pathSegments.length > successIndex + 1) {
        setTaskId(pathSegments[successIndex + 1]);
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (taskId) {
      fetchDeploymentData();
    }
  }, [taskId]);

  return (
    <Box>
      {!loading ? (
        <>
          {deploymentRecord.taskId ? (
            <ThankYou customURL={customURL} loading={loading} />
          ) : (
            <Box height={'calc(100vh - 144px)'} display={'flex'} width={'100%'}>
              <Box m={'auto'}>No Record Found</Box>
            </Box>
          )}
        </>
      ) : (
        <Box height={'calc(100vh - 144px)'} m={'auto'} display={'flex'}>
          <Image
            src={'/loader.gif'}
            alt='Loader'
            width={60}
            height={60}
            style={{
              margin: 'auto',
            }}
          />
        </Box>
      )}
    </Box>
  );
}
