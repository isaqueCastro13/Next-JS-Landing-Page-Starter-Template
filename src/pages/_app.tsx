import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.css';

import CustomLayout from '../templates/CustomLayout';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <CustomLayout>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* Same as */}
      <Component {...pageProps} />
    </CustomLayout>
  </>
);

export default MyApp;
