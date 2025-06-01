import Header from '../Header';
import RecipeGrid from './RecipeGrid';
// import { getUserIdFromToken } from '../../utility/AuthUtil';
import { useNavigate } from 'react-router-dom';

function Favorites() {
  const navigate = useNavigate();
  const userId = null; //getUserIdFromToken();
  
  // if (!userId) {
  //   navigate('/login');
  //   return null;
  // }

  return (
    <div
      className="favorites"
      style={{
        width: '100%',
        height: '100dvh',
        backgroundColor: '#ffe8cc',
      }}
    >
      <Header />
      <div className="favorites-content">
        Favorites
        <RecipeGrid isMine/>
      </div>
    </div>
  );
}

export default Favorites;