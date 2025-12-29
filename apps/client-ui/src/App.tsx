import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ChatWrapper from "./components/ChatWrapper/ChatWrapper";
import "./socketTest";

function App() {
  const GOOGLE_CLIENT_ID =
    "353266455958-d1feudtt8aplhca5j4rkvcc7b9s1903g.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ChatWrapper />
    </GoogleOAuthProvider>
  );
}

export default App;
