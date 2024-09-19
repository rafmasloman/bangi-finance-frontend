import { Route, Routes } from 'react-router-dom';
import DirectorLayout from '../shared/layouts/DirectorLayout';
import DirectorDashboardPage from '../pages/director/dashboard';
import DailyReportPage from '../pages/director/daily-report';
import ExpenseDirectorPage from '../pages/director/expense';
import SupplierDirectorPage from '../pages/director/supplier';

const RouterPage = () => {
  return (
    <Routes>
      <Route path="/director" element={<DirectorLayout />}>
        <Route index path="dashboard" element={<DirectorDashboardPage />} />
        <Route path="daily-report" element={<DailyReportPage />} />
        <Route path="income" />
        <Route path="expense" element={<ExpenseDirectorPage />} />
        <Route path="supplier" element={<SupplierDirectorPage />} />
      </Route>
    </Routes>
  );
};

export default RouterPage;
