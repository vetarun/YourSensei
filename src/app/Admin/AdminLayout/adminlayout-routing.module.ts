import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../Shared';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';


const routes: Routes = [
  {
    path: '',
        component: AdminlayoutComponent,
        children: [
            { path: 'Admin', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            
            { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
           {path:'global-mentorlist',loadChildren:() => import('../../MainSite/GlobalMentorList/globalmentorlist.module').then(m => m.GlobalmentorlistModule)},
           {path:'global-mentor',loadChildren:() => import('../../MainSite/GlobalMentor/globalmentor.module').then(m => m.GlobalmentorModule)},
           {path:'global-mentor/:id',loadChildren:() => import('../../MainSite/GlobalMentor/globalmentor.module').then(m => m.GlobalmentorModule)},
           {path:'library',loadChildren:() => import('../../MainSite/BookList/booklist.module').then(m => m.BooklistModule)},
           {path: 'add-book',loadChildren:() => import('../../MainSite/BookList/AddBook/add-book.module').then(m => m.AddBookModule)  },
          {path: 'add-book/:id',loadChildren:() => import('../../MainSite/BookList/AddBook/add-book.module').then(m => m.AddBookModule)  },
          {path:'credit-logs',loadChildren:() => import('../../MainSite/CreditLogs/creditloglist.module').then(m => m.CreditloglistModule)},
          {path:'registeration',loadChildren:() => import('../../Admin/AdminLayout/Registeration/pendingapproval.module').then(m => m.PendingapprovalModule)},
          {path:'quiz',loadChildren:() => import('../../Admin/Quiz/QuizList/quizlist.module').then(m => m.QuizlistModule)},
          {path:'addquiz',loadChildren:() => import('../../Admin/Quiz/AddQuiz/addquiz.module').then(m => m.AddquizModule)},

          {path:'resetquizassessment',loadChildren:() => import('../../Admin/Quiz/ResetQuizAssessment/resetquizassessment.module').then(m => m.ResetquizassessmentModule)},

          {path:'reviewinitialassessment',loadChildren:() => import('../../Admin/ReviewInitialAssessment/reviewinitialassessment.module').then(m => m.ReviewinitialassessmentModule)},
          {path:'subscription-plan',loadChildren:() => import('../../Admin/SubscriptionPlan/subscriptionplan.module').then(m => m.SubscriptionplanModule)},
          {path:'subscription',loadChildren:() => import('../../Admin/SubscriptionList/subscriptionlist.module').then(m => m.SubscriptionlistModule)},
          {path:'add-subscription-plan',loadChildren:() => import('../../Admin/SubscriptionPlan/AddNewSubscriptionPlan/addnewsubscriptionplan.module').then(m => m.AddnewsubscriptionplanModule),canActivate:[AuthGuard]},
          {path:'edit-subscription-plan/:id',loadChildren:() => import('../../Admin/SubscriptionPlan/AddNewSubscriptionPlan/addnewsubscriptionplan.module').then(m => m.AddnewsubscriptionplanModule),canActivate:[AuthGuard]},
          {path:'belt-rules',loadChildren:() => import('../../Admin/BeltRules/beltrules.module').then(m => m.BeltrulesModule),canActivate:[AuthGuard]},
          {path:'add-belt',loadChildren:() => import('../../Admin/BeltRules/addbelt/addbelt.module').then(m => m.AddbeltModule),canActivate:[AuthGuard]},
          {path:'edit-belt/:id',loadChildren:() => import('../../Admin/BeltRules/addbelt/addbelt.module').then(m => m.AddbeltModule),canActivate:[AuthGuard]},
          { path: 'userdetails', loadChildren: () => import('../UserDetails/userdetails.module').then(m => m.UserdetailsModule) },
        ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminlayoutRoutingModule { }
