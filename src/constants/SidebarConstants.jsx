import ActiveDashboardIcon from "@/assets/activeIcons/dashboard.svg";
import ActiveSettingsIcon from "@/assets/activeIcons/settings.svg";
import adviceActiveIcon from "@/assets/icon/advice-active.svg";
import Advice from "@/assets/icon/advice.svg";
import Business from "@/assets/icon/business.svg";
import businessActiveIcon from "@/assets/icon/businessActive.svg";
import Candidate from "@/assets/icon/candidate.svg";
import candidateActiveIcon from "@/assets/icon/candidateActive.svg";
import Contact from "@/assets/icon/contact.svg";
import contactActiveIcon from "@/assets/icon/contactActive.svg";
import DashboardIcon from "@/assets/icon/dashboard.svg";
import DownloadIcon from "@/assets/icon/download.svg";
import downloadsActiveIcon from "@/assets/icon/downloadActive.svg";
import EmailTemplateActive from "@/assets/icon/email-template-active.svg";
import EmailTemplate from "@/assets/icon/email-template.svg";
import eventsActiveIcon from "@/assets/icon/events-active.svg";
import Events from "@/assets/icon/events.svg";
import nbnsActiveIcon from "@/assets/icon/nbns-active.svg";
import NbnsIcon from "@/assets/icon/nbns.svg";
import nccActiveIcon from "@/assets/icon/ncc-active.svg";
import Country from "@/assets/icon/ncc.svg";
import newsActiveIcon from "@/assets/icon/news-active.svg";
import News from "@/assets/icon/news.svg";
import ourTeamActiveIcon from "@/assets/icon/our-teams-active.svg";
import profileActiveIcon from "@/assets/icon/profile-active.svg";
import Profile from "@/assets/icon/profile.svg";
import SettingsIcon from "@/assets/icon/settings.svg";
import surveyActiveIcon from "@/assets/icon/survey-active.svg";
import Survey from "@/assets/icon/survey.svg";
import Team from "@/assets/icon/team.svg";
import userManagementActiveIcon from "@/assets/icon/user-management-active.svg";
import UserManagement from "@/assets/icon/user-management.svg";
import { useSelector } from "react-redux";
import { Roles } from "./RoleConstant";

export const useGetSidebar = () => {
  const { admin_ncc_country } = useSelector((state) => state.auth);
  const getLabelValue = (textValue, defaultValue) => {
    if (
      admin_ncc_country &&
      admin_ncc_country != "undefined" &&
      admin_ncc_country != "null"
    ) {
      return `${admin_ncc_country}'s ${textValue}`;
    } else {
      return defaultValue;
    }
  };
  const SidebarConstants = [
    {
      header: "MAIN",
      items: [
        {
          label: "Dashboard",
          url: "/dashboard",
          icon: DashboardIcon,
          memberProfile: "memberProfile",
          memberProfileNCC: "memberProfileNCC",
          adminProfile: "adminProfile",
          activeIcon: ActiveDashboardIcon,
          roles: [Roles.Admin, Roles.SuperAdmin, Roles.Member, Roles.NCC],
          children: [],
        },
        {
          label: "User Management",
          url: "/dashboard/user-management",
          icon: UserManagement,
          activeIcon: userManagementActiveIcon,
          memberProfileNCC: "memberProfileNCC",
          adminProfile: "adminProfile",
          roles: [Roles.Admin, Roles.SuperAdmin, Roles.NCC],
          children: [
            {
              label: "Member",
              url: "/dashboard/user-management/member",
              roles: [Roles.Admin, Roles.SuperAdmin, Roles.NCC],
              memberProfileNCC: "memberProfileNCC",
              adminProfile: "adminProfile",
            },
            // {
            //   label: 'Permission',
            //   url: '/dashboard/user-management/member'
            // }
          ],
        },
        {
          label: "News",
          url: "/dashboard/news",
          icon: News,
          activeIcon: newsActiveIcon,
          memberProfile: "memberProfile",
          memberProfileNCC: "memberProfileNCC",
          adminProfile: "adminProfile",
          roles: [Roles.Admin, Roles.SuperAdmin, Roles.Member, Roles.NCC],
          children: [
            {
              label: "My News List",
              url: "/dashboard/news/my-news-list",
              memberProfile: "memberProfile",
              memberProfileNCC: "memberProfileNCC",
              adminProfile: "adminProfile",
              roles: [Roles.Admin, Roles.SuperAdmin, Roles.NCC, Roles.Member],
            },
            {
              label: "All News List",
              url: "/dashboard/news/all-news-list",
              memberProfile: "memberProfile",
              memberProfileNCC: "memberProfileNCC",
              adminProfile: "adminProfile",

              roles: [Roles.Admin, Roles.SuperAdmin],
            },
            {
              label: "News Management",
              url: "/dashboard/news/news-management",
              memberProfile: "memberProfile",
              memberProfileNCC: "memberProfileNCC",
              adminProfile: "adminProfile",
              roles: [Roles.Admin, Roles.SuperAdmin, Roles.NCC, Roles.Member],
            },
            {
              label: "News Category",
              url: "/dashboard/news/category",
              roles: [Roles.Admin, Roles.SuperAdmin],
            },
          ],
        },
        {
          label: "Events",
          url: "/dashboard/events",
          icon: Events,
          activeIcon: eventsActiveIcon,
          memberProfileNCC: "memberProfileNCC",
          adminProfile: "adminProfile",
          roles: [Roles.Admin, Roles.SuperAdmin, Roles.NCC],
          children: [
            {
              label: "All Events",
              url: "/dashboard/events/all-events",
              memberProfileNCC: "memberProfileNCC",
              adminProfile: "adminProfile",
              roles: [Roles.Admin, Roles.SuperAdmin, Roles.NCC],
            },
            {
              label: "Events Category",
              url: "/dashboard/events/category",
              roles: [Roles.Admin, Roles.SuperAdmin],
            },
          ],
        },
        {
          label: "Contact",
          url: "/dashboard/contact",
          icon: Contact,
          memberProfile: "memberProfile",
          activeIcon: contactActiveIcon,
          memberProfileNCC: "memberProfileNCC",
          adminProfile: "adminProfile",
          roles: [Roles.Admin, Roles.SuperAdmin, Roles.Member, Roles.NCC],
          children: [],
        },
        {
          label: "Downloads",
          url: "/dashboard/downloads",
          icon: DownloadIcon,
          memberProfile: "memberProfile",
          activeIcon: downloadsActiveIcon,
          memberProfileNCC: "memberProfileNCC",
          adminProfile: "adminProfile",
          roles: [Roles.Admin, Roles.SuperAdmin, Roles.Member, Roles.NCC],
          children: [],
        },
        {
          label: "Profile",
          url: "/dashboard/profile",
          icon: Profile,
          memberProfile: "memberProfile",
          activeIcon: profileActiveIcon,
          roles: [Roles.Member, Roles.NCC],
          children: [],
        },
        {
          label: "Advice",
          url: "/dashboard/advice",
          icon: Advice,
          activeIcon: adviceActiveIcon,
          roles: [Roles.Admin, Roles.SuperAdmin],
          children: [],
        },
        {
          label: "NCC",
          url: "/dashboard/ncc",
          icon: Country,
          activeIcon: nccActiveIcon,

          roles: [Roles.Admin, Roles.SuperAdmin],
          children: [
            {
              label: "NCC List",
              url: "/dashboard/ncc/ncc-list",
              roles: [Roles.Admin, Roles.SuperAdmin],
            },
            {
              label: "NCC Settings",
              url: "/dashboard/ncc/ncc-site",
              roles: [Roles.Admin, Roles.SuperAdmin],
            },
            {
              label: "Region",
              url: "/dashboard/ncc/region",
              roles: [Roles.Admin, Roles.SuperAdmin],
            },
          ],
        },

        {
          label: "Our Team",
          url: "/dashboard/our-team",
          icon: Team,
          activeIcon: ourTeamActiveIcon,
          memberProfileNCC: "memberProfileNCC",
          adminProfile: "adminProfile",
          roles: [Roles.Admin, Roles.SuperAdmin, Roles.NCC],
          children: [
            {
              label: "Team",
              url: "/dashboard/our-team/team",
              memberProfileNCC: "memberProfileNCC",
              adminProfile: "adminProfile",

              roles: [Roles.Admin, Roles.SuperAdmin, Roles.NCC],
            },
            {
              label: "NFEA Team",
              url: "/dashboard/our-team/nfea-team",
              memberProfileNCC: "memberProfileNCC",
              adminProfile: "adminProfile",

              roles: [Roles.Admin, Roles.SuperAdmin],
            },
            {
              label: "Department",
              url: "/dashboard/our-team/department",
              memberProfileNCC: "memberProfileNCC",
              adminProfile: "adminProfile",

              roles: [Roles.Admin, Roles.SuperAdmin, Roles.NCC],
            },
          ],
        },
        {
          label: "Candidate",
          url: "/dashboard/candidate",
          icon: Candidate,
          activeIcon: candidateActiveIcon,
          memberProfileNCC: "memberProfileNCC",
          adminProfile: "adminProfile",

          roles: [Roles.Admin, Roles.SuperAdmin, Roles.NCC],
          children: [],
        },
        {
          label: "Survey",
          url: "/dashboard/survey",
          icon: Survey,
          activeIcon: surveyActiveIcon,
          roles: [Roles.Admin, Roles.SuperAdmin],
          children: [
            {
              label: "Survey List",
              url: "/dashboard/survey/survey-list",
              roles: [Roles.Admin, Roles.SuperAdmin],
            },
            {
              label: "Result",
              url: "/dashboard/survey/result",
              roles: [Roles.Admin, Roles.SuperAdmin],
            },
            // {
            //   label: 'Participants',
            //   url: '/dashboard/survey/participants',
            //   roles: [Roles.Admin, Roles.SuperAdmin]
            // }
          ],
        },
        {
          label: "Business",
          url: "/dashboard/business",
          icon: Business,
          activeIcon: businessActiveIcon,
          adminProfile: "adminProfile",
          memberProfileNCC: "memberProfileNCC",

          // memberProfile: 'memberProfile',
          roles: [Roles.Admin, Roles.SuperAdmin, Roles.Member, Roles.NCC],
          children: [
            {
              label: "Category",
              url: "/dashboard/business/category",
              memberProfile: "memberProfile",

              roles: [Roles.Admin, Roles.SuperAdmin, Roles.NCC],
            },
            {
              label: "Business List",
              url: "/dashboard/business/business-list",
              adminProfile: "adminProfile",
              memberProfile: "memberProfile",
              roles: [Roles.Admin, Roles.SuperAdmin, Roles.Member, Roles.NCC],
            },

            {
              label: "Contact",
              url: "/dashboard/business/contact",
              // memberProfile: 'memberProfile',
              // adminProfile: 'adminProfile',

              roles: [Roles.Admin, Roles.SuperAdmin, Roles.Member, Roles.NCC],
            },
            {
              label: "Business Mangement",
              url: "/dashboard/business/business-management",
              // memberProfile: 'memberProfile',

              roles: [Roles.Admin, Roles.SuperAdmin, Roles.Member, Roles.NCC],
            },
            {
              label: "Business Settings",
              url: "/dashboard/business/business-settings",
              // memberProfileNCC: 'memberProfileNCC',

              roles: [Roles.Admin, Roles.SuperAdmin],
            },
          ],
        },
        {
          label: "NBNS",
          url: "/dashboard/nbns",
          icon: NbnsIcon,
          activeIcon: nbnsActiveIcon,
          // memberProfileNCC: 'memberProfileNCC',
          adminProfile: "adminProfile",

          roles: [Roles.Admin, Roles.SuperAdmin],
          children: [
            {
              label: "NBNS Settings",
              url: "/dashboard/nbns/nbns-settings",
              roles: [Roles.Admin, Roles.SuperAdmin],
            },
            {
              label: "NBNS Banner",
              url: "/dashboard/nbns/nbns-banner",
              roles: [Roles.Admin, Roles.SuperAdmin],
            },
            {
              label: "NBNS Followers",
              url: "/dashboard/nbns/nbns-followers",
              roles: [Roles.Admin, Roles.SuperAdmin],
            },
            {
              label: "NBNS Articles",
              url: "/dashboard/nbns/nbns-articles",
              roles: [Roles.Admin, Roles.SuperAdmin],
            },
            {
              label: "NBNS Press Release",
              url: "/dashboard/nbns/nbns-press-release",
              roles: [Roles.Admin, Roles.SuperAdmin],
            },
          ],
        },
        {
          label: "Email Template",
          url: "/dashboard/email-template",
          icon: EmailTemplate,
          memberProfile: "memberProfile",
          memberProfileNCC: "memberProfileNCC",
          adminProfile: "adminProfile",
          activeIcon: EmailTemplateActive,
          roles: [Roles.Admin, Roles.SuperAdmin, Roles.Member, Roles.NCC],
          children: [
            {
              label: "Business Email Template",
              url: "/dashboard/email-template/business-template",
              memberProfile: "memberProfile",
              memberProfileNCC: "memberProfileNCC",
              adminProfile: "adminProfile",
              roles: [Roles.Admin, Roles.SuperAdmin, Roles.Member, Roles.NCC],
            },
            {
              label: "NBNS Email Template",
              url: "/dashboard/email-template/nbns-template",
              memberProfile: "memberProfile",
              memberProfileNCC: "memberProfileNCC",
              adminProfile: "adminProfile",
              roles: [Roles.Admin, Roles.SuperAdmin],
            },
          ],
        },
        {
          label: getLabelValue("Settings", "NFEA Settings"),
          url: "/dashboard/settings",
          icon: SettingsIcon,
          activeIcon: ActiveSettingsIcon,
          memberProfileNCC: "memberProfileNCC",
          adminProfile: "adminProfile",

          roles: [Roles.Admin, Roles.SuperAdmin, Roles.NCC],
          children: [
            {
              label: getLabelValue("Setup", "NFEA Setup"),
              url: "/dashboard/settings/site",
              adminProfile: "adminProfile",
              roles: [Roles.Admin, Roles.SuperAdmin, Roles.NCC],
            },
            {
              label: getLabelValue("Banner", "NFEA Banner"),
              url: "/dashboard/settings/banner",
              memberProfile: "memberProfile",
              adminProfile: "adminProfile",
              roles: [Roles.Admin, Roles.SuperAdmin, Roles.NCC],
            },
          ],
        },
      ],
    },
  ];
  return { SidebarConstants };
};
