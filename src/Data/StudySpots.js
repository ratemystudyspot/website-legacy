import { getSpots as getSpotsFromServer } from "../Services/studySpot";
import { openDB } from 'idb';

// init indexedDB
const DB_NAME = 'studySpotsDB';
const STORE_NAME = 'studySpots';
const initDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
  return db;
};

// helper functions to manipulate data from indexedDB
const getStudySpotsFromIndexedDB = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};
const addStudySpotsToIndexedDB = async (studySpots) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  for (const spot of studySpots) {
    await tx.store.put(spot);
  }
  await tx.done;
};

// main function to retrieve and store data in indexedDB
const fetchAndStoreStudySpots = async () => {
  const storedStudySpots = await getStudySpotsFromIndexedDB();
  if (storedStudySpots.length > 0) { // if exists in indexedDB, use it
    return storedStudySpots;
  } else { // else get study spots from server
    try {
      const studySpots = await getSpotsFromServer();
      await addStudySpotsToIndexedDB(studySpots);
      return studySpots;
    } catch (error) {
      console.error('Error fetching study spots:', error);
    }
  }
};

// TODO: implement data cleanup / refresh when new study spots are added

// study spots
const StudySpots = await fetchAndStoreStudySpots();

export default StudySpots;