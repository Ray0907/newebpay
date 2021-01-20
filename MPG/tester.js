const mpg_gateway = require("./mpg_gateway");

let trade_info = {
  MerchantID: 3430112,
  RespondType: "JSON",
  TimeStamp: 1485232229,
  Version: 1.4,
  MerchantOrderNo: "S_1485232229",
  Amt: 40,
  ItemDesc: "UnitTest",
};
let encrypted_aes = "";
let encrypted_sha256 = "";

mpg_gateway
  .encrypt("aes-256-cbc", trade_info)
  .then((data) => {
    encrypted_aes = data;
    return mpg_gateway.encrypt("sha256", encrypted_aes);
  })
  .then((data) => {
    encrypted_sha256 = data;
    console.log(encrypted_aes + "\n\n" + encrypted_sha256);
  });
