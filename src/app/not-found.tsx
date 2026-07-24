import Link from "next/link";
export default function NotFound() {
  return (
    <main className="content-page" style={{ textAlign: "center", paddingTop: "4rem" }}>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist or has been moved.</p>
      <Link href="/pdf-tools" className="btn btn--primary btn--large" style={{ marginTop: "1.5rem" }}>Browse PDF Tools</Link>
    </main>
  );
}
