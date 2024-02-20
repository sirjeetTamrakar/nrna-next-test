/* eslint-disable */
import adviceReducer from "@/components/locals/dashboard/advice/redux/reducers";
import businessReducer from "@/components/locals/dashboard/business/redux/reducers";
import candidateReducer from "@/components/locals/dashboard/candidate/redux/reducers";
import departmentReducer from "@/components/locals/dashboard/department/redux/reducers";
import downloadReducer from "@/components/locals/dashboard/downloads/redux/reducers";
import emailTemplateReducer from "@/components/locals/dashboard/emailTemplate/redux/reducers";
import eventsReducer from "@/components/locals/dashboard/events/redux/reducers";
import nbnsReducer from "@/components/locals/dashboard/nbnsTab/redux/reducers";
import nccReducer from "@/components/locals/dashboard/ncc/redux/reducers";
import newsReducer from "@/components/locals/dashboard/news/redux/reducers";
import teamsReducer from "@/components/locals/dashboard/ourTeam/redux/reducers";
import bannerReducer from "@/components/locals/dashboard/settings/banner/redux/reducers";
import nbnsBannerReducer from "@/components/locals/dashboard/settings/nbnsBanner/redux/reducers";
import settingsReducer from "@/components/locals/dashboard/settings/redux/reducers";
import regionReducer from "@/components/locals/dashboard/settings/region/redux/reducers";
import questionReducer from "@/components/locals/dashboard/survey/redux/reducers";
import userReducer from "@/components/locals/dashboard/userManagement/redux/reducers";
import { combineReducers } from "redux";
import authReducer from "./auth/reducers";
import homepageReducer from "./homepage/reducers";

export default combineReducers({
  auth: authReducer,
  homepage: homepageReducer,
  settings: settingsReducer,
  news: newsReducer,
  events: eventsReducer,
  user: userReducer,
  ncc: nccReducer,
  question: questionReducer,
  advice: adviceReducer,
  teams: teamsReducer,
  candidate: candidateReducer,
  banner: bannerReducer,
  business: businessReducer,
  nbnsBanner: nbnsBannerReducer,
  department: departmentReducer,
  download: downloadReducer,
  emailTemplate: emailTemplateReducer,
  region: regionReducer,
  nbns: nbnsReducer,
});
