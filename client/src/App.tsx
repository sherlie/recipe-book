import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './components/HomePage/HomePage';
import RecipePage from './components/RecipePage/RecipePage';
import { CreateRecipePage } from './components/CreateRecipePage/CreateRecipePage';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="recipe/:recipeId" element={<RecipePage />} />
          <Route path="addRecipe" element={<CreateRecipePage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
