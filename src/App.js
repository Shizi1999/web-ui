import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRouter } from './routes';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {publicRouter.map((route, index) => {
            let Layout = Fragment;
            if (route.layout) {
              Layout = route.layout;
            }
            const Comp = route.comp;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Comp />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
