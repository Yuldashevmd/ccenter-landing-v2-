import { ReactNode } from 'react';

export function SidebarLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <aside>
        <nav>nav</nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}
