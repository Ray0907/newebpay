const crypto = require("crypto");
const querystring = require("querystring");
const BLOCKSIZE = 32;
const NEWBPAY_HASH_KEY = "12345678901234567890123456789012";
const NEWBPAY_HASH_IV = "1234567890123456";

module.exports.encrypt = function (algorithm, params) {
  return new Promise((resolve, reject) => {
    switch (algorithm) {
      case "aes-256-cbc":
        const cipher = crypto.createCipheriv(
          algorithm,
          NEWBPAY_HASH_KEY,
          NEWBPAY_HASH_IV
        );
        cipher.setEncoding("hex");

        let encrypted = "";
        let trade_info = querystring.stringify(params);
        // Add padding will not match sample answer but still work on trasaction, Do not know why....
        // trade_info = addPadding(trade_info);
        cipher.on("data", (chunk) => (encrypted += chunk));
        cipher.on("end", () => {
          resolve(encrypted);
        });
        cipher.write(trade_info);
        cipher.end();
        break;
      case "sha256":
        params = `HashKey=${NEWBPAY_HASH_KEY}&${params}&HashIV=${NEWBPAY_HASH_IV}`;
        const hash = crypto
          .createHash("sha256")
          .update(params, "ascii")
          .digest("hex");
        resolve(hash.toUpperCase());
        break;
    }
  });
};

function addPadding(str) {
  let pad = BLOCKSIZE - (str.length % BLOCKSIZE);
  return str + String.fromCharCode(pad).repeat(pad);
}
