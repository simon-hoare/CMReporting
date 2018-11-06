export class Report {
  id: number;
  name: string;
  startDate:Date;
  endDate:Date;
  startTime:string;
  endTime:string;
  scope:string;
  apinameprefix:string;

  
  // this method presents the report start/end date in a legible format for display
  public static  getStartEndDisplayDate(report:Report):string {
    //2018-01-01T00:00:00
    let month:string = (report.startDate.getMonth() + 1).toString();  // zero based
    let day:string = report.startDate.getDate().toString();
    let datestring:string =  Report.padSpace(month) + '/' + Report.padSpace(day) +  '/' + report.startDate.getFullYear() + ' ' + report.startTime ;
    datestring = datestring + " - "
    month  = (report.endDate.getMonth() + 1).toString();  // zero based
    day = report.endDate.getDate().toString();
    datestring = datestring +   Report.padSpace(month) + '/' + Report.padSpace(day) + '/' + report.endDate.getFullYear()  + ' ' + report.endTime ;
    return datestring;
}

// this methods formats the date/time in the way required to call CM
public static getAPICallFormatDate(date:Date, time:string):string {
    //2018-01-01T00:00:00
    let month:string = (date.getMonth() + 1).toString();  // zero based
    let day:string = date.getDate().toString();
    let datestring:string = date.getFullYear() + '-' + this.padSpace(month) + '-' + this.padSpace(day) + 'T' + time + ':00';
    return datestring;
}


public static padSpace(value:string):string{
  if (value.length < 2)
  return '0'+ value;
  else
  return value;
}
}