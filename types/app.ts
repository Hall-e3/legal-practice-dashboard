export interface AppState {
  sideBarOpen: boolean;
  openModal: boolean;
  dropDown: boolean;
}

export interface SidebarItem {
  id: number;
  icon: React.ReactNode;
  subtitle: string;
  link: string;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export interface SidebarConfig {
  title: string;
  listOne: SidebarSection[];
}

export interface SidebarProps {
  setShowNav?: React.Dispatch<React.SetStateAction<boolean>>;
  showNav?: boolean;
}

export interface DashBoardType {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: number;
  changeType: string;
}
