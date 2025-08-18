import { ToastContainer, Bounce } from 'react-toastify';

type MessageContainerProps = {
  children: React.ReactNode;
};

export function MessagesContainer({ children }: MessageContainerProps) {
  return (
    <>
      <div className='messagesContainer'>{children}</div>
      <ToastContainer
        toastStyle={{ opacity: 0.6, backgroundColor: '#000', color: '#fff' }}
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
    </>
  );
}
