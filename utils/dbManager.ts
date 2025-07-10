import { openDB } from 'idb';

const DB_NAME = 'VENTURE_BUILDER_DB';
const STORE_NAME = 'ANALYSIS_DATA_STORE';

export const initDB = async () => {
	return await openDB(DB_NAME, 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME);
			}
		},
	});
};

export const saveFile = async (key: string, base64Data: string) => {
	const db = await initDB();
	await db.put(STORE_NAME, base64Data, key);
};

export const getFile = async (key: string): Promise<string | undefined> => {
	const db = await initDB();
	return await db.get(STORE_NAME, key);
};

export const deleteFile = async (key: string) => {
	const db = await initDB();
	await db.delete(STORE_NAME, key);
};
