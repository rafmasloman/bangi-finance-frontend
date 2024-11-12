import { Route, Routes } from 'react-router-dom';
import DirectorLayout from '../shared/layouts/DirectorLayout';
import DirectorDashboardPage from '../pages/director/analytics/dashboard';
import DailyReportPage from '../pages/director/daily-report';
import ExpenseDirectorPage from '../pages/director/expense';
import SupplierDirectorPage from '../pages/director/supplier';
import LoginPage from '../pages/auth/login';
// import ExpenseCategoryDirectorPage from '../pages/community/expense-categories';
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
import AdminHistoryPage from '../pages/employee/history';
import EmployeeDailyReportPage from '../pages/employee/daily-report';
import SupplierEmployeePage from '../pages/employee/suppliers';
import Homepage from '../pages/Homepage';
import EmployeeDashboardPage from '../pages/employee/dashboard';

const RouterPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<MainLayout />}>
          <Route path="histories" element={<AdminHistoryPage />} />
        </Route>

        <Route path="/books/admin/:historyId" element={<EmployeeLayout />}>
          <Route path="dashboard" element={<EmployeeDashboardPage />} />
          <Route path="daily-report" element={<EmployeeDailyReportPage />} />
          <Route path="expense" element={<ExpenseEmployeePage />} />
          <Route path="supplier" element={<SupplierEmployeePage />} />
        </Route>

        <Route element={<RoleProtectedRoute />}>
          <Route path="/director" element={<MainLayout />}>
            <Route path="user" element={<UserAccountPage />} />
            <Route path="histories" element={<DirectorHistoryPage />} />
            <Route
              path="user/account-setting"
              element={<DirectorAccountSettingPage />}
            />
          </Route>

          <Route path="/books/director/:historyId" element={<DirectorLayout />}>
            <Route path="dashboard" element={<DirectorDashboardPage />} />
            <Route path="daily-report" element={<DailyReportPage />} />
            <Route path="income" />
            <Route path="expense" element={<ExpenseDirectorPage />} />
            <Route path="supplier" element={<SupplierDirectorPage />} />
            <Route path="master-data" element={<DirectorMasterData />} />
            <Route path="summary" element={<DirectorSummaryPage />} />
          </Route>
        </Route>

        {/* <Route element={<RoleProtectedRoute />}></Route> */}
      </Route>
    </Routes>
  );
};

export default RouterPage;
