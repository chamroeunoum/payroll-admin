import { isBackend , isAuth } from './authentication'
import LoginComponent from './../layouts/login/index.vue'
import DashboardComponent from './../components/main/index.vue'
import DashboardWidget from './../components/main/dashboard.vue'

/**
 * Check in and out
 */
import QrCheckinAndCheckoutComponent from './../layouts/checkinout/check.vue'
import QrCheckinAndCheckoutCameraComponent from './../layouts/checkinout/qrcheck.vue'

/**
 * Attendance Components
 */
import AttendanceCrud from './../components/attendance/index.vue'
import AttendanceListCrud from './../components/attendance/list.vue'
import AttendanceImportCrud from './../components/attendance/import.vue'
import AttendanceMonthlyCrud from './../components/attendance/monthly.vue'

/**
 * Attendance Policy Components
 */
// import AttendancePolicyCrud from './../components/Attendance/policy/index.vue'
// import AttendancePolicyListCrud from './../components/Attendance/policy/list.vue'

/**
 * User Components
 */
import UserCrud from './../components/user/index.vue'
import UserThumbnailCrud from './../components/user/listing/thumbnail.vue'
import UserTableCrud from './../components/user/listing/table.vue'

/**
 * People Components
 */
import ProfileIndex from './../components/user/profile/index.vue'
import ProfileInformation from './../components/user/profile/profile.vue'

/**
 * Officer Components
 */
import OfficerCrud from './../components/officer/index.vue'
import OfficerThumbnailCrud from './../components/officer/listing/thumbnail.vue'
import OfficerTableCrud from './../components/officer/listing/table.vue'

/**
 * Officer Salary Components
 */
import SalaryCrud from './../components/salary/index.vue'
import SalaryTableCrud from './../components/salary/listing/table.vue'

/**
 * Position Components
 */
import PositionCrud from './../components/position/index.vue'
import PositionThumbnailCrud from './../components/position/listing/thumbnail.vue'

/**
 * Orgainzation Components
 */
import OrganizationCrud from './../components/organization/index.vue'
import OrganizationThumbnailCrud from './../components/organization/listing/thumbnail.vue'

/**
 * Setting Components
 */
import SettingCrud from './../components/setting/index.vue'
import SettingThumbnailCrud from './../components/setting/listing/thumbnail.vue'
import SettingGeneralCrud from './../components/setting/listing/general.vue'

/**
 * Holiday Components
 */
import HolidayCrud from './../components/holiday/index.vue'
import HolidayThumbnailCrud from './../components/holiday/listing/thumbnail.vue'
import HolidayTableCrud from './../components/holiday/listing/table.vue'

/**
 * Salary Adjustment Components
 */
import SalaryAdjustmentCrud from './../components/salaryadjustment/index.vue'
import SalaryAdjustmentThumbnailCrud from './../components/salaryadjustment/listing/thumbnail.vue'
import SalaryAdjustmentTableCrud from './../components/salaryadjustment/listing/table.vue'

import QRComponent from './../components/qrcodes/index.vue'
import QRListComponent from './../components/qrcodes/list.vue'
import QRCheckinComponent from './../components/qrcodes/checkin.vue'

/**
 * Error
 */
import Page404 from './../components/errors/404.vue'

export const getRoutes = () => {
    if( isBackend() ){
        return [
            { 
                path: '', 
                name: "EmptyURI" ,
                redirect: to => {
                    return '/login'
                }
            },
            { 
                path: '/', 
                name: "RootURI" ,
                redirect: to => {
                    return '/login'
                }
            },
            {
                name: 'Login',
                path: '/login',
                component: LoginComponent ,
                meta: {
                    // transition: 'fade'
                }
            },
            /**
             * Dashboard
             */
            {
                name: "DashboardPage" ,
                path: '/dashboard',
                component: DashboardComponent,
                meta: {
                    transition: 'slide-left' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: 'DashboardWidgets' ,
                        path: '',
                        component: DashboardWidget ,
                        meta : {
                            transition: 'slide-left' ,
                            requiresAuth: true ,
                            is_admin : true
                        }
                    }
                ]
            },
            {
                name: "UserProfile" ,
                path: '/profile' ,
                component: ProfileIndex ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children:[
                    {
                        name: "ProfileInformation" ,
                        path: '' ,
                        component: ProfileInformation ,
                        meta: { 
                            transition: 'slide-right' ,
                            requiresAuth: true,
                            is_admin : true
                        },
                    }  
                ]
            },
            {
                name: 'User' ,
                path: '/user',
                component: UserCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "UserTable" ,
                        path: '' ,
                        component: UserTableCrud // UserTableCrud
                    },
                    {
                        name: "UserThumbnail" ,
                        path: 'thumbnail' ,
                        component: UserThumbnailCrud
                    }
                ]
            },
            {
                name: 'Attendance' ,
                path: '/attendance',
                component: AttendanceCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "AttendanceList" ,
                        path: '' ,
                        component: AttendanceListCrud
                    },
                    {
                        name: "AttendanceImport" ,
                        path: 'import' ,
                        component: AttendanceImportCrud
                    },
                    {
                        name: 'AttendanceMonthly' ,
                        path: ':date/month/:userId/user' ,
                        component: AttendanceMonthlyCrud
                    },
                    {
                        name: 'QRListComponent' ,
                        path: 'qrlist' ,
                        component: QRListComponent
                    },
                    {
                        name: 'QRCheckinComponent' ,
                        path: 'qrcheckin' ,
                        component: QRCheckinComponent
                    }
                    
                ]
            },
            // {
            //     name: 'AttendancePolicy' ,
            //     path: '/Attendancepolicy',
            //     component: AttendancePolicyCrud ,
            //     meta: { 
            //         transition: 'slide-right' ,
            //         requiresAuth: true,
            //         is_admin : true
            //     },
            //     children: [
            //         {
            //             name: "AttendancePolicyList" ,
            //             path: '' ,
            //             component: AttendancePolicyListCrud
            //         },                    
            //     ]
            // },
            {
                name: 'Officer' ,
                path: '/officer',
                component: OfficerCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "OfficerTable" ,
                        path: '' ,
                        component: OfficerTableCrud // UserTableCrud
                    },
                    {
                        name: "OfficerThumbnail" ,
                        path: 'thumbnail' ,
                        component: OfficerThumbnailCrud
                    },
                    {
                        name: "OfficerThumbnailFilter" ,
                        path: 'thumbnail/:ids' ,
                        component: OfficerThumbnailCrud
                    },
                    // {
                    //     name: "PeopleExportCrud" ,
                    //     path: 'export' ,
                    //     component: PeopleExportCrud
                    // },
                    // {
                    //     name: "PeopleList" ,
                    //     path: '' ,
                    //     component: PeopleListCrud
                    // },
                    // {
                    //     name: "PeopleDetail" ,
                    //     path: ':id/detail' ,
                    //     component: PeopleDetail
                    // },
                    // {
                    //     name: "PeopleCreate" ,
                    //     path: 'create' ,
                    //     component: PeopleCreateCrud
                    // },
                    // {
                    //     name: "PeopleUpdate" ,
                    //     path: 'update' ,
                    //     component: PeopleUpdateCrud
                    // }
                ]
            },
            {
                name: 'Salary' ,
                path: '/salary',
                component: SalaryCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "SalaryTableCrud" ,
                        path: '' ,
                        component: SalaryTableCrud
                    }
                ]
            },
            {
                name: 'Setting' ,
                path: '/setting',
                component: SettingCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "SettingThumbnail" ,
                        path: '' ,
                        component: SettingThumbnailCrud
                    }
                ]
            },
            {
                name: 'GeneralSetting' ,
                path: '/generalsetting',
                component: SettingCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "SettingGeneralCrud" ,
                        path: '' ,
                        component: SettingGeneralCrud
                    }
                ]
            },
            {
                name: 'Position' ,
                path: '/position',
                component: PositionCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "PositionThumbnail" ,
                        path: '' ,
                        component: PositionThumbnailCrud
                    }
                ]
            },
            {
                name: 'Organization' ,
                path: '/organization',
                component: OrganizationCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "OrganizationThumbnail" ,
                        path: '' ,
                        component: OrganizationThumbnailCrud
                    }
                ]
            },
            {
                name: 'Holiday' ,
                path: '/holiday',
                component: HolidayCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "HolidayTableCrud" ,
                        path: '' ,
                        component: HolidayTableCrud
                    },
                    {
                        name: "HolidayThumbnail" ,
                        path: 'thumbnail' ,
                        component: HolidayThumbnailCrud
                    }
                ]
            },
            {
                name: 'SalaryAdjustment' ,
                path: '/salaryadjustment',
                component: SalaryAdjustmentCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "SalaryAdjustmentTableCrud" ,
                        path: '' ,
                        component: SalaryAdjustmentTableCrud
                    },
                    {
                        name: "SalaryAdjustmentThumbnail" ,
                        path: 'thumbnail' ,
                        component: SalaryAdjustmentThumbnailCrud
                    }
                ]
            },
            {
                name: 'QRCodes' ,
                path: '/qrcodes',
                component: QRComponent ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "QRCodesList" ,
                        path: '' ,
                        component: QRListComponent
                    },
                    {
                        name: 'QRCheckin' ,
                        path: 'checkin/:id' ,
                        component: QRCheckinComponent
                    }
                    
                ]
            },
            {
                name: 'QrCheckinAndCheckoutComponent',
                path: '/officer/checkinout/:id',
                component: QrCheckinAndCheckoutComponent ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: 'QrCheckinAndCheckoutCameraComponent',
                path: '/officer/checkinout/:id/camera',
                component: QrCheckinAndCheckoutCameraComponent ,
                meta: {
                    // transition: 'fade'
                }
            },
            // will match everything and put it under `$route.params.pathMatch`
            { path: '/:pathMatch(.*)*', name: 'NotFound', component: Page404 }
        ]
    }
    
    return [
        { 
            path: '', 
            name: "EmptyURI" ,
            redirect: to => {
                return '/login'
            }
        },
        { 
            path: '/', 
            name: "RootURI" ,
            redirect: to => {
                return '/login'
            }
        },
        {
            name: 'Login',
            path: '/login',
            component: LoginComponent ,
            meta: {
                // transition: 'fade'
            }
        },
        {
            name: 'QrCheckinAndCheckoutComponent',
            path: '/officer/checkinout/:id',
            component: QrCheckinAndCheckoutComponent ,
            meta: {
                // transition: 'fade'
            }
        },
        {
            name: 'QrCheckinAndCheckoutCameraComponent',
            path: '/officer/checkinout/:id/camera',
            component: QrCheckinAndCheckoutCameraComponent ,
            meta: {
                // transition: 'fade'
            }
        },
        
        // will match everything and put it under `$route.params.pathMatch`
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: Page404 }
    ]
}