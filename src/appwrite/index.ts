import { Account, Client } from "appwrite";

export const client = new Client();
client.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
