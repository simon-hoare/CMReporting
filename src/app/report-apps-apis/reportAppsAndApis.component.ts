import { Component, OnInit } from '@angular/core';
import { Report } from '../report'; 
import { ReportsService } from '../reports.service';
import { CMAPisService } from '../cmapis.service';
import { ApiVersionChannel } from '../ApiVersionChannel';
import { ApiVersionItem } from '../ApiVersionItem';
import { API } from '../API';
import { ApiConnectedAppsChannel } from '../ApiConnectedAppsChannel';
import { ApplicationVersionChannel } from '../ApplicationVersionChannel'; 
import { AppVersionApiVersionMetrics } from '../AppVersionApiVersionMetrics';
import { Application } from '../application';


@Component({
  selector: 'app-reportAppsAndApis',
  templateUrl: './reportAppsAndApis.component.html',
  styleUrls: ['./reportAppsAndApis.component.css']
}) 



export class reportAppsAndApisComponent implements OnInit {
  reports : Report[];
  myReport : Report;
  status:string = "Loading..";
  apis:API[] = [];


  constructor(private reportService: ReportsService,
              private cmapi:CMAPisService) { 
  }



  ngOnInit() {
    this.getReports();
  
   
    this.cmapi.LoginCM("administratorlm@mayo.edu","").subscribe((result) => {
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
  
                 // get the connected apps
                  this.cmapi.getAppVersions(appId).subscribe((result) => {
                    let appVersions:ApplicationVersionChannel = result.body;


                    for (let appversionsitem of appVersions.channel.item) {
                      let  appVersionId = appversionsitem.guid.value;

                      // get the metrics for this app version
                      let start:string = Report.getAPICallFormatDate(this.myReport.startDate, this.myReport.startTime);
                      let end:string = Report.getAPICallFormatDate(this.myReport.endDate, this.myReport.endTime);
                      this.cmapi.getAppVersionMetrics(appVersionId, api.versionID,start,end).subscribe((result) => {

                        let total = 0;
                        let metrics:AppVersionApiVersionMetrics = result.body;
                        for (let metricValue of metrics.Summary.Metric) {
                          if (metricValue.Name == "totalCount")
                                total = metricValue.Value;
                        }

                        
                        let app:Application = new Application();
                         app.appname = connectedAppName;
                         app.appID = appId;
                         app.total = total;
                         app.version = '';
                         api.application.push(app);
                        
                       
                         this.status = "";

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

  getReports(): void {
    this.reports = this.reportService.getReports();
    this.myReport = this.reports[0];
    
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
  
}
