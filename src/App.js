import { createBrowserRouter } from 'react-router';
import './App.css';
import Body from './components/Body';
import Browse from './components/Browse';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />
    },
    {
      path: "/browse",
      element: <Browse />
    }
  ]
  )
  return (
    <div>
      <Provider store={appStore} >
        <RouterProvider router={appRouter} />
      </Provider>
    </div>
  );
}

export default App;
