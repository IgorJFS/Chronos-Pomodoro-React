import { ToastContainer, Bounce } from 'react-toastify';

type MessageContainerProps = {
  children: React.ReactNode;
};

export function MessagesContainer({ children }: MessageContainerProps) {
  return (
    <>
      <div className='messagesContainer'>{children}</div>
      <ToastContainer
        toastStyle={{ opacity: 0.8 }}
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
