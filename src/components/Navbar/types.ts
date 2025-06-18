export interface NavbarProps {
  className?: string;
}

export interface NavItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}