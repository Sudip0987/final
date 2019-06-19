import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  addRecord(record) {
    return this.firestore.collection('Budgets').add(record);
  }

  readRecord() {
    return this.firestore.collection('Budgets').snapshotChanges();
  }
  

  updateRecord(recordID,record){
    this.firestore.doc('Budgets/' + recordID).update(record);
  }

  deleteRecord(record_id) {
    this.firestore.doc('Budgets/' + record_id).delete();
  }
}