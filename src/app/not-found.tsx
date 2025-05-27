import Link from "next/link";
import { Header } from "../components/header";

const NotFound = () => {
  return (
    <>
      <Header
        title="You’re on the wrong path."
        subtitle="This way leads nowhere."
      />
      <div className="todo-detail-error">
        <p>Page Not Found</p>
        <Link href="/">
          <button className="back-button">Back to Home</button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
