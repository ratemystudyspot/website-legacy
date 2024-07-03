import {
  getSpots as getSpotsFromServer,
  countSpots as countSpotsFromServer
} from "../Services/studySpot";
import { openDB } from 'idb';

// init/open indexedDB
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
const countStudySpotsFromIndexedDB = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.store;
  const count = await store.count();
  return count;
};
const clearOldStudySpots = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.store;
  if (await shouldDelete()) {
    await store.clear();
  }
  await tx.done;
};
const shouldDelete = async () => {
  try {
    const { count: countFromServer } = await countSpotsFromServer();
    const countFromIndexedDB = await countStudySpotsFromIndexedDB();
    return countFromServer !== countFromIndexedDB;
  } catch (error) {
    console.error(error);
  }
};

// main function to retrieve and store data in indexedDB
const fetchAndStoreStudySpots = async () => {
  await clearOldStudySpots();
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

// study spots
const StudySpotsData = await fetchAndStoreStudySpots();

export default StudySpotsData;