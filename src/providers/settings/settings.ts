import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Settings {
  constructor(public storage: Storage) {
  }


  setValue(key: string, value: any) {
    return this.storage.set(key, value);
  }
  removeValue(key: string) {
    return this.storage.remove(key);
  }

  getValue(key: string) {
    return this.storage.get(key)
      .then(settings => {
        return settings
      });
  }
}
