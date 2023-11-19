import { generateObjectId } from "../../utils/objectId";

export class UniqueEntityID {
  private value: string;

  constructor(value?: string) {
    this.value = value || generateObjectId();
  }

  toString(): string {
    return this.value;
  }
  toValue() {
    return this.value;
  }
}
