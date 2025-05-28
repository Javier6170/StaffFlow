export class Person {
  constructor(
    public readonly id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public position: string,
    public department: string,
    public hireDate: Date,
    public salary: number
  ) {}
}
