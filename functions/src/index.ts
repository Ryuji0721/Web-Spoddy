/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

// 毎日実行されるスケジュール関数
export const deleteOldPosts = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  const now = admin.firestore.Timestamp.now();
  const cutoff = new Date(now.toDate().getTime() - 48 * 60 * 60 * 1000); // 48時間前の日時
  const cutoffTimestamp = admin.firestore.Timestamp.fromDate(cutoff);

  const postsRef = db.collection('posts');
  const oldPostsQuery = postsRef.where('postedAt', '<', cutoffTimestamp);

  const oldPostsSnapshot = await oldPostsQuery.get();

  const batch = db.batch();
  oldPostsSnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log('古い投稿を削除しました:', oldPostsSnapshot.size);
});
