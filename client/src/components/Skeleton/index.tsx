import { LinearProgress } from '@mui/joy';

export default function TableSkeleton() {
  return (
    <tr>
      <td colSpan={7} style={{ height: 100 }}>
        <LinearProgress
          color="neutral"
          determinate={false}
          size="lg"
          variant="outlined"
        />
      </td>
    </tr>
  );
}
