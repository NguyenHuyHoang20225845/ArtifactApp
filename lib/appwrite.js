import { Client, Account } from 'react-native-appwrite';

export const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6824bcd100187166a6b7')
    .setPlatform('dev.hoang.artifakt');

export const account = new Account(client);