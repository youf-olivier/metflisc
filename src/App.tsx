import Routes from 'routes';
import ThemeProvider from 'shared/components/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
