import React from 'react';
import Skeleton from '@mui/joy/Skeleton';

export default function TableSkeleton() {
  return (
    <React.Fragment>
      {[...Array(5)].map((_, index) => (
        <tr key={index}>
          <td style={{ textAlign: 'center', width: 120 }}>
            <Skeleton variant="rectangular" width={20} height={20} />
          </td>
          <td>
            <Skeleton variant="text" width={100} />
          </td>
          <td>
            <Skeleton variant="text" width={100} />
          </td>
          <td>
            <Skeleton variant="text" width={100} />
          </td>
          <td style={{ textAlign: 'center' }}>
            <Skeleton variant="text" width={200} />
          </td>
          <td>
            <Skeleton variant="text" width={100} />
          </td>
          <td>
            <Skeleton variant="rectangular" width={24} height={24} />
          </td>
        </tr>
      ))}
    </React.Fragment>
  );
}
