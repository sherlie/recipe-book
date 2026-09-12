import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';
import RecipeList from './components/RecipeList/RecipeList';
import RecipePage from './components/RecipePage/RecipePage';
import { CreateRecipePage } from './components/CreateRecipePage/CreateRecipePage';
import Navbar from './components/Navbar/Navbar';
import { AppRoute } from './routeUtils';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Default} element={<RecipeList />} />
          <Route path={AppRoute.Recipe} element={<RecipePage />} />
          <Route path={AppRoute.CreateRecipe} element={<CreateRecipePage />} />
          <Route path={AppRoute.EditRecipe} element={<CreateRecipePage />} />
          <Route path={AppRoute.RecipesByTag} element={<RecipeList />} />
        </Routes>
        <Navbar />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
