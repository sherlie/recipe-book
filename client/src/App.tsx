import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import RecipesPage from './RecipesPage';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RecipesPage />
    </QueryClientProvider>
  );
}

export default App;
