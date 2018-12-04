export class Singleton {
  private static singleton: Singleton;

  private constructor() {

  }

  public static getInstance() {
    if (Singleton.singleton === null) {
      Singleton.singleton = new Singleton();
    }
    return Singleton.singleton;
  }
}
