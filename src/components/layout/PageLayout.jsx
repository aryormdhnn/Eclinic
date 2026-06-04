/**
 * PageLayout — wraps any page with the main content area padding.
 * Header and Footer are global; this just controls the page body padding.
 */
const PageLayout = ({ children }) => {
  return (
    <main className="page-layout">
      {children}
    </main>
  );
};

export default PageLayout;
