export class Logger {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  info(message: string) {
    console.log(`${this.timestamp()} | INFO  | ${this.name} | ${message}`);
  }

  debug(message: string) {
    console.log(`${this.timestamp()} | DEBUG | ${this.name} | ${message}`);
  }

  warn(message: string) {
    console.warn(`${this.timestamp()} | WARN  | ${this.name} | ${message}`);
  }

  error(message: string) {
    console.error(`${this.timestamp()} | ERROR | ${this.name} | ${message}`);
  }

  private timestamp(): string {
    return new Date().toTimeString().slice(0, 8);
  }
}
