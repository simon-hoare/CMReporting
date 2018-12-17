import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Report } from '../report'; 
import { ReportsService } from '../reports.service';
import { CMAPisService } from '../cmapis.service';
import { MessageService } from '../message.service';
import { ApiVersionChannel } from '../ApiVersionChannel';
import { ApiVersionItem } from '../ApiVersionItem';
import { API } from '../API';
import { ApiConnectedAppsChannel } from '../ApiConnectedAppsChannel';
import { ApplicationVersionChannel } from '../ApplicationVersionChannel'; 
import { AppVersionApiVersionMetrics } from '../AppVersionApiVersionMetrics';
import { Application } from '../application';
import { AppMembers } from '../AppMembers';

@Component({
  selector: 'app-report-apps-apis-teams',
  templateUrl: './report-apps-apis-teams.component.html',
  styleUrls: ['./report-apps-apis-teams.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class ReportAppsApisTeamsComponent implements OnInit {
  reports : Report[];
  myReport : Report;
  status:string = "Loading..";
  apis:API[] = [];
  allAPITotal : number = 0;
  totalConsumers: number = 0;
  totalAPIs :number =0;
  consumsersSet : Set<string> = new Set();


  constructor(private reportService: ReportsService,
              private cmapi:CMAPisService,
              private messageService:MessageService) { }

    ngOnInit() {
                this.messageService.clear();
                this.messageService.add("Loading..");
                this.getReports();
              
               
                this.cmapi.LoginCM("administratorlm@mayo.edu","dogmeow").subscribe((result) => {
                  // This code will be executed when the HTTP call returns successfully 
                  let keys = result.headers.keys();
              
                  this.cmapi.getAPIVersions().subscribe((result) => {
                    // This code will be executed when the HTTP call returns successfully 
                    let apis:ApiVersionChannel = result.body;
                    let apiversionItem:ApiVersionItem[] = apis.channel.item;
            
                    for (let item of apiversionItem) {
                      let api:API = new API();
                      api.name = item.EntityReferences.EntityReference[0].Title;
                      api.versionID = item.guid.value;
                      api.version = item.title;
                      api.application = [];
            
                      if (this.IncludeAPI(api))
                      {
                        this.apis.push(api);
                        
                        // sort the array case insensitive
                        let sortedApis:API[] = this.apis.slice(0);
                        sortedApis.sort((leftside,rightside): number => {
                          if (leftside.name.toLowerCase() < rightside.name.toLowerCase()) return -1;
                          if (leftside.name.toLowerCase() > rightside.name.toLowerCase()) return 1;
                          return 0;
                        });
                        this.apis = sortedApis;

                        this.totalAPIs = this.apis.length;
            
                      // get the connected apps
                      this.cmapi.getConnectedApps(api).subscribe((result) => {
            
                       //let connectedApps:ApiConnectedAppsChannel = result.body;
                      var connectedApps : ApiConnectedAppsChannel = Object.assign(new ApiConnectedAppsChannel(), result.body);
                      let myItem = connectedApps.channel.item;
                      if (typeof myItem !== 'undefined') {
                       for (let appsitem of connectedApps.channel.item) {
                         let  entities= appsitem.EntityReferences.EntityReference;
                         for (let entity of entities) {
                           if (entity.Category[0].value == 'app') {
                              let  appId = entity.Guid;
                              let connectedAppName = entity.Title;
                              this.consumsersSet.add(connectedAppName);
                              this.totalConsumers = this.consumsersSet.size;
              
                             // get the connected apps
                              this.cmapi.getAppVersions(appId).subscribe((result) => {
                                let appVersions:ApplicationVersionChannel = result.body;
            
            
                                for (let appversionsitem of appVersions.channel.item) {
                                  let  appVersionId = appversionsitem.guid.value;
            
                                  // get the metrics for this app version
                                  let start:string = this.myReport.getStartDate();
                                  let end:string = this.myReport.getEndDate();
                                  let duration:string = this.myReport.getDUration();
                                  let timeinterval:string = this.myReport.getTimeInterval();
                                  this.cmapi.getAppVersionMetrics(appVersionId, api.versionID,start,end,duration,timeinterval).subscribe((result) => {
            
                                    let total = 0;
                                    let metrics:AppVersionApiVersionMetrics = result.body;
                                    this.myReport.endDate = metrics.EndTime;
                                    this.myReport.startDate = metrics.StartTime;

                                    for (let metricValue of metrics.Summary.Metric) {
                                      if (metricValue.Name == "totalCount")
                                            total = metricValue.Value;
                                    }
                                    this.allAPITotal = this.allAPITotal + total;
                                    
                                    let app:Application = new Application();
                                     app.appname = connectedAppName;
                                     app.appID = appId;
                                     app.total = total;
                                     app.version = '';
                                     app.members = [];
                                     api.application.push(app);
                                     this.messageService.clear();

                                     this.cmapi.getAppTeamMembers(appId).subscribe((result) => {
                                      
                                       var members : AppMembers = Object.assign(new AppMembers(), result.body);
                                       let memberItems = members.channel.item;
                                       if (typeof memberItems !== 'undefined') {
 
                                         for (let memberItem of memberItems) {
                                          let  email = memberItem.description;
                                          app.members.push(email);
                                          this.status = "";
                                         }
                                       }
                                     });
                                     
                                  });
                                }
                              });
                           }
                        }
                       }
                      }
                      });
                      };
                    }
                  });
                });
                
              }
            
    getStartEndDisplayDate(report:Report):string {
      return Report.getStartEndDisplayDate(report);
    }       
            
    IncludeAPI(api:API):boolean{

      if (this.myReport.scope == 'All')
        return true;
      else
      if (this.myReport.scope == 'Other') {
        if (api.name.startsWith(this.myReport.apinameprefix))
          return true;
      } else
      if (this.myReport.scope == 'Enterprise') {
        if (api.name.startsWith("EAPIS"))
          return true;
      }
  
        return false;
    }

  getReports(): void {
    this.reports = this.reportService.getReports();
    this.myReport = this.reports[1];
  }

}
