function checkSpam(str) {
  let spamText1 = "1xbet";
  let spamText2 = "xxx";

  let text = str.toLowerCase();
  if (text.includes(spamText1) || text.includes(spamText2)) {
    return true;
  }

  return false;
}
