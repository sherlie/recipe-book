import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './components/HomePage/HomePage';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
