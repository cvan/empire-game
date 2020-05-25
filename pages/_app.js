// import App from 'next/app'
import "myzel-chat-bubble/component/styles/setup.css";
import "myzel-chat-bubble/component/styles/says.css";
import "myzel-chat-bubble/component/styles/reply.css";
import "myzel-chat-bubble/component/styles/typing.css";
import "myzel-chat-bubble/component/styles/input.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
