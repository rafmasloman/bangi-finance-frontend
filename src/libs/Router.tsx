import { Route, Routes } from 'react-router-dom';
import DirectorLayout from '../shared/layouts/DirectorLayout';
import DirectorDashboardPage from '../pages/director/analytics/dashboard';
import DailyReportPage from '../pages/director/daily-report';
import ExpenseDirectorPage from '../pages/director/expense';
import SupplierDirectorPage from '../pages/director/supplier';
import LoginPage from '../pages/auth/login';
import SupplierCommunityPage from '../pages/community/supplier-community';
import ExpenseCategoryDirectorPage from '../pages/community/expense-categories';
import DirectorMasterData from '../pages/director/analytics/master-data';
import DirectorSummaryPage from '../pages/director/analytics/summary';
import DirectorHistoryPage from '../pages/director/history';
import ProtectedRoute from '../shared/routes/ProtectedRoute';
import UserAccountPage from '../pages/director/user';
import DirectorAccountSettingPage from '../pages/director/account';
import MainLayout from '../shared/layouts/MainLayouts';
import ExpenseEmployeePage from '../pages/employee/expense';
import RoleProtectedRoute from '../shared/routes/RoleProtectedRoute';
import EmployeeLayout from '../shared/layouts/EmployeeLayout';

const RouterPage = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/employee" element={<EmployeeLayout />}>
          <Route path="expense" element={<ExpenseEmployeePage />} />
        </Route>

        <Route path="/director" element={<MainLayout />}>
          <Route path="user" element={<UserAccountPage />} />
          <Route path="histories" element={<DirectorHistoryPage />} />
          <Route
            path="user/account-setting"
            element={<DirectorAccountSettingPage />}
          />
        </Route>

        <Route path="/books/director/:historyId" element={<DirectorLayout />}>
          <Route index path="dashboard" element={<DirectorDashboardPage />} />
          <Route path="daily-report" element={<DailyReportPage />} />
          <Route path="income" />
          <Route path="expense" element={<ExpenseDirectorPage />} />
          <Route path="supplier" element={<SupplierDirectorPage />} />
          <Route
            path="suppliers-community"
            element={<SupplierCommunityPage />}
          />
          <Route
            path="expenses-category"
            element={<ExpenseCategoryDirectorPage />}
          />
          <Route path="master-data" element={<DirectorMasterData />} />
          <Route path="summary" element={<DirectorSummaryPage />} />
        </Route>

        {/* <Route element={<RoleProtectedRoute />}></Route> */}
      </Route>
    </Routes>
  );
};

export default RouterPage;
