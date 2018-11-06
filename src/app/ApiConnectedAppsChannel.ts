import { getPluralCategory } from "@angular/common/src/i18n/localization";

export class ApiConnectedAppsChannel {
  channel: {
    title:string;
    item?: [{
      title:string,
      category:[{value:string, domain:string}],
      guid:{value:string},
      EntityReferences: {
        EntityReference:[
          {
            Title:string,
            Guid:string,
            Category: [{
              value:string,
              domain:string
            }]
          }],
        Image:[any]
      }
    }]
    };
    version:string;
  }
