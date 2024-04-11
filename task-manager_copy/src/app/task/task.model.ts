export class Task {
    constructor(
      public name: string,
      public description: string,
      public dueDate: Date,
      public status: boolean 
    ) {}
  }