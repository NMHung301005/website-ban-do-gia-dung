import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
// import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="app-wrapper" style={{ width: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <Header />
      
      {/* Phần main-content sẽ thay đổi tùy theo URL */}
      <main className="main-content" style={{ minHeight: '80vh', padding: '20px 0' }}>
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;