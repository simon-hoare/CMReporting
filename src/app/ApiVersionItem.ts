export class ApiVersionItem {

      title:string;
      description:string;
      category:[{
        value:string,
        domain:string
      }];
      guid: {value:string};
      pubdate:string;
      EntityReferences : {
        EntityReference: [{
          Title:string;
          Guid:string;
          Category:[any]
        }]
      }
      Endpoints: {
        Endpoint: [any]
      }
  }
