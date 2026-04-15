import Link from "next/link";

export default function NotFound() {
  return (
    <div className='not-found'>
      <div>
        <h1>404: The click wormhole</h1>
        <p>The page does not exist in this single-page setup.</p>
        <Link className='back-link' href='/'>
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
