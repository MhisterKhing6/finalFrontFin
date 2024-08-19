import './App.css'


import { Route, Routes } from 'react-router-dom'
import { AddAssQuestion } from './components/addAssQuestion'
import { SolutionUpload } from './components/fileUpload'
import { StudentDashboardNav } from './components/studentDashboardNav'
import { AssignmentCourse } from './pages/AssignmentCourse'
import { ViewAssignment } from './pages/ViewAssignmentLecturer'
import { AssignmentDescription } from './pages/assignmentDecriptionPage'
import { CreateAssignment } from './pages/createAssignmentPage'
import { LandingPage } from './pages/landingPage'
import { LecturerDashboardPage } from './pages/lecturerDashboard'
import { LoginLecturer } from './pages/lecturerLogin'
import { LecturerRegistrationPage } from './pages/lecturerRegistration'
import { DashboardElement } from './pages/studentAssignments'
import { StudentDashboard } from './pages/studentDashboard'
import { LoginStudent } from './pages/studentLogin'
import { StudentRegistrationPage } from './pages/studentRegistration'
import { AssignmentDetailPage } from './pages/viewAssignmentDetails'
import { EditAssignment } from './pages/editAssignment'
import { AssignmentReport } from './pages/AssignmentReportPage'
import { ViewSubmissionPage } from './pages/ViewSubmissionPage'
import { Forum } from './pages/forum'
import { StudentReport } from './pages/StudentReportCoursePage'
import { StudentGradeCourse } from './pages/StudentGradesCourse'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/auth/register/student' element={<StudentRegistrationPage />} /> 
      <Route path='/auth/register/lecturer' element={<LecturerRegistrationPage />} /> 
      <Route path='/auth/login/student' element = {<LoginStudent />} />
      <Route path='/auth/login/lecturer' element = {<LoginLecturer />} />
      <Route path='/student/dashboard' element = { <StudentDashboard />} />
      <Route path='/lecturer/dashboard' element = { <LecturerDashboardPage />} />
      <Route path='/loading' element={<StudentDashboardNav/>} />
      <Route path="/test" element={<SolutionUpload />} />
      <Route path='/assignment/:id' element={<AssignmentDescription /> } />
      <Route path='/student/assignment' element= {<DashboardElement url={'/course/assignment/'} title={"Student Assignment"} />} />
      <Route path='/student/grades' element= {<DashboardElement title={"Student Grades"} url={"/course/grades/assignment/"} />} />
      <Route path='/course/assignment/:cId' element= {<AssignmentCourse />} />
      <Route path='/course/grades/assignment/:cId' element= {<StudentGradeCourse />} />
      <Route path='/lecturer/create/assignment' element={<CreateAssignment />} />
      <Route path='/add/question' element={<AddAssQuestion />} />
      <Route path='/lecturer/view-assignment' element={<ViewAssignment />} />
      <Route path='/assignment-detail/:assId/:status' element={<AssignmentDetailPage />} />
      <Route path='/lecturer/edit-assignment/:assId' element = {<EditAssignment />} />
      <Route path='/lecturer/report-assignment/:assId' element = {<AssignmentReport />} />
      <Route path='/lecturer/submission/:assId' element={<ViewSubmissionPage />} />
      <Route path='/forum/:assId/:user' element={<Forum />} />
      <Route path ='/lecturer/student-report' element={<StudentReport />} />
    </Routes>
    </>
  )
}

export default App
