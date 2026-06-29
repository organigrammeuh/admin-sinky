import { AppBar } from 'react-admin';
import { Typography, Box } from '@mui/material';
import type { ReactNode } from 'react';

export const MyAppBar = ({ children, ...props }: { children?: ReactNode }) => (
  <AppBar {...props} color="secondary" square>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          backgroundImage: 'linear-gradient(to right, #d946ef, #3b82f6, #06b6d4)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Admin Sinky
      </Typography>
    </Box>
    <Box sx={{ flexGrow: 1 }} />
    {children}
  </AppBar>
);
