export class Delivery {
  constructor(
    public readonly id: string,
    public personId: string,
    public item: string,
    public deliveryDate: Date
  ) {}
}
