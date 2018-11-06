export class AppVersionApiVersionMetrics {

  StartTime:string;
  EndTime:string;
  Summary: {
    Metric: [ {
      Name:string,
      Value:number
      }
    ],
    StartTime:string;
    EndTime:string;
    Duration:string
  };
  Summaries:[
    {
      Metric: [ {
        Name:string,
        Value:number
        }
      ],
      StartTime:string;
      EndTime:string;
      Duration:string
    }
  ]
  
  }
