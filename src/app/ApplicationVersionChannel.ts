
export class ApplicationVersionChannel {
  channel: {
    title:string;
    item: [{
        title:string,
        description:string,
        category:[

        ],
        guid:{value:string},
        pubDate:string,
        EntityReferences: {
          EntityReference:[ {
            Title:string,
            Guid:string,
            Category:[
              {
                value:string,
                domain:string
              }
            ]
          }]
        }
    }]
    
    };
    version:string
  }
