import './App.scss';
import { Box, Typography } from '@mui/material';

import { Helmet } from 'react-helmet';
import SegmentApp from './pages/SegmentApp';

function App() {
  return (
    <Box>
      <Helmet title="Create Segment"></Helmet>
      <Header
        render={() => {
          return (
            <Typography textAlign={'Center'} variant="h5">
              Segment
            </Typography>
          );
        }}
      />
      <SegmentApp />
    </Box>
  );
}

export default App;

const Header = ({ render }) => {
  if (typeof render !== 'function') return;
  return <header>{render()}</header>;
};
