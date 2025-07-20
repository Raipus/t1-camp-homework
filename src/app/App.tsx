import { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { LIGHT_THEME, DARK_THEME, LightThemeCssVars, DarkThemeCssVars } from '@admiral-ds/react-ui';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from '@/widgets/header';
import { TaskListPage } from '@/pages/task-list';
import { TaskModal } from '@/widgets/task-modal';

export type Theme = 'light' | 'dark';

const Layout = styled.div`
  width: 70vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media (max-width: 768px) {
    width: 100vw;
  }
`;

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme');
    return stored === 'dark' ? 'dark' : 'light';
  });

  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    localStorage.setItem('theme', theme);

    document.body.classList.add(`admiral-theme-${theme === 'dark' ? 'dark' : 'light'}`);
    document.body.classList.remove(`admiral-theme-${theme === 'dark' ? 'light' : 'dark'}`);

    requestAnimationFrame(() => {
      const computedStyles = getComputedStyle(document.body);

      const small = computedStyles.getPropertyValue('--admiral-border-kind-Small_10');
      const medium = computedStyles.getPropertyValue('--admiral-border-kind-Medium_10');
      const large = computedStyles.getPropertyValue('--admiral-border-kind-Large_10');

      document.body.style.setProperty('--admiral-border-radius-Small', small.trim());
      document.body.style.setProperty('--admiral-border-radius-Medium', medium.trim());
      document.body.style.setProperty('--admiral-border-radius-Large', large.trim());
    });
  }, [theme]);

  return (
    <ThemeProvider theme={theme === 'light' ? LIGHT_THEME : DARK_THEME}>
      {theme === 'light' ? <LightThemeCssVars /> : <DarkThemeCssVars />}
      <Layout>
        <Header theme={theme} setTheme={setTheme} />
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<TaskListPage />}>
            <Route path="task/:id" element={<TaskListPage />} />
            <Route path="task/new" element={<TaskListPage />} />
          </Route>
        </Routes>

        {state?.backgroundLocation && (
          <Routes>
            <Route path="task/:id" element={<TaskModal type="update" />} />
            <Route path="task/new" element={<TaskModal type="create" />} />
          </Routes>
        )}
      </Layout>
    </ThemeProvider>
  );
}

export default App;
