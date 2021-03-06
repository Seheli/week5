export class InMemoryDataService {
  createDb() {
    const IT390 = [
      { id: 6, name: 'Work on UI' },
      { id: 7, name: 'Prep for Presentation' },
      { id: 8, name: 'Present Sprint 1' },
      { id: 9, name: 'Back-End Devel.' },
      { id: 10, name: 'Use Google APIs' },
      { id: 11, name: 'Create Databse' },
      { id: 12, name: 'Insert Database Data' },
      { id: 13, name: 'Complete Appt. System' },
      { id: 14, name: 'Finalize Project' },
      { id: 15, name: 'Final Presentation' }
    ];
    return { IT390 };
  }
}
