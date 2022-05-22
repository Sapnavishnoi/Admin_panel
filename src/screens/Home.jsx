import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import SearchField from "../components/SearchField";
import Role from "../components/list/Role";
import Tagline from "../components/list/Tagline";
import Slot from "../components/list/Slot";
import Plan from "../components/list/Plan";
import Location from "../components/list/Location";
import Coach from "../components/list/Coach";
import Booking from "../components/list/Booking";

import User from "../components/list/User";
import DailySummary from "../components/list/DailySummary";
import Brand from "../components/list/Brand";
import Operator from "../components/list/Operator";
import BrandEditor from "../components/editor/BrandEditor";
import OperatorEditor from "../components/editor/OperatorEditor";
import UserEditor from "../components/editor/UserEditor";
import UserRoleAndInfoEditor from "../components/editor/UserRoleAndInfoEditor";
import RoleEditor from "../components/editor/RoleEditor";
import ApiEditor from "../components/editor/ApiEditor";
import PlatformEditor from "../components/editor/PlatformEditor";
import ApiShell from "../components/list/Api";
import Platform from "../components/list/Platform";
import configData from "../config/config.json";
import TaglineEditor from "../components/editor/taglineEditor";
import PlanEditor from "../components/editor/planEditor";
import LocationEditor from "../components/editor/locationEditor";
import CoachEditor from "../components/editor/coachEditor";


const Home = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const onSearchFieldChange = (e) => setSearchValue(e.target.value);

  useEffect(()=>{
    location?.pathname === "/" && navigate(configData.routes.user.home)
  }, [])
  return (
    <AppShell
      actions={
        <SearchField value={searchValue} handleChange={onSearchFieldChange} />
      }
    >
      <Routes location={location}>
        <Route path={configData.routes.reports.dailySummary} element={<DailySummary/>} />

        <Route path={configData.routes.brand.home} element={<Brand/>} />
        <Route path={configData.routes.brand.addBrand} element={<BrandEditor/>} />

        <Route path={configData.routes.operator.home} element={<Operator/>} />
        <Route path={configData.routes.operator.addOperator} element={<OperatorEditor/>} />
        
        <Route path={configData.routes.role.home} element={<Role />} />
        <Route path={configData.routes.role.addRole} element={<RoleEditor />} />
        <Route path={configData.routes.role.editRole} element={<RoleEditor />} />


        <Route path={configData.routes.slot.home} element={<Slot />} />
        <Route path={configData.routes.tagline.home} element={<Tagline />} />
        <Route path={configData.routes.tagline.addTagline} element={<TaglineEditor />} />
        <Route path={configData.routes.plan.home} element={<Plan />} />
        <Route path={configData.routes.plan.addPlan} element={<PlanEditor/>} />
        <Route path={configData.routes.location.home} element={<Location />} />
        <Route path={configData.routes.location.addLocation} element={<LocationEditor />} />
        <Route path={configData.routes.booking.home} element={<Booking />} />
        <Route path={configData.routes.coach.home} element={<Coach />} />
        <Route path={configData.routes.coach.addCoach} element={<CoachEditor/>} />

        <Route path={configData.routes.api.addApi} element={<ApiEditor />} />
        <Route path={configData.routes.api.apiShell} element={<ApiShell />} />

        <Route path={configData.routes.addPlatform} element={<PlatformEditor />} />
        <Route path={configData.routes.platform} element={<Platform />} />


        <Route path={configData.routes.user.home} element={<User />}/>
        <Route path={configData.routes.user.addUser} element={<UserEditor />}/>
        <Route path={configData.routes.user.editUser} element={<UserRoleAndInfoEditor />}/>
        <Route path={configData.routes.user.editUserAccess} element={<UserRoleAndInfoEditor />}/>
      </Routes>
    </AppShell>
  );
};

export default Home;
