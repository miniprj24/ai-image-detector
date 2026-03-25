import { useState } from 'react';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import UploadBox from './components/UploadBox';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePostCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen text-dark-text-main">
      <Navbar />

      <main className="pt-[100px] w-full mx-auto px-5 pb-10">
        <div className="flex gap-8 justify-center">
          <div className="w-full max-w-[630px]">
            <UploadBox onPostCreated={handlePostCreated} />
            <Feed key={refreshKey} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
