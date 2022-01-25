import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../Shared';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [{
  path:'',
  component:LayoutComponent,
  children: [
    // {path: '',loadChildren:() => import('../home/home.module').then(m => m.HomeModule)  },
    {path: '',loadChildren:() => import('../home2/home2.module').then(m => m.Home2Module)  },
    
    {path: 'dashboard',loadChildren:() => import('../Dashboard/dashboard.module').then(m => m.DashboardModule),canActivate:[AuthGuard] },
    {path: 'login',loadChildren:() => import('../Login/login.module').then(m => m.LoginModule)  },
    {path: 'signup',loadChildren:() => import('../SignUp/signup.module').then(m => m.SignupModule)  },
    {path: 'forgotpassword',loadChildren:() => import('../ForgotPassword/forgotpassword.module').then(m => m.ForgotpasswordModule)  },
    {path: 'resetpassword',loadChildren:() => import('../ResetPassword/resetpassword.module').then(m => m.ResetpasswordModule)  },
    {path: 'companysetting',loadChildren:() => import('../CompanySetting/companysetting.module').then(m => m.CompanysettingModule),canActivate:[AuthGuard]  },
    {path: 'event-list',loadChildren:() => import('../TrainingEvent/training-event-list.module').then(m => m.TrainingEventListModule),canActivate:[AuthGuard]  },
    {path: 'create-event',loadChildren:() => import('../TrainingEvent/CreateTrainingEvent/create-training-event.module').then(m => m.CreateTrainingEventModule) ,canActivate:[AuthGuard] },
    {path: 'a3-training-event-list',loadChildren:() => import('../TrainingEvent/A3TrainingEventList/a3-training-event-list/a3-training-event-list.module').then(m => m.A3TrainingEventListModule),canActivate:[AuthGuard]  },
    {path: 'Kaizen-training-event-list',loadChildren:() => import('../TrainingEvent/A3TrainingEventList/a3-training-event-list/a3-training-event-list.module').then(m => m.A3TrainingEventListModule),canActivate:[AuthGuard]  },
    {path: 'add-book',loadChildren:() => import('../BookList/AddBook/add-book.module').then(m => m.AddBookModule)  ,canActivate:[AuthGuard]},
     {path: 'add-book/:id',loadChildren:() => import('../BookList/AddBook/add-book.module').then(m => m.AddBookModule)  ,canActivate:[AuthGuard]},
     {path: 'track',loadChildren:() => import('../Tracks/track.module').then(m => m.TrackModule)  ,canActivate:[AuthGuard]},
     {path: 'add-employee',loadChildren:() => import('../EmployeeList/AddEmployee/addemployee.module').then(m => m.AddemployeeModule)  ,canActivate:[AuthGuard]},
     {path: 'add-employee/:id',loadChildren:() => import('../EmployeeList/AddEmployee/addemployee.module').then(m => m.AddemployeeModule)  ,canActivate:[AuthGuard]},
    {path: 'book-list',loadChildren:() => import('../BookList/booklist.module').then(m => m.BooklistModule)  ,canActivate:[AuthGuard]},
    {path: 'employee-list',loadChildren:() => import('../EmployeeList/employeelist.module').then(m => m.EmployeelistModule) ,canActivate:[AuthGuard] },    
    {path:'library',loadChildren:() => import('../BookList/booklist.module').then(m => m.BooklistModule),canActivate:[AuthGuard]},
    {path:'company-profile',loadChildren:() => import('../CompanyProfile/companyprofile.module').then(m => m.CompanyprofileModule),canActivate:[AuthGuard]},
    {path:'add-mentor',loadChildren:() => import('../Mentor/addmentor.module').then(m => m.AddmentorModule),canActivate:[AuthGuard]},
    {path:'credit-logs',loadChildren:() => import('../CreditLogs/creditloglist.module').then(m => m.CreditloglistModule),canActivate:[AuthGuard]},
    
    {path: 'add-mentor/:id',loadChildren:() => import('../Mentor/addmentor.module').then(m => m.AddmentorModule)  ,canActivate:[AuthGuard]},
    {path:'global-mentor',loadChildren:() => import('../GlobalMentor/globalmentor.module').then(m => m.GlobalmentorModule),canActivate:[AuthGuard]},
    {path:'global-mentor/:id',loadChildren:() => import('../GlobalMentor/globalmentor.module').then(m => m.GlobalmentorModule),canActivate:[AuthGuard]},
     {path:'external-mentorlist',loadChildren:() => import('../ExternalMentorList/externalmentorlist.module').then(m => m.ExternalmentorlistModule),canActivate:[AuthGuard]},
     {path:'global-mentorlist',loadChildren:() => import('../GlobalMentorList/globalmentorlist.module').then(m => m.GlobalmentorlistModule),canActivate:[AuthGuard]},
     {path:'credit-logs-history',loadChildren:() => import('../CreditLogs/creditlogshistory/creditloghistory.module').then(m => m.CreditloghistoryModule),canActivate:[AuthGuard]},                    
     {path:'userprofile',loadChildren:() => import('../UserProfile/userprofile.module').then(m => m.UserprofileModule),canActivate:[AuthGuard]},
     {path:'bookread',loadChildren:() => import('../BooKList/BookRead/bookread.module').then(m => m.BookreadModule),canActivate:[AuthGuard]},
     {path:'quizanswerassessment',loadChildren:() => import('../../Admin/Quiz/QuizAnswerAssessment/quizanswerassessment.module').then(m => m.QuizanswerassessmentModule),canActivate:[AuthGuard]},
     {path:'viewquiz',loadChildren:() => import('../../Admin/Quiz/ViewQuiz/viewquiz.module').then(m => m.ViewquizModule),canActivate:[AuthGuard]},
     {path:'studentlibrary',loadChildren:() => import('../BooKList/studentbooklist/studentbooklist.module').then(m => m.StudentbooklistModule),canActivate:[AuthGuard]},
     {path: 'studenteventlist',loadChildren:() => import('../TrainingEvent/StudentTrainingEventList/studenttrainingeventlist.module').then(m => m.StudenttrainingeventlistModule),canActivate:[AuthGuard]  },
     {path: 'studentevent',loadChildren:() => import('../TrainingEvent/StudentTrainingEvent/studenttrainingevent.module').then(m => m.StudenttrainingeventModule)  ,canActivate:[AuthGuard]},
     {path:'quiz',loadChildren:() => import('../../Admin/Quiz/QuizList/quizlist.module').then(m => m.QuizlistModule),canActivate:[AuthGuard]},
     {path:'addquiz',loadChildren:() => import('../../Admin/Quiz/AddQuiz/addquiz.module').then(m => m.AddquizModule),canActivate:[AuthGuard]},

     {path:'resetquizassessment',loadChildren:() => import('../../Admin/Quiz/ResetQuizAssessment/resetquizassessment.module').then(m => m.ResetquizassessmentModule),canActivate:[AuthGuard]},

     {path:'powerofsensei',loadChildren:() => import('../PowerOfSensei/powerofsensei.module').then(m => m.PowerofsenseiModule),canActivate:[AuthGuard]},
      {path:'structureofsensei',loadChildren:() => import('../StructureOfYourSensei/structureofyoursensei.module').then(m => m.StructureofyoursenseiModule),canActivate:[AuthGuard]},
     {path:'assessment',loadChildren:() => import('../InitialAssessment/initialassessment.module').then(m => m.InitialassessmentModule),canActivate:[AuthGuard]},
     {path:'techsupport',loadChildren:() => import('../TechSupport/techsupport.module').then(m => m.TechsupportModule),canActivate:[AuthGuard]},
     {path: 'kaizen-board',loadChildren:() => import('../TrainingEvent/KaizenBoard/kaizen-board/kaizen-board.module').then(m => m.KaizenBoardModule),canActivate:[AuthGuard]  },
     {path: 'subscription',loadChildren:() => import('../Subscription/subscription.module').then(m => m.SubscriptionModule)  },
     {path: 'add-card',loadChildren:() => import('../Payment/paymentsetting.module').then(m => m.PaymentsettingModule)  },
     {path: 'card-list',loadChildren:() => import('../Payment/CardList/cardlist.module').then(m => m.CardlistModule)  },
     {path: 'edit-card/:id',loadChildren:() => import('../Payment/paymentsetting.module').then(m => m.PaymentsettingModule)  },
     {path:'edit-belt/:id',loadChildren:() => import('../../Admin/BeltRules/addbelt/addbelt.module').then(m => m.AddbeltModule),canActivate:[AuthGuard]},
     {path: 'suggestedtrack',loadChildren:() => import('../BookTrack/booktracklist.module').then(m => m.BooktracklistModule)  },
     {path: 'mentortracklist',loadChildren:() => import('../MentorTracks/mentortrackcategory.module').then(m => m.MentortrackcategoryModule)  },
     {path: 'addstudents',loadChildren:() => import('../MentorTracks/AddStudents/addstudents.module').then(m => m.AddstudentsModule)  },
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
