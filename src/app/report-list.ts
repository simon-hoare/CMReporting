import { Report } from './report';

export const REPORTS: Report[] = [
  { id: 1, name: 'API metrics by application', startDate: new Date(), endDate:new Date(),startTime:"00:00",endTime:"23:59",scope:"All",apinameprefix:""},
  { id: 2, name: 'API metrics by application with team members', startDate: new Date(), endDate:new Date(),startTime:"00:00",endTime:"23:59",scope:"All",apinameprefix:""},
  { id: 3, name: 'API metrics by application and operation', startDate: new Date(), endDate:new Date(),startTime:"00:00",endTime:"23:59",scope:"All",apinameprefix:""},
];

