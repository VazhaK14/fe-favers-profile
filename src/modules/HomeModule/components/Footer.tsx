export function Footer() {
  return (
    <footer className="py-6 mt-12 border-t border-slate-200">
      <div className="flex justify-center items-center">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} FAVERS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
