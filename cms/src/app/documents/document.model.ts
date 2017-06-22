import { Injectable } from '@angular/core';

@Injectable()

export class Document {
  // public id: string;
  // public name: string;
  // public description: string;
  // public url: string;
  // public children: string;

  constructor(public id: string,
              public name: string,
              public description: string,
              public url: string,
              public children: string){
    // this.id = id;
    // this.name = name;
    // this.description = description;
    // this.url = url;
    // this.children = children;
  }
}
