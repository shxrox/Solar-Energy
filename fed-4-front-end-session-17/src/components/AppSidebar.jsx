// import { ChartLine, LayoutDashboard, TriangleAlert ,BadgeDollarSign } from "lucide-react";
// import { Link } from "react-router";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import { useLocation } from "react-router";
// import { cn } from "@/lib/utils";

// // Menu items.
// const items = [
//   {
//     title: "Dashboard",
//     url: "/dashboard",
//     icon: <LayoutDashboard className="w-8 h-8" size={32} />,
//   },
//   {
//     title: "Anomalies",
//     url: "/dashboard/anomalies",
//     icon: <TriangleAlert className="w-8 h-8" size={32} />,
//   },
//   {
//     title: "Analytics",
//     url: "/dashboard/analytics",
//     icon: <ChartLine className="w-8 h-8" size={32} />,
//   },
//    {
//     title: "Invoices",
//     url: "/dashboard/invoices",
//     icon: <BadgeDollarSign className="w-8 h-8" size={32} />,
//   },
// ];

// const SideBarTab = ({ item }) => {
//   let location = useLocation();
//   let isActive = location.pathname === item.url;

//   return (
//     <SidebarMenuItem key={item.url}>
//       <SidebarMenuButton asChild isActive={isActive}>
//         <Link
//           to={item.url}
//         >
//           {item.icon}
//           <span>{item.title}</span>
//         </Link>
//       </SidebarMenuButton>
//     </SidebarMenuItem>
//   );
// };

// export function AppSidebar() {
//   return (
//     <Sidebar>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel className="text-3xl font-bold text-foreground">
//             <Link to="/">Aelora</Link>
//           </SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu className="mt-4 text">
//               {items.map((item) => (
//                 <SideBarTab key={item.url} item={item} />
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }


import { 
  ChartLine, 
  LayoutDashboard, 
  TriangleAlert, 
  BadgeDollarSign,
  ShieldCheck,    // For Admin Overview
  Sun,            // For Solar Units
  Settings,
  Landmark        // For Settings
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { useUser } from "@clerk/clerk-react"; // 1. Import Clerk Hook
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// 2. Define Standard Items (Visible to everyone)
const userItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: "Anomalies",
    url: "/dashboard/anomalies",
    icon: <TriangleAlert className="w-5 h-5" />,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: <ChartLine className="w-5 h-5" />,
  },
  {
    title: "Invoices",
    url: "/dashboard/invoices",
    icon: <BadgeDollarSign className="w-5 h-5" />,
  },
];

// 3. Define Admin Items (Visible only to admins)
const adminItems = [
  
  {
    title: "Manage Units",
    url: "/admin/solar-units",
    icon: <Sun className="w-5 h-5" />,
  },
   {
    title: "Financial Overview",
    url: "/admin/invoices-dashbord",
    icon: <Landmark className="w-8 h-8" size={32} />,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

const SideBarTab = ({ item }) => {
  let location = useLocation();
  // Check if the current URL starts with the item URL to keep it active on sub-pages
  let isActive = location.pathname === item.url || location.pathname.startsWith(`${item.url}/`);

  return (
    <SidebarMenuItem key={item.url}>
      <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
        <Link to={item.url} className="flex items-center gap-3">
          {item.icon}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export function AppSidebar() {
  const { user } = useUser();
  
  // 4. Check if the user has the 'admin' role
  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        
        {/* GROUP 1: Main Application (User) */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-bold text-primary px-4 py-2">
            <Link to="/">Aelora</Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userItems.map((item) => (
                <SideBarTab key={item.url} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* GROUP 2: Admin Area (Only renders if isAdmin is true) */}
        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin Controls</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SideBarTab key={item.url} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

      </SidebarContent>
    </Sidebar>
  );
}