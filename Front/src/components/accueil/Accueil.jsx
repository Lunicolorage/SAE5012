import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Accueil() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.action === 'navigateToIndex') {
        navigate('/index');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  return (
    <div>
      <iframe 
        src="/quiz.html" 
        style={{width: '100%', height: '100vh', border: 'none'}}
      />
    </div>
  );
}

export { Accueil };