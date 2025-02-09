import Alert from "./components/shared/Alert";
import Chat from "./components/Chat";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import Instance from "./components/Instance";
import Recipient from "./components/Recipient";
import Tabs from "./components/shared/Tabs";

function App() {
  return (
    <ErrorBoundary
      fallback={(error) => <Alert type="error" message={error.message} />}
    >
      <Tabs>
        <Instance></Instance>
        <Recipient></Recipient>
        <Chat></Chat>
      </Tabs>
    </ErrorBoundary>
  );
}

export default App;
