import dbFactory from "../../dbFactory";

const getDbRef = collectionName => {
  const db = dbFactory.create("firebase");
  const ref = db.firestore().collection(collectionName);
  return ref;
};
export const getChatFromDB = (notificationId, senderId, recieverId) => {
  return getDbRef("chat").doc(`${notificationId}${senderId}${recieverId}`);
}
export const saveIndividualChatToDB = (notificationId, senderId, recieverId, chatData) => {
  return getDbRef("chat")
    .doc(notificationId + senderId + recieverId)
    .set({ messageList: chatData });
};
