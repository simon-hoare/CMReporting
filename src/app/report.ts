export class Report {
  constructor (
  public id: number,
  public name: string,
  public startDate:string,    //set from api response
  public endDate:string,      //set from api response
  public startTime:string,  //set from api response
  public endTime:string,    //set from api response
  public scope:string,
  public apinameprefix:string,
  public monthchoice:string,
  public yearchoice:number,
  public datetypechoice:string) {

  }


public getStartDate():string {
  if (this.datetypechoice === "LastHour") {
      let now:Date = new Date();
      let hourago = now;
      hourago.setHours(now.getHours()-1);
      hourago.setMinutes(0);
      hourago.setSeconds(0);
      return Report.getAPICallFormatDateTime(hourago);
  } else 
  if (this.datetypechoice === "Today") {
    let today:Date = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    return Report.getAPICallFormatDateTime(today);
  } else
  if (this.datetypechoice === "Previousweek") {
    let now:Date = new Date();
    now.setMinutes(0);
    now.setSeconds(0);
    let milliseconds:number = now.getMilliseconds();
    milliseconds = milliseconds - (7*24*60*60*1000);  //subtract seven days
    now.setMilliseconds(milliseconds);
    return Report.getAPICallFormatDateTime(now);
  }
  else
  if (this.datetypechoice === "Month") {
    let year:number = parseInt(this.monthchoice.split("-")[0]);
    let month:number = parseInt(this.monthchoice.split("-")[1]) -1; // zero based
    let now:Date = new Date(year,month)
    now.setDate(1);
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return Report.getAPICallFormatDateTime(now);
  }  else
  if (this.datetypechoice === "Year") {
    let now:Date = new Date(this.yearchoice,0,1,0,0,1);
    return Report.getAPICallFormatDateTime(now);
  }
} 

public getDUration():string {
  return "";
} 

public getEndDate():string {
  if (this.datetypechoice === "LastHour") {
      let now:Date = new Date();
      let hourago = now;
      hourago.setHours(now.getHours()-1);
      hourago.setMinutes(59);
      hourago.setSeconds(59);
      return Report.getAPICallFormatDateTime(hourago);
  } else
  if (this.datetypechoice === "Today") {
    let now:Date = new Date();
    return Report.getAPICallFormatDateTime(now);
  } else
  if (this.datetypechoice === "Previousweek") {
    let now:Date = new Date();
    now.setMinutes(0);
    now.setSeconds(0);
    let milliseconds:number = now.getMilliseconds();
    milliseconds = milliseconds - 1000;  //subtract 1 second
    now.setMilliseconds(milliseconds);
    return Report.getAPICallFormatDateTime(now);
  } else
  if (this.datetypechoice === "Month") {
    let year:number = parseInt(this.monthchoice.split("-")[0]);
    let month:number = parseInt(this.monthchoice.split("-")[1]); 
    let now:Date = new Date(year,month)
    now.setDate(0);
    now.setHours(23);
    now.setMinutes(59);
    now.setSeconds(59);
    return Report.getAPICallFormatDateTime(now);
  } else
  if (this.datetypechoice === "Year") {
    let now:Date = new Date(this.yearchoice,11,31,23,59,59);
    return Report.getAPICallFormatDateTime(now);
  }
}

public getTimeInterval():string {
  if (this.datetypechoice === "LastHour") {
    return "1h";
  } else 
  if (this.datetypechoice === "Today") {
    return "1h"
  } else
  if (this.datetypechoice === "Previousweek") {
    return "1h"
  }
  else
  if (this.datetypechoice === "Month") {
    return "1M"
  }else
  if (this.datetypechoice === "Year") {
    return "1Y"
  }
  
}


// this methods formats the date/time in the way required to call CM
public static getAPICallFormatDateTime(date:Date):string {
  //2018-01-01T00:00:00
  let month:string = (date.getMonth() + 1).toString();  // zero based
  let day:string = date.getDate().toString();
  let hours:string = date.getHours().toString();
  let minutes:string = date.getMinutes().toString();
  let datestring:string = date.getFullYear() + '-' + this.padSpace(month) + '-' + this.padSpace(day) + 'T' + this.padSpace(hours) + ":" + this.padSpace(minutes)  + ':00';
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

  // this method presents the report start/end date in a legible format for display at the top of the report
  public static  getStartEndDisplayDate(report:Report):string {
   
    //2018-01-01T00:00:00
  
    let startDate:string = report.startDate.split("T")[0];
    let startTime:string = report.startDate.split("T")[1];
    startTime = startTime.split(":")[0] + ":" + startTime.split(":")[1];

    let endDate:string = report.endDate.split("T")[0];
    let endTime:string = report.endDate.split("T")[1];
    endTime = endTime.split(":")[0] + ":" + endTime.split(":")[1];

    let datestring:string = startDate + " " + startTime  + " - " + endDate + " " + endTime;
    

    return datestring;
}



public static padSpace(value:string):string{
  if (value.length < 2)
  return '0'+ value;
  else
  return value;
}
}